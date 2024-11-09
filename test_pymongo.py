from pymongo import MongoClient

# MONGO_URI = "mongodb://vishurizz01:RzfgxKDYAOSSooKq@cluster0.7ozbuch.mongodb.net/quizy?retryWrites=true&w=majority" 
MONGO_URI = "mongodb+srv://vishurizz01:RzfgxKDYAOSSooKq@cluster0.7ozbuch.mongodb.net/"

try:
    client = MongoClient(MONGO_URI)
    client.admin.command('ping')
    print("MongoDB connection successful!")
except Exception as e:
    print("Error:", e)
