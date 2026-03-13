import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def select_resume(role):
    role = role.lower()

    if "developer" in role:
        return os.path.join(BASE_DIR, "resumes", "resume_developer_v1.pdf")

    if "ml" in role or "ai" in role:
        return os.path.join(BASE_DIR, "resumes", "resume_ml_v1.pdf")

    return os.path.join(BASE_DIR, "resumes", "resume_general_v1.pdf")