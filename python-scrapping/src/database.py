from pymongo import MongoClient

def save(text):
    try:
        client = MongoClient("mongodb://root:example@mongo:27017/")
        db = client["stats"]
        collection = db["docs"]

        collection.insert_one(text)
    except Exception as e:
        raise Exception(f"Erro ao salvar no MongoDB: {e}")
    finally:
        client.close()
