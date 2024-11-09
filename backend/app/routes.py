from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from .models import Quiz, Question

main = Blueprint('main', __name__)

@main.route('/')
def home():
    return jsonify(message="Server is up and running bahenchdddddddd!"), 200

@main.route('/quiz', methods=['POST'])
@jwt_required()
def create_quiz():
    user = get_jwt_identity()
    if user['role'] != 'teacher':
        return jsonify(message="Unauthorized"), 403
    data = request.get_json()
    new_quiz = Quiz(data['title'], data['description'], user['username'])
    new_quiz.save_to_db()
    return jsonify(message="Quiz created successfully"), 201

@main.route('/question', methods=['POST'])
@jwt_required()
def add_question():
    user = get_jwt_identity()
    if user['role'] != 'teacher':
        return jsonify(message="Unauthorized"), 403
    data = request.get_json()
    new_question = Question(data['quiz_id'], data['question_text'], data['options'], data['correct_answer'])
    new_question.save_to_db()
    return jsonify(message="Question added successfully"), 201
