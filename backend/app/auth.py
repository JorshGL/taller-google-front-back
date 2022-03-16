from flask import Blueprint, request, session
from database import db

bp = Blueprint('auth', __name__, url_prefix='auth')


