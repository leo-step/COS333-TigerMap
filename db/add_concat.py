import pymongo
from dotenv import load_dotenv
import os

load_dotenv()

client = pymongo.MongoClient(os.getenv("DB_CONN"))
db = client.courses

# db.details.update_one(
#     {"_id": "016609"},
    # [
    #     {"$set": {"catnum": {"$substr": ["$catnum", 1, -1]}}}
    # ]
# )

db.details.update_many(
    {},
    [
        {"$set": {"concat": {"$concat": ["$subject", {"$substr": ["$catnum", 1, -1]}]}}}
    ]
)