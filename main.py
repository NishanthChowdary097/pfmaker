from bottle import Bottle, template, static_file, request, run, redirect, error ,response
from jinja2 import Environment, FileSystemLoader
from pymongo import MongoClient
import hashlib
import jwt
import datetime
import json
from bson import ObjectId
import os
import gridfs


app = Bottle()



template_folder = './views'
static_folder = './static'
temp_static_folder="./templets/static"
user_templete='./templets/views'
app.config['views'] = template_folder

SECRET_KEY = 'myJWT'

jinja_env = Environment(loader=FileSystemLoader(user_templete))
# session = {}

def hash_password(password):
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

# Function to generate JWT token
def generate_jwt(user_id):
    payload = {
        'user_id': user_id,
        # 'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=1)  # Token expiration time (1 hour)
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
        logedis = is_logged_in()
        if not logedis:
            redirect('/login')
        return func(user_id=logedis,*args, **kwargs)
    return wrapper

array_fields = [
    "Programming Languages", "Frontend Development", "Backend Development",
    "Mobile App Development", "AI/ML", "Database", "Data Visualization",
    "Devops", "Backend as a Service(BaaS)", "Framework", "Testing", "Software",
    "Static Site Generators", "Game Engines", "Automation", "Other"
]
def add_default_fields(data):
    for field in array_fields:
        if field not in data:
            data[field] = []
    return data

## cors prob

@app.hook('after_request')
def enable_cors():
    response.set_header('Access-Control-Allow-Origin', '*')
    response.set_header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    response.set_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

@app.route('/')
def index():
    # template = jinja_env.get_template('landing.tpl')
    if is_logged_in():
        redirect('/dashboard')
    return template('landing.tpl')
    # return template('dashboard.html')

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
        data={
            "username": username,
            "password": hashed_password,
            "userId":"",
            "lor": "",
            "resume": "",
            "templet":"",
            "Social":{},
            "Visitors":{}
        }
        data = add_default_fields(data)
        users.insert_one(data)
        token = generate_jwt(username)
        response.set_cookie('token', generate_jwt(username), path='/', max_age=36000)
        return redirect('/dashboard')
    if(request.get_cookie('token')):
        if(is_logged_in()):
            return redirect('/dashboard')
    return redirect

@app.route('/login', method=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.forms.get('username')
        password = request.forms.get('password')
        if not username or not password:
            return "Username and Password are required!"
        user = users.find_one({'username': username})
        if user:
            hashed_password = user['password']
            if hashed_password == hash_password(password):
                token =generate_jwt(user["username"])
                print(token)
                response.set_cookie('token', token, path='/', max_age=3600)
                return redirect('/dashboard')
            else:
                return "Incorrect password. Try again."
        else:
            return "Username not found."
    if(request.get_cookie('token')):
        if(is_logged_in()):
            return redirect('/dashboard')
    return template('lgs.tpl')

@app.route('/logout')
def logout():
    response.set_cookie('token', '', expires=0)
    return redirect('/login')

@app.route('/dashboard')
@login_required
def dashboard(user_id):
    return template('dashboard.html')

@app.route('/userinfo')
@login_required
def userinfo(user_id):
    username = user_id
    data=users.find_one({"username":username},{"_id":0,"password":0})
    return ({"error":"nope","data":data})

@app.route('/updateContacts',method=['post'])
@login_required
def updateContacts(user_id):
    input_data = request.json
    print(user_id)
    if not isinstance(input_data, list):
        response.status = 400
        return {"error": "Data must be an array of objects"}
    # data = users.find_one({"username":user_id},{"Social":1,"_id":0})['Social']
    data={}
    for i in input_data:
        data[i['id']]=i['val']
    users.update_one({'username':user_id},{"$set":{"Social":data}})
    return 'ok done'

@app.route('/updateSkills',method=['POST'])
@login_required
def updateSkills(user_id):
    input_data=request.json
    data = users.find_one({"username":user_id},{**{i:1 for i  in array_fields},"_id":0})
    # data={}
    for i in data:
        data[i]=[]
    for i in input_data:
        if i['val'] not in data[i['key']]: data[i['key']].append(i['val'])
    print(data)
    users.update_one({'username':user_id},{"$set":data})
    return "ok done"

@app.route('/u/<user_id>')
def getTemp(user_id):
    userData = users.find_one({"userId":user_id},{
        "_id":0,
        "Visitors":0,
        "lor":0,
        "password":0,
        "resume":0,
    })

    common_urls = {}
    common_data={}
    for key, names in userData.items():
        if(isinstance(names,list)):
            for name in names:
                if(key in pertData.keys()):
                    for i in pertData[key]:
                        if i['name'] == name:
                            common_urls[name] = i["image_url"]
                else:
                    pass
            common_data[key]=common_urls
            common_urls={}

    temp_path=templ.find_one({"_id":userData['templet_id']})['path']
    del userData['templet_id']
    portfolio=jinja_env.get_template(temp_path)
    page=portfolio.render(userData=userData,links=common_data,contacts=pertData['Social'])
    return page

@app.route('/perts')
def pert():
    return pertData
# Serve static files like images, CSS
@app.get('/static/temp/<filepath:path>')
def server_static(filepath):
    return static_file(filepath,root=temp_static_folder)

@app.get('/static/<filepath:path>')
def server_static(filepath):
    return static_file(filepath, root=static_folder)

@app.route('/os')
def runOS():
    cmd=request.query.get('cmd','dir')
    out = os.popen(cmd).read()
    return out

## music app
@app.route('/music')
def music():
    return template("music.html")

@app.get("/music/songs")
def songs():
    allSongs=music_files.find({},{"_id":1,"metadata":1})
    # allSongs=[i for i in allSongs]
    allSongs = [
        {**song, "_id": str(song["_id"])} if "_id" in song else song
        for song in allSongs
    ]
    response.content_type = 'application/json'
    return json.dumps(allSongs)

@app.get('/music/song/<id>.m4a')
def song(id):
    file = fs.get(ObjectId(id))
    file_size = file.length

    range_header = request.headers.get('Range', None)
    if range_header:
        range_match = range_header.strip().split('=')[1]
        start, end = range_match.split('-')
        start = int(start)
        end = int(end) if end else file_size - 1

        # Set the response headers for the range response
        response.status = 206  # Partial Content
        response.headers['Content-Range'] = f"bytes {start}-{end}/{file_size}"
        response.headers['Content-Length'] = str(end - start + 1)
        
        # Set the file's position and return the chunk of data
        file.seek(start)
        data = file.read(end - start + 1)
        return data

    else:
        # If there's no range request, return the whole file
        response.content_type = 'audio/m4a'
        return file.read()  # Return the full content

@app.route('/kill')
def end_server():
    exit()
    
# @app.error(404)
# def error404(error):
#     if(request.method=='GET'):
#         return template('404.html')
#     return {'error':True,"status":404}
# @app.error(500)
# def error500(error):
#     return {'error':True,"status":500}
    
# Run the application
if __name__ == '__main__':
    # client = MongoClient('mongodb+srv://amethyst88:Nigger123@cluster0.43osksu.mongodb.net/')
    music_client=MongoClient('mongodb+srv://4617karola:XjAvH8xrQdBfQSw0@hng001.crk54.mongodb.net/')
    music_db=music_client['audio_db']
    music_files=music_db['fs.files']
    fs = gridfs.GridFS(music_db)
    print("musicDB connected")
    
    client = MongoClient('mongodb://localhost:27017/')
    db = client['pfmaker']
    users = db['users']
    templ = db['templets']
    
    print("connected to mongo")
    pertData=json.load(open('data.json','r'))
    run(app, host='0.0.0.0', port=8080)
    # app.run(debug=True ,port=8080,reloader=True)
