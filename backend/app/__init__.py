from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app) 
    
    app.config.from_mapping(
        SECRET_KEY = "mySecretKey"
    )
    
    app.config['CORS_HEADERS'] = 'Content Type'
    
    from . import auth
    app.register_blueprint(auth.bp)
    
    @app.route('/')
    def root():
        return "<p>rawrxd hehe</p>"
    
    return app