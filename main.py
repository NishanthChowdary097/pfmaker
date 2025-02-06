from bottle import Bottle, template, static_file, request, run, redirect, error ,response
from jinja2 import Environment, FileSystemLoader
from pymongo import MongoClient
import hashlib
import jwt
import datetime
import json
from bson import ObjectId

app = Bottle()

template_folder = './views'
static_folder = './static'
app.config['views'] = template_folder

SECRET_KEY = 'myJWT'

jinja_env = Environment(loader=FileSystemLoader(template_folder))

session = {}

def hash_password(password):
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

# Function to generate JWT token
def generate_jwt(user_id):
    payload = {
        'user_id': user_id,
        'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=1)  # Token expiration time (1 hour)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token

# Function to decode and verify JWT token
def decode_jwt(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return None  # Token has expired
    except jwt.InvalidTokenError:
        return None  # Invalid token

def is_logged_in():
    token = request.get_cookie("token")
    if token:
        payload = decode_jwt(token)
        if payload:
            return payload['user_id']
    return None

def login_required(func):
    def wrapper(*args, **kwargs):
        if not is_logged_in():
            redirect('/login')
        return func(*args, **kwargs)
    return wrapper

@app.route('/signup', method=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.forms.get('username')
        password = request.forms.get('password')
        if not username or not password:
            return "Username and Password are required!"
        if users.find_one({'username': username}):
            return "Username already exists. Please try a different one."
        hashed_password = hash_password(password)
        users.insert_one({'username': username, 'password': hashed_password})
        token = generate_jwt(username)
        response.set_cookie('token', token , path='/', http_only=True, secure=False)
        return redirect('/dashboard')
    if(request.get_cookie('token')):
        if(is_logged_in()):
            return redirect('/dashboard')
    return template('signup.tpl')

@app.route('/login', method=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.forms.get('username')
        password = request.forms.get('password')
        print(username,password)
        if not username or not password:
            return "Username and Password are required!"
        user = users.find_one({'username': username})
        if user:
            hashed_password = user['password']
            if hashed_password == hash_password(password):
                # response.set_cookie(generate_jwt(user["username"]))
                print(user)
                response.set_cookie('token', generate_jwt(user["username"]), path='/', max_age=3600)
                return redirect('/dashboard')
            else:
                return "Incorrect password. Try again."
        else:
            return "Username not found."
    if(request.get_cookie('token')):
        if(is_logged_in()):
            return redirect('/dashboard')
    return template('login.tpl')

@app.route('/logout')
def logout():
    response.set_cookie('token', '', expires=0)
    return redirect('/login')

@app.route('/')
def index():
    # template = jinja_env.get_template('landing.tpl')
    return template('landing.tpl')

@app.route('/dashboard')
@login_required
def dashboard():
    return template('dashboard')
# Route for about page

# Serve static files like images, CSS
@app.route('/static/<filepath:path>')
def server_static(filepath):
    return static_file(filepath, root=static_folder)

@app.route('/kill')
def end_server():
    exit()
    
# Run the application
if __name__ == '__main__':
    client = MongoClient('mongodb+srv://amethyst88:Nigger123@cluster0.43osksu.mongodb.net/')
    # client = MongoClient('mongodb://localhost:27017/')
    db = client['pfmaker']
    users = db['users']
    print("connected to mongo")
    user_schema = {
    "_id": ObjectId,
    "username": str,
    "password": str,
    "contacts": [str],
    "languages": [str],
    "skills": [str],
    "tools": [str],
    "name": str,
    "projects": [str],
    "lor": str,
    "messages": [str],
    "resume": str
}
    run(app, host='0.0.0.0', port=8080)
    # app.run(debug=True ,port=8000)
