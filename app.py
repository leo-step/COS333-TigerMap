from dotenv import load_dotenv
from flask import Flask, request
from flask_cors import CORS # comment this on deployment
import pymongo
import os
import re

load_dotenv()

app = Flask(__name__, static_folder='frontend/build', static_url_path='/')
app.secret_key = os.getenv("APP_SECRET_KEY")
CORS(app)

db = pymongo.MongoClient(os.getenv("DB_CONN")).testcourses # switch to courses!!!

def get_prereqs(prereq_text):
    if not prereq_text:
        return []
    first_sentence = prereq_text.split('.')[0]
    code_pattern = re.compile(r"[A-Z][A-Z][A-Z] \d\d\d")
    no_space_pattern = re.compile(r"[A-Z][A-Z][A-Z]\d\d\d")
    prereqs = code_pattern.findall(first_sentence)
    no_space = no_space_pattern.findall(first_sentence)
    prereqs.extend(list(map(lambda x: x[:3] + ' ' + x[3:], no_space)))
    return prereqs

@app.route("/")
def index():
    return app.send_static_file("index.html")

@app.route("/api")
def api():
    course_id = request.args.get("course_id")
    details = db.details.find_one({"_id": course_id})
    details["prereqs"] = get_prereqs(details["other_restrictions"])
    return details

if __name__ == "__main__":
    app.run()
