from flask import Blueprint, request, session, abort, jsonify
from flask_cors import cross_origin
from .db import db

# Instancia de la clase Blueprint
bp = Blueprint('auth', __name__, url_prefix='/auth')

@cross_origin() #esto permite que cualquier url pueda acceder a esta ruta de nuestra api
@bp.route('/register', methods=['POST'])
def register():
    data = request.get_json() #recibe los datos que se encuentren en la request en formato json
    
    try:
        email = data['email']
        username = data['username']
        password = data['password']
    except KeyError:
        return abort(418)
    
    if not username or not password or not email:
        return abort(418) #validamos los datos y, si no se encuentran todos, devolvemos un codigo de error
    
    if db.select_from("Users", "email", email) is not None:
        return abort(418) #nos aseguramos de que el usuario no existe previamente
    
    db.insert_into("Users", ("email", "username", "password"), (email, username, password)) #insertar datos en la bd
    db.commit() #guardar la bd
    
    return jsonify({"state" : "listo pai"})
    
    
@cross_origin
@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not "password" in data or not "email" in data:
        return abort(418)
  
    email = data['email']
    password = data['password']
    
    user = db.select_from('Users', 'email', email)
    
    if user is None or password != user['password']:
        return abort(418) # 406
    
    session.clear()
    
    session['user_id'] = user['id']
    
    return jsonify({"state" : "listo pai"})


# @bp.before_app_request
# def load_logged_in_g_user():
#     if 'user_id' not in session:
#         g.user = None
        
#     else:
#         user_id = session['user_id']
#         db.select_from('Users', 'id', user_id)
#         g.user = db.select_from('Users', 'id', user_id)


@bp.route('/get_user/<int:id>')
def get_user(id):
    user = db.select_from('Users', 'id', id)
    return jsonify(user)