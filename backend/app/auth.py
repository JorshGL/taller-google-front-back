from flask import Blueprint, request, session, abort, jsonify
from flask_cors import cross_origin
from database import db

# Instancia de la clase Blueprint
bp = Blueprint('auth', __name__, url_prefix='auth')

@cross_origin() #esto permite que cualquier url pueda acceder a esta ruta de nuestra api
@bp.route('/register', methods=['POST'])
def register():
    data = request.get_json() #recibe los datos que se encuentren en la request en formato json
    
    if not "username" in data or not "password" in data or not "email" in data:
        return abort(418) #validamos los datos y, si no se encuentran todos, abortamos
    
    email = data['email']
    username = data['username']
    password = data['password']
    
    if db.select_from("Users", "email", email) is not None:
        return abort(418) #nos aseguramos de que el usuario no existe previamente
    
    db.insert_into("Users", ("email", "username", "password"), (email, username, password))
    db.commit()
    
    return jsonify({"state" : "listo pai"})
    