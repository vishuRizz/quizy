from flask import Blueprint, request, jsonify, Response
from flask_jwt_extended import jwt_required, get_jwt_identity
from .models import Quiz, Question
from bson import ObjectId
import json
from datetime import datetime
from .models import AttemptedQuiz
from . import mongo

main = Blueprint('main', __name__)

@main.route('/')
def home():
    return jsonify(message="Server is up and running!"), 200

@main.route('/quiz', methods=['POST'])
@jwt_required()
def create_quiz():
    user = get_jwt_identity()
    if user['role'] != 'teacher':
        return jsonify(message="Unauthorized"), 403
    
    data = request.get_json()
    if not all(key in data for key in ('title', 'description')):
        return jsonify(message="Title and description are required"), 400
    
    new_quiz = Quiz(data['title'], data['description'], user['username'])
    new_quiz.save_to_db()
    
    return jsonify(message="Quiz created successfully", quiz_id=str(new_quiz.id)), 201

@main.route('/question/<quiz_id>', methods=['POST'])
@jwt_required()
def add_question(quiz_id):
    user = get_jwt_identity()
    if user['role'] != 'teacher':
        return jsonify(message="Unauthorized"), 403
    
    data = request.get_json()
    if not all(key in data for key in ('question_text', 'options', 'correct_option_index')):
        return jsonify(message="Question text, options, and correct_option_index are required"), 400
    
    new_question = Question(quiz_id, data['question_text'], data['options'], data['correct_option_index'])
    question_id = new_question.save_to_db()
    
    Quiz.add_question_to_quiz(quiz_id, question_id)
    
    return jsonify(message="Question added successfully", question_id=str(question_id)), 201

class ObjectIdEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return json.JSONEncoder.default(self, obj)

@main.route('/quizzes', methods=['GET'])
@jwt_required()
def get_all_quizzes():
    user = get_jwt_identity()
    if user['role'] not in ['teacher', 'student']:
        return jsonify(message="Unauthorized"), 403
    
    all_quizzes = Quiz.get_all_quizzes()
    quiz_data = []

    if user['role'] == 'student':
        attempted_quizzes = mongo.db.attempted.find({'student_id': user['username']})
        attempted_quiz_ids = {attempt['quiz_id'] for attempt in attempted_quizzes}

        for quiz in all_quizzes:
            quiz_dict = quiz.to_dict()
            quiz_dict['attempted'] = str(quiz.id) in attempted_quiz_ids
            quiz_data.append(quiz_dict)
    else:
        quiz_data = [quiz.to_dict() for quiz in all_quizzes]

    return Response(json.dumps({'quizzes': quiz_data}, cls=ObjectIdEncoder), mimetype='application/json')

@main.route('/submit-score', methods=['POST'])
@jwt_required()
def submit_score():
    user = get_jwt_identity()
    if user['role'] != 'student':
        return jsonify(message="Unauthorized"), 403
    
    data = request.get_json()
    student_id = user['username']
    quiz_id = data.get('quiz_id')
    score = data.get('score')
    
    # Validate input
    if not quiz_id or score is None:
        return jsonify(message="Quiz ID and score are required"), 400

    # Check if student has already attempted this quiz
    existing_attempt = AttemptedQuiz.find_attempt(student_id, quiz_id)
    if existing_attempt:
        return jsonify(message="Quiz already attempted"), 400
    
    # Record the new attempt
    new_attempt = AttemptedQuiz(student_id=student_id, quiz_id=quiz_id, score=score, attempted_on=datetime.now())
    new_attempt.save_to_db()
    
    return jsonify(message="Score submitted successfully"), 201
@main.route('/questions/<quiz_id>', methods=['GET'])
@jwt_required()
def get_questions_by_quiz(quiz_id):
    user = get_jwt_identity()
    if user['role'] not in ['teacher', 'student']:
        return jsonify(message="Unauthorized"), 403
    
    quiz = Quiz.get_quiz_by_id(quiz_id)
    if not quiz:
        return jsonify(message="Quiz not found"), 404
    
    questions = []
    for question_id in quiz.questions:
        question_data = Question.get_question_by_id(ObjectId(question_id))
        if question_data:
            questions.append(question_data.to_dict())
    
    return jsonify(questions=questions), 200
