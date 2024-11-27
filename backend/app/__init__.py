import ssl
from flask import Flask
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager
from flask_cors import CORS  
from .config import Config
from datetime import timedelta

app = Flask(__name__)
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=5)  

mongo = PyMongo()
jwt = JWTManager()

def create_app():
    app.config.from_object(Config) 

    CORS(app)
    mongo.init_app(app)
    jwt.init_app(app)

    from .routes import main
    from .auth import auth
    app.register_blueprint(main)
    app.register_blueprint(auth, url_prefix="/auth")

    return app
