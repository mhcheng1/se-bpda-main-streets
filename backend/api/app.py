from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import config
from flask_cors import CORS

db = SQLAlchemy()

def create_app(config_name):
    """
    Input: Type of configuration for this Flask App
    Output: Flask App
    Description: Create and return Flask App
    """
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    CORS(app)

    from web import mainstreet as main_blueprint
    app.register_blueprint(main_blueprint)

    db = SQLAlchemy(app)
    Migrate(app, db)

    return app
