import logging

def send_verification_email(email, full_name, code):
    # Placeholder – replace with actual email sending (SendGrid, SMTP, etc.)
    logging.info(f"Sending verification email to {email} with code {code}")
    print(f"📧 [DEV] Verification code for {email}: {code}")
    # In production, send real email here
    return True