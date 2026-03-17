from template_selector import choose_template
from resume_selector import select_resume
from gmail_api import send_gmail
import json
import uuid
import datetime
import os

history_path = "data/history.json"


def write_history(entry):
    if not os.path.exists(history_path):
        with open(history_path, "w") as f:
            json.dump({"sent": []}, f)

    with open(history_path, "r") as f:
        history = json.load(f)

    history["sent"].append(entry)

    with open(history_path, "w") as f:
        json.dump(history, f, indent=2)


# 🔥 NEW: Single source of truth
def generate_email_content(data):
    company = data["company"]
    role = data["role"]

    template = choose_template(role)
    resume = select_resume(role)

    placeholders = {
        "company": company,
        "your_name": "Animesh Yadav",
        "role": role,
        "skills": "Python, C++, Rust, AI/ML",
        "why": "my ongoing AI/ML personal projects"
    }

    body = template["body"]
    for k, v in placeholders.items():
        body = body.replace("{" + k + "}", v)

    # Convert to HTML
    body = body.replace("\n", "<br>")
    body = f"""
    <html>
    <body style="font-family: Arial, sans-serif; line-height:1.6; font-size:14px;">
    {body}

    </body>
    </html>
    """

    subject = template["subject"]
    for k, v in placeholders.items():
        subject = subject.replace("{" + k + "}", v)

    return {
        "subject": subject,
        "body": body,
        "resume": os.path.basename(resume) if resume else None,
        "resume_path": resume
    }


def send_email_process(data):
    email = data["email"]

    content = generate_email_content(data)

    email_id = str(uuid.uuid4())
    pixel_url = f"http://127.0.0.1:8000/open/{email_id}"

    msg_id = send_gmail(
        email,
        content["subject"],
        content["body"],
        content["resume_path"],
        pixel_url
    )

    entry = {
        "id": email_id,
        "company": data["company"],
        "role": data["role"],
        "email": email,
        "resume": content["resume"],
        "message_id": msg_id,
        "sent_at": datetime.datetime.now().isoformat(),
        "status": "sent"
    }

    write_history(entry)

    return {"status": "sent", "message_id": msg_id}