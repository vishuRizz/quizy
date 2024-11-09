from . import mongo

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
    def __init__(self, title, description, created_by, questions=[]):
        self.title = title
        self.description = description
        self.created_by = created_by
        self.questions = questions  # Array of question dictionaries

    def save_to_db(self):
        quiz = {
            'title': self.title,
            'description': self.description,
            'created_by': self.created_by,
            'questions': [question.to_dict() for question in self.questions]  
        }
        mongo.db.quizzes.insert_one(quiz)

class Question:
    def __init__(self, question_text, options, correct_option_index):
        self.question_text = question_text
        self.options = options
        self.correct_option_index = correct_option_index

    def to_dict(self):
        return {
            'question_text': self.question_text,
            'options': self.options,
            'correct_option_index': self.correct_option_index,
            'correct_answer': self.options[self.correct_option_index]
        }
