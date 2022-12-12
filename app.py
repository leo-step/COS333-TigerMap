from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS # comment this on deployment
from collections import defaultdict
import pymongo
import os
import json
from bson import ObjectId

load_dotenv()

app = Flask(__name__, static_folder='frontend/build', static_url_path='/')
app.secret_key = os.getenv("APP_SECRET_KEY")
CORS(app)

db = pymongo.MongoClient(os.getenv("DB_CONN")).courses 
prereqs = defaultdict(list, db.graph.find_one({"_id": "prereq"}))
postreqs = defaultdict(list, db.graph.find_one({"_id": "postreq"}))

@app.route("/")
def index():
    return app.send_static_file("index.html")

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

@app.route("/api")
def api():
    fields = {"crosslistings": 1, "long_title": 1, "distribution_area_short": 1}
    details_fields = {"crosslistings": 1, "long_title": 1, "distribution_area_short": 1, "description": 1,
        "reading_writing_assignment": 1, "other_restrictions": 1, "term": 1}
    course_id = request.args.get("course_id")
    prereq_details = list(db.details.find({"_id": {"$in" : prereqs[course_id]}}, fields).sort("crosslistings", 1))
    postreq_details = list(db.details.find({"_id": {"$in" : postreqs[course_id]}}, fields).sort("crosslistings", 1))
    course_details = db.details.find_one({"_id": course_id}, details_fields)
    course_details['prereqs'] = prereq_details
    course_details['postreqs'] = postreq_details
    return jsonify(course_details)

@app.route("/search")
def search():
    query = request.args.get("query")
    results = list(db.details.aggregate([
        {
            "$search": {
            "index": "details",
            "compound": {
                "should": [
                    {
                        "autocomplete": {
                            "query": query,
                            "path": "long_title"
                        },
                    },
                    {
                        "autocomplete": {
                            "query": query,
                            "path": "crosslistings"
                        },
                    },
                ],
            }
            }
        },
        { "$project": {
            "crosslistings": 1,
            "long_title": 1
        }},
        { "$limit": 5 }
    ]))
    return jsonify(results)

    '''
      $search: {
    "index": "<index name>", // optional, defaults to "default"
    "autocomplete": {
      "query": "<search-string>",
      "path": "<field-to-search>",
      "tokenOrder": "any|sequential",
      "fuzzy": <options>,
      "score": <options>
    }
  }
    
    '''

@app.route("/createtrack", methods = ["POST"])
def create_tracks():
    title = request.json.get("title")
    emoji = request.json.get("emoji")
    courses = json.loads(request.json.get("courses"))

    client = pymongo.MongoClient(os.getenv("DB_CONN"))
    db = client.courses
    result = db.tracks.insert_one({"title": title, "emoji": emoji, "courses": courses})
    return jsonify({"id": str(result.inserted_id)})


@app.route("/gettracks")
def get_tracks():
    fields = {"title": 1, "emoji": 1}
    client = pymongo.MongoClient(os.getenv("DB_CONN"))
    db = client.courses
    data = list(db.tracks.find({}, fields))
    response = app.response_class(
        response=json.dumps(data, default=str),
        status=200,
        mimetype='application/json'
    )
    return response

@app.route("/trackdetails")
def track_details():
    track_id = request.args.get("id")
    client = pymongo.MongoClient(os.getenv("DB_CONN"))
    db = client.courses
    track = db.tracks.find_one({"_id": ObjectId(track_id)})
    response = app.response_class(
        response=json.dumps(track, default=str),
        status=200,
        mimetype='application/json'
    )
    return response

@app.route("/graph", methods = ["POST"])
def get_graph_data():
    course_ids = request.json.get("course_ids")
    fields = {"subject": 1, "catnum": 1}

    graph = dict()

    def insert(course_id):
        if course_id in graph:
            return
        graph[course_id] = []
        for prereq_id in prereqs[course_id]:
            insert(prereq_id)
            graph[prereq_id].append(course_id)

    for course_id in course_ids:
        insert(course_id)
    
    adj = []
    for source, arr in graph.items():
        for target in arr:
            adj.append({"source": source, "target": target})

    course_data = list(db.details.find({"_id": {"$in" : list(graph.keys())}}, fields))
    for i, data in enumerate(course_data):
        course_data[i] = {"id": data["_id"], "code": data["subject"] + data["catnum"]}

    return jsonify({"links": adj, "nodes": course_data})

if __name__ == "__main__":
    app.run()
