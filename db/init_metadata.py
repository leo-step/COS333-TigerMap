import pymongo
from dotenv import load_dotenv
from constants import *
import os

load_dotenv()

terms = [FALL20, SPRING20, FALL21, SPRING21, FALL22, SPRING22][::-1]

metadata = {
    "_id": "metadata",
    "current_term": terms[0],
    "included_terms": terms,
    "departments": departments
}

client = pymongo.MongoClient(os.getenv("DB_CONN"))
db = client.courses
db.metadata.insert_one(metadata)
