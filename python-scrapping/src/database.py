from pymongo import MongoClient
import os

def save(text):
    try:
        mongo_user = os.getenv("MONGO_USER")
        mongo_password = os.getenv("MONGO_PASSWORD")
        mongo_host = os.getenv("MONGO_HOST", "localhost")
        mongo_port = os.getenv("MONGO_PORT", "27017")

        mongo_uri = f"mongodb://{mongo_user}:{mongo_password}@{mongo_host}:{mongo_port}/"
        client = MongoClient(mongo_uri)
        
        db = client["stats"]
        collection = db["docs"]

        collection.insert_one(text)
    except Exception as e:
        raise Exception(f"Erro ao salvar no MongoDB: {e}")
    finally:
        client.close()
