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
cos226_postreqs = db.graph.find_one({"_id": "postreq"})["002054"]
print(list(db.details.find({ "_id" : { "$in" : cos226_postreqs } }, { "crosslistings": 1 })))
