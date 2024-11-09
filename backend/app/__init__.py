import ssl
from flask import Flask
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager
from .config import Config

# Initialize PyMongo and JWTManager instances
mongo = PyMongo()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)  # Load configuration from Config class

    # Initialize PyMongo and JWT with the Flask app
    mongo.init_app(app)
    jwt.init_app(app)

    # Register blueprints for routes
    from .routes import main
    from .auth import auth
    app.register_blueprint(main)
    app.register_blueprint(auth, url_prefix="/auth")

    return app
