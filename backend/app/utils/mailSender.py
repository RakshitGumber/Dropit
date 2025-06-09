import os
from dotenv import load_dotenv
import resend

load_dotenv()


resend.api_key = os.environ["RESEND_API_KEY"]


def sendMail(receiver, subject, body):
    params: resend.Emails.SendParams = {
        "from": "Rakshit Gumber <onboarding@resend.dev>",
        "to": receiver,
        "subject": subject,
        "html": body,
    }

    email = resend.Emails.send(params)
    return email
