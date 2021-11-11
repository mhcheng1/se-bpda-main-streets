import os
from flask_table import Table, Col
from flask import Flask, jsonify, request, render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
import json
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

def create_geoJSON():
    try:
        g_json = dict()
        g_json["type"] = "FeatureCollection"
        g_json["features"] = []
        items = db.session.query(Business.object_id, Business.name, Location.longitude, Location.lattitude).filter(Business.object_id == Location.b_id).all()
        for row in items:
            properties_set = {"object_id": row[0], "name": row[1]}
            geometry_set = {"type": "Point", "coordinates": [float(row[2]), float(row[3])]}
            temp_set = dict()
            temp_set["type"] = "Feature"  
            temp_set["properties"] = properties_set
            temp_set["geometry"] = geometry_set
            g_json["features"].append(temp_set)
        geo_file = open("../geoJsonFiles/washington_gate_busi.json", "w")
        json.dump(g_json, geo_file)
        geo_file.close()
        return "Worked!"
    except Exception as e:
        return(str(e))

@app.route("/")
def root_site():
        return "Main Page"

@app.route("/WashingtonGate")
def generate_map():
    try:
        return create_geoJSON()
    except Exception as e:
        return(str(e))

