import os
from flask_table import Table, Col
from flask import Flask, jsonify, request, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)

app_settings = os.getenv(
    'APP_SETTINGS',
    'config.Config'
)
app.config.from_object(app_settings)
db = SQLAlchemy(app)

from models import Business, Location, Online_profile, Busi_online, Busi_online, Industry, Busi_industry
migrate = Migrate(app, db)

class ItemTable(Table):
    name = Col('Name of Business')

@app.route("/")
def root_site():
        return "Main Page"

@app.route("/open/business")
def get_open_business():
    try:
        items = Business.query.filter_by(status='Open').all()
        #items = db.session.query(Business, Location).join(Location, Location.b_id == Business.object_id).filter(Business.status == 'Open').all()
        table = ItemTable(items)
        return table.__html__()
    except Exception as e:
        return(str(e))