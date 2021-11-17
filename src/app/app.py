from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import config

db = SQLAlchemy()

def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    from web import mainstreet as main_blueprint
    app.register_blueprint(main_blueprint)

    db = SQLAlchemy(app)
    migrate = Migrate(app, db)

    return app
