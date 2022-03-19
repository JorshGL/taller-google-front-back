from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app) 
    
    app.config.from_mapping(
        SECRET_KEY = "mySecretKey"
    )
    
    from . import auth
    app.register_blueprint(auth.bp)
    
    return app
