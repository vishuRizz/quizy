from flask import Blueprint, request, jsonify
from .models import User
from flask_jwt_extended import create_access_token

auth = Blueprint('auth', __name__)

@auth.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if User.find_by_username(data['username']):
        return jsonify(message="User already exists"), 409
    
    new_user = User(data['username'], data['password'], data['role'])
    new_user.save_to_db()
    
    # Generate an access token for the new user
    access_token = create_access_token(identity={'username': new_user.username, 'role': new_user.role})
    
    return jsonify(
        access_token=access_token,
        role=new_user.role
    ), 201

@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.find_by_username(data['username'])
    if user and user['password'] == data['password']:
        # Generate an access token for the user
        access_token = create_access_token(identity={'username': user['username'], 'role': user['role']})
        
        return jsonify(
            access_token=access_token,
            role=user['role']
        ), 200
    return jsonify(message="Invalid credentials"), 401
