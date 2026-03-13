import json

def load_templates():
    path = "data/templates.json"
    with open(path, "r") as f:
        return json.load(f)

def choose_template(role):
    templates = load_templates()
    role = role.lower()

    for t in templates:
        for tag in t["tags"]:
            if tag in role:
                return t

    return templates[0]