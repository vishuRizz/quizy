from . import mongo
from bson import ObjectId

class User:
    def __init__(self, username, password, role):
        self.username = username
        self.password = password
        self.role = role

    def save_to_db(self):
        mongo.db.users.insert_one({
            'username': self.username,
            'password': self.password, 
            'role': self.role
        })

    @staticmethod
    def find_by_username(username):
        return mongo.db.users.find_one({'username': username})

class Quiz:
    def __init__(self, title, description, created_by, questions=None, _id=None):
        self.title = title
        self.description = description
        self.created_by = created_by
        self.questions = questions if questions else []
        self.id = _id if _id else ObjectId()

    def to_dict(self):
        return {
            '_id': str(self.id),
            'title': self.title,
            'description': self.description,
            'created_by': self.created_by,
            'questions': [str(q) for q in self.questions]  # Convert ObjectIds to strings
        }

    def save_to_db(self):
        quiz_data = self.to_dict()
        quiz_data['_id'] = self.id  # Store ObjectId directly in MongoDB
        mongo.db.quizzes.insert_one(quiz_data)

    @staticmethod
    def add_question_to_quiz(quiz_id, question_id):
        mongo.db.quizzes.update_one(
            {'_id': ObjectId(quiz_id)},  # Cast to ObjectId
            {'$push': {'questions': ObjectId(question_id)}}
        )

    @staticmethod
    def get_all_quizzes_by_teacher(username):
        quizzes = mongo.db.quizzes.find({'created_by': username})
        return [Quiz(**quiz) for quiz in quizzes]

    @staticmethod
    def get_quiz_by_id(quiz_id):
        quiz = mongo.db.quizzes.find_one({'_id': ObjectId(quiz_id)})
        if quiz:
            return Quiz(**quiz)
        return None

    @staticmethod
    def get_all_quizzes():
        quizzes = mongo.db.quizzes.find()
        return [Quiz(**quiz) for quiz in quizzes]

class Question:
    def __init__(self, quiz_id, question_text, options, correct_option_index, _id=None):
        self.quiz_id = quiz_id
        self.question_text = question_text
        self.options = options
        self.correct_option_index = correct_option_index
        self.id = _id if _id else ObjectId()

    def to_dict(self):
        return {
            '_id': str(self.id),
            'quiz_id': str(self.quiz_id),
            'question_text': self.question_text,
            'options': self.options,
            'correct_option_index': self.correct_option_index
        }

    def save_to_db(self):
        question_data = self.to_dict()
        question_data['_id'] = self.id  # Store ObjectId directly in MongoDB
        mongo.db.questions.insert_one(question_data)
        return str(self.id)

    @staticmethod
    def get_question_by_id(question_id):
        question_data = mongo.db.questions.find_one({'_id': ObjectId(question_id)})
        if question_data:
            return Question(
                quiz_id=question_data['quiz_id'],
                question_text=question_data['question_text'],
                options=question_data['options'],
                correct_option_index=question_data['correct_option_index'],
                _id=question_data['_id']
            )
        return None
