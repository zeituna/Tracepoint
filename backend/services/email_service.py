import logging
from flask import current_app
from flask_mail import Mail, Message
import threading

logger = logging.getLogger(__name__)

# Global Mail instance – will be initialized in app.py
mail = Mail()

def send_async_email(app, msg):
    """Send email in a background thread."""
    with app.app_context():
        mail.send(msg)

def send_verification_email(email, full_name, code):
    """
    Send a verification email using the HTML template.
    Returns True always (registration continues even if email fails).
    """
    try:
        # Build the HTML content
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>TracePoint – Email Verification</title>
        </head>
        <body style="font-family: Arial, sans-serif; background: #f8fafc; margin: 0; padding: 0;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background: #f8fafc; padding: 20px;">
                <tr>
                    <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0" style="background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                            <!-- Header -->
                            <tr>
                                <td style="background: #11402D; padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
                                    <h1 style="color: white; margin: 0; font-size: 28px;">TracePoint</h1>
                                    <p style="color: #a7f3d0; margin: 5px 0;">Missing Person Reporting & Tracking</p>
                                </td>
                            </tr>
                            <!-- Content -->
                            <tr>
                                <td style="padding: 30px;">
                                    <h2 style="color: #11402D; margin-top: 0;">Email Verification</h2>
                                    <p style="color: #4b5563;">Hello <strong>{full_name}</strong>,</p>
                                    <p style="color: #4b5563;">Your verification code is:</p>
                                    <div style="text-align: center; padding: 20px; margin: 20px 0; background: #f3f4f6; border-radius: 8px;">
                                        <span style="font-size: 36px; font-weight: bold; color: #11402D; letter-spacing: 10px;">{code}</span>
                                    </div>
                                    <p style="color: #6b7280; font-size: 14px;">This code will expire in <strong>{current_app.config.get('VERIFICATION_CODE_EXPIRY_MINUTES', 10)} minutes</strong></p>
                                    <p style="color: #9ca3af; font-size: 14px;">If you didn't request this, please ignore this email.</p>
                                </td>
                            </tr>
                            <!-- Footer -->
                            <tr>
                                <td style="padding: 20px; text-align: center; color: #9ca3af; font-size: 12px; border-top: 1px solid #e5e7eb;">
                                    <p>&copy; 2024 TracePoint. All rights reserved.</p>
                                    <p style="font-size: 11px; color: #d1d5db;">This is an automated message, please do not reply.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        """

        # Plain‑text fallback
        plain_text = f"""
        TracePoint – Email Verification

        Hello {full_name},

        Your verification code is: {code}

        This code will expire in {current_app.config.get('VERIFICATION_CODE_EXPIRY_MINUTES', 10)} minutes.

        If you didn't request this, please ignore this email.

        © TracePoint
        """

        # Get sender from config, fallback to MAIL_USERNAME
        sender = current_app.config.get('MAIL_DEFAULT_SENDER') or current_app.config.get('MAIL_USERNAME') or 'no-reply@tracepoint.org'

        msg = Message(
            subject='TracePoint – Verify Your Email Address',
            recipients=[email],
            html=html_content,
            body=plain_text,
            sender=sender,
            reply_to=sender,
        )

        # Send asynchronously
        app = current_app._get_current_object()
        threading.Thread(target=send_async_email, args=(app, msg)).start()

        logger.info(f"Verification email sent to {email}")
        print(f"📧 CODE for {email}: {code}")  # debug
        return True

    except Exception as e:
        logger.error(f"Email send error: {e}")
        print(f"⚠️ Email failed. Code for {email}: {code}")
        # Return True so registration can continue (user sees code in console)
        return True