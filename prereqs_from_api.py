import requests
import json
import base64
from dotenv import load_dotenv
import os
import re

load_dotenv()

def refreshToken():
    req = requests.post(
        "https://api.princeton.edu:443/token",
        data={"grant_type": "client_credentials"},
        headers={
            "Authorization": "Basic "
            + base64.b64encode(
                bytes(os.getenv('SECRET'), "utf-8")
            ).decode("utf-8")
        }
    )
    text = req.text
    response = json.loads(text)
    return response["access_token"]

req = requests.get(
    "https://api.princeton.edu:443/student-app/1.0.1/courses/details",
    params={"fmt": "json", "term": "1232", "course_id": "014294"}, # COS 324
    headers={"Authorization": "Bearer " + refreshToken()},
)

text = req.text
response = json.loads(text)
with open("out.json", "w") as file:
    json.dump(response, file)
print(response["course_details"]["course_detail"]["other_restrictions"])

def get_prereqs(prereq_text):
    first_sentence = prereq_text.split('.')[0]
    code_pattern = re.compile(r"[A-Z][A-Z][A-Z] \d\d\d")
    no_space_pattern = re.compile(r"[A-Z][A-Z][A-Z]\d\d\d")
    prereqs = code_pattern.findall(first_sentence)
    no_space = no_space_pattern.findall(first_sentence)
    prereqs.extend(list(map(lambda x: x[:3] + ' ' + x[3:], no_space)))
    return prereqs

print(get_prereqs(response["course_details"]["course_detail"]["other_restrictions"]))