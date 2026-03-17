from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from email_sender import send_email_process
from template_selector import choose_template

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class EmailRequest(BaseModel):
    company: str
    email: str
    role: str


@app.post("/preview")
def preview_email(data: EmailRequest):
    template = choose_template(data.role)

    placeholders = {
        "company": data.company,
        "your_name": "Animesh Yadav",
        "role": data.role,
        "skills": "Python, C++, Rust, AI/ML",
        "why": "my ongoing AI/ML personal projects"
    }

    body = template["body"]
    subject = template["subject"]

    for k, v in placeholders.items():
        body = body.replace("{" + k + "}", v)
        subject = subject.replace("{" + k + "}", v)

    return {
        "subject": subject,
        "body": body,
        "email": data.email
    }


@app.post("/send-email")
def send_email(data: EmailRequest):
    return send_email_process(data.dict())


@app.get("/")
def home():
    return {"message": "Python server running"}