from fastapi import APIRouter, Response
import uuid, datetime, json

router = APIRouter()

history_path = "server-python/data/history.json"

def log_open(id):
    with open(history_path, "r") as f:
        h = json.load(f)

    h["opens"].append({
        "id": id,
        "opened_at": datetime.datetime.now().isoformat()
    })

    with open(history_path, "w") as f:
        json.dump(h, f, indent=2)

pixel_router = APIRouter()

@pixel_router.get("/open/{id}")
def track(id: str):
    log_open(id)
    pixel = b"\x47\x49\x46\x38\x39\x61\x01\x00\x01\x00\x80\x00\x00\x00\x00\x00\xFF\xFF\xFF\x21\xF9\x04\x01\x00\x00\x00\x00\x2C\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02\x02\x44\x01\x00\x3B"
    return Response(content=pixel, media_type="image/gif")