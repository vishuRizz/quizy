from flask import Blueprint, request, jsonify, Response
from flask_jwt_extended import jwt_required, get_jwt_identity
from .models import Quiz, Question
from bson import ObjectId
import json

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
    new_quiz.id = str(ObjectId())  # Generate a unique _id for the quiz
    new_quiz.save_to_db()
    quiz_id = new_quiz.id
    return jsonify(message="Quiz created successfully", quiz_id=quiz_id), 201
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
    
    return jsonify(message="Question added successfully", question_id=question_id), 201


class ObjectIdEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return json.JSONEncoder.default(self, obj)

@main.route('/quizzes', methods=['GET'])
@jwt_required()
def get_all_quizzes():
    user = get_jwt_identity()
    # Allow access for both students and teachers
    if user['role'] not in ['teacher', 'student']:
        return jsonify(message="Unauthorized"), 403
    
    # Fetch all quizzes if accessed by a student or quizzes by a teacher if accessed by a teacher
    if user['role'] == 'teacher':
        quizzes = Quiz.get_all_quizzes_by_teacher(user['username'])
    else:
        quizzes = Quiz.get_all_quizzes()  # Assume this fetches all quizzes for students
    
    data = {'quizzes': [quiz.to_dict() for quiz in quizzes]}
    return Response(json.dumps(data, cls=ObjectIdEncoder), mimetype='application/json')



@main.route('/questions/<quiz_id>', methods=['GET'])
@jwt_required()
def get_questions_by_quiz(quiz_id):
    user = get_jwt_identity()
    # Allow access for both students and teachers
    if user['role'] not in ['teacher', 'student']:
        return jsonify(message="Unauthorized"), 403
    
    quiz = Quiz.get_quiz_by_id(quiz_id)
    if not quiz:
        return jsonify(message="Quiz not found"), 404
    
    questions = []
    for question_id in quiz.questions:
        if not question_id:
            continue
        try:
            question_id = ObjectId(question_id)
        except Exception:
            continue
        
        question_data = Question.get_question_by_id(question_id)
        if question_data:
            questions.append(question_data.to_dict())
    
    return jsonify(questions=questions), 200
