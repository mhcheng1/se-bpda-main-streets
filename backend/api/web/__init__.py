from flask import Blueprint

mainstreet = Blueprint('mainstreet', __name__)

from . import views