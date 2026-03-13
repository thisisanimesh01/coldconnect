from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
import base64
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
import os

SCOPES = ["https://www.googleapis.com/auth/gmail.send"]

def get_service():
    token_path = "token.json"
    creds = None

    if os.path.exists(token_path):
        creds = Credentials.from_authorized_user_file(token_path, SCOPES)

    if not creds or not creds.valid:
        flow = InstalledAppFlow.from_client_secrets_file("credentials.json", SCOPES)
        creds = flow.run_local_server(port=0)
        with open(token_path, "w") as f:
            f.write(creds.to_json())

    return build("gmail", "v1", credentials=creds)

def send_gmail(to, subject, body, resume_path, pixel_url):
    service = get_service()

    # Root message must be MIXED for attachments
    msg = MIMEMultipart("mixed")
    msg["To"] = to
    msg["Subject"] = subject

    # Create HTML part
    html_body = f"{body}<img src='{pixel_url}' width='1' height='1'/>"
    msg.attach(MIMEText(html_body, "html"))

    # Attach resume
    if resume_path and os.path.exists(resume_path):
        print("Attaching resume:", resume_path)

        with open(resume_path, "rb") as f:
            part = MIMEApplication(f.read())

        part.add_header(
            "Content-Disposition",
            "attachment",
            filename=os.path.basename(resume_path),
        )

        msg.attach(part)

    else:
        print("Resume NOT found:", resume_path)

    raw = base64.urlsafe_b64encode(msg.as_bytes()).decode()

    sent = service.users().messages().send(
        userId="me",
        body={"raw": raw}
    ).execute()

    return sent.get("id", None)