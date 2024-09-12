"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def create_user():
    request_body = request.json
    user_query = User.query.filter_by(email = request_body["email"]).first()
    if user_query is None:
        create_user = User(email = request_body["email"], password = request_body["password"], is_active = request_body["is_active"])
        db.session.add(create_user)
        db.session.commit()
        response_body = {
             "msg": "Usuario creado con exito"
            }
        return jsonify(response_body), 200
    else:
        response_body = {
             "msg": "Usuario ya existe"
            }
        return jsonify(response_body), 404
    
@api.route('/login', methods=['POST'])
def login_user():
    request_body = request.json
    email = request_body.get("email")
    password = request_body.get("password")
    user_login = User.query.filter_by(email = request_body["email"]).first()
    if user_login is None:
        response_body = {
             "msg": "Usuario no existe"
            }
        return jsonify(response_body), 404
    elif email != user_login.email or password != user_login.password:
        return jsonify({"msg": "Usuario o contraseña incorrecta"}), 404
    else:
        access_token = create_access_token(identity= user_login.id)
        return jsonify({ "token": access_token })
    
@api.route('/update_user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    data = request.json
    name = data.get('name')
    if name:
        user.name = name
    email = data.get('email')
    if email:
        existing_email = User.query.filter_by(email=email).first()
        if existing_email and existing_email.id != user_id:
            return jsonify({"error": "Email already exists"}), 400
        user.email = email
    last_name = data.get('last_name')
    if last_name:
        user.last_name = last_name
    gender = data.get('gender')
    if gender:
        user.gender = gender
    birthdate = data.get('birthdate')
    if birthdate:
        user.birthdate = birthdate
    phone = data.get('phone')
    if phone:
        user.phone = phone

    db.session.commit()
    return jsonify({"message": "User updated successfully", "user": user.serialize()}), 200
