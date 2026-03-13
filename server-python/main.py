from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from email_sender import send_email_process
from tracking_pixel import pixel_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pixel_router)

@app.post("/send-email")
async def send_email(data: dict):
    return send_email_process(data)

@app.get("/")
def home():
    return {"message": "Python server running"}