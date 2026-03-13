import json, datetime, os
from gmail_api import send_gmail

history_path = "server-python/data/history.json"

def schedule_followup():
    with open(history_path, "r") as f:
        history = json.load(f)

    for mail in history["sent"]:
        sent = datetime.datetime.fromisoformat(mail["sent_at"])
        if "followed" in mail:
            continue
        if (datetime.datetime.now() - sent).days >= 5:
            subject = f"Following up on {mail['role']}"
            body = f"Hello {mail['company']},\n\nJust following up regarding my {mail['role']} application.\n\nRegards,\nAnimesh"
            send_gmail(mail["email"], subject, body, None, "")

            mail["followed"] = True

    with open(history_path, "w") as f:
        json.dump(history, f, indent=2)