import os
from flask_table import Table, Col
from flask import Flask, jsonify, request, render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
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

class ItemTable1(Table):
    name = Col('Name of Business')

class ItemTable2(Table):
    name = Col('Name of Business')
    street = Col('Address')

@app.route("/")
def root_site():
        return "Main Page"

@app.route("/open/business")
def get_open_business():
    try:
        items = Business.query.filter_by(status='Open').all()
        table = ItemTable1(items)
        return table.__html__()
    except Exception as e:
        return(str(e))

@app.route("/business/location")
def get_business_location():
    try:
        sql = text('SELECT B.name, L.street FROM business B, location L WHERE B.object_id=L.b_id')
        items = db.engine.execute(sql)
        table = ItemTable2(items)
        return table.__html__()
    except Exception as e:
        return(str(e))