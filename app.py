from dotenv import load_dotenv
from flask import Flask, request
# import flask_restful
from flask_cors import CORS # comment this on deployment
import pymongo
import os

load_dotenv()

app = Flask(__name__, static_folder='frontend/build', static_url_path='/')
app.secret_key = os.getenv("APP_SECRET_KEY")
CORS(app)

db = pymongo.MongoClient(os.getenv("DB_CONN")).courses

@app.route("/")
def index():
    return app.send_static_file("index.html")

# api = flask_restful.Api(app)

# @app.route("/", defaults={'path':''})
# def serve(path):
#     return send_from_directory(app.static_folder,'index.html')

# api.add_resource(HelloApiHandler, '/a')

@app.route("/api", methods=["POST"])
def api():
    course_id = request.get_json()["course_id"]
    return db.details.find_one({"_id": course_id})

if __name__ == "__main__":
    app.run()
