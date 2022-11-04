import requests
import json
import base64
from dotenv import load_dotenv
import os
import re
import pymongo

load_dotenv()

client = pymongo.MongoClient(os.getenv("DB_CONN"))
db = client.courses

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
    params={"fmt": "json", "term": "1232", "course_id": "002054"}, # COS 324
    headers={"Authorization": "Bearer " + refreshToken()},
)

text = req.text
response = json.loads(text)

response["course_details"]["course_detail"]["_id"] = response["course_details"]["course_detail"]["course_id"]

db.details.insert_one(response["course_details"]["course_detail"])

def get_prereqs(prereq_text):
    first_sentence = prereq_text.split('.')[0]
    code_pattern = re.compile(r"[A-Z][A-Z][A-Z] \d\d\d")
    no_space_pattern = re.compile(r"[A-Z][A-Z][A-Z]\d\d\d")
    prereqs = code_pattern.findall(first_sentence)
    no_space = no_space_pattern.findall(first_sentence)
    prereqs.extend(list(map(lambda x: x[:3] + ' ' + x[3:], no_space)))
    return prereqs

# create dicts and graph
print(get_prereqs(response["course_details"]["course_detail"]["other_restrictions"]))