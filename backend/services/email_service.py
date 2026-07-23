from flask_mail import Mail, Message
from flask import current_app

mail = Mail()


def send_verification_email(email, full_name, code):
    """Send the registration email-verification code."""
    msg = Message(
        subject="Verify your TracePoint account",
        recipients=[email],
    )
    msg.html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #047857;">Welcome to TracePoint, {full_name}!</h2>
        <p>Use the code below to verify your email address:</p>
        <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 12px;
                    padding: 20px; text-align: center; margin: 20px 0;">
            <span style="font-size: 28px; font-weight: bold; letter-spacing: 6px; color: #047857;">
                {code}
            </span>
        </div>
        <p style="color: #6b7280; font-size: 13px;">
            This code expires shortly. If you didn't request this, you can ignore this email.
        </p>
    </div>
    """
    mail.send(msg)


def send_password_reset_email(email, full_name, reset_link):
    """Send the password-reset link."""
    msg = Message(
        subject="Reset your TracePoint password",
        recipients=[email],
    )
    msg.html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #047857;">Password reset request</h2>
        <p>Hi {full_name}, we received a request to reset your TracePoint password.</p>
        <div style="text-align: center; margin: 24px 0;">
            <a href="{reset_link}"
               style="background: #047857; color: #ffffff; padding: 12px 28px; border-radius: 10px;
                      text-decoration: none; font-weight: 600; display: inline-block;">
                Reset Password
            </a>
        </div>
        <p style="color: #6b7280; font-size: 13px;">
            This link expires in 30 minutes. If you didn't request this, you can safely ignore this email —
            your password will not be changed.
        </p>
    </div>
    """
    mail.send(msg)
