import requests
import json
import base64
from dotenv import load_dotenv
import os
import re
import pymongo

load_dotenv()

# refresh authorization token
def refresh_token():
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

# get course details given term and course_id
def get_details(term, course_id):
    req = requests.get(
        "https://api.princeton.edu:443/student-app/1.0.1/courses/details",
        params={"fmt": "json", "term": term, "course_id": course_id},
        headers={"Authorization": "Bearer " + refresh_token()})
    response = json.loads(req.text)
    details = response["course_details"]["course_detail"]
    details["_id"] = details["course_id"]
    return details

# get a list of all course ids for a term
def get_course_ids(term):
    req = requests.get(f"https://api.princeton.edu/registrar/course-offerings/classes/{term}", 
        headers={"Authorization": "Bearer " + os.getenv("BEARER")})
    response = json.loads(req.text)
    course_ids = list(map(lambda c: c["course_id"], response["classes"]["class"]))
    return course_ids

# return a list of crosslistings associated with a course
def get_crosslistings(course_details):
    return course_details["crosslistings"].split(" / ")

# extract prerequisites (class codes) from text
def get_prereqs(course_details):
    prereq_text = course_details["other_restrictions"]
    if not prereq_text:
        return []
    first_sentence = prereq_text.split('.')[0]
    code_pattern = re.compile(r"[A-Z][A-Z][A-Z] \d\d\d")
    no_space_pattern = re.compile(r"[A-Z][A-Z][A-Z]\d\d\d")
    prereqs = code_pattern.findall(first_sentence)
    no_space = no_space_pattern.findall(first_sentence)
    prereqs.extend(list(map(lambda x: x[:3] + ' ' + x[3:], no_space)))
    return prereqs

# insert list of course detail documents into database
def insert_details(details):
    client = pymongo.MongoClient(os.getenv("DB_CONN"))
    db = client.courses
    db.details.insert_many(details)

# insert course_id graph into the database
def insert_graph(graph):
    client = pymongo.MongoClient(os.getenv("DB_CONN"))
    db = client.courses
    db.graph.insert_one(graph)

# get the transpose of a graph (reverse edges)
def get_transpose(graph):
    transposed = {}
    for key, arr in graph.items():
        for val in arr:
            if val not in transposed:
                transposed[val] = []
            transposed[val].append(key)
    return transposed
