from flask import Flask, render_template
from sqlalchemy.sql.roles import BinaryElementRole
from models import Business, Location, Mainstreet, BusiMain, OnlineProfile, BusiOnline
from . import mainstreet
import json
from app import db

def create_geoJSON(mainstreet):
    try:
        file_name = "../geoJsonFiles/" + mainstreet + ".json"
        g_json = dict()
        g_json["type"] = "FeatureCollection"
        g_json["features"] = []
        items = db.session.query(Business.object_id, Business.name, Location.longitude, Location.lattitude).filter(Business.object_id == Location.b_id).join(BusiMain).join(Mainstreet).filter(Mainstreet.name == mainstreet).all()
        for row in items:
            properties_set = {"object_id": row[0], "name": row[1]}
            geometry_set = {"type": "Point", "coordinates": [float(row[2]), float(row[3])]}
            temp_set = dict()
            temp_set["type"] = "Feature"  
            temp_set["properties"] = properties_set
            temp_set["geometry"] = geometry_set
            g_json["features"].append(temp_set)
        geo_file = open(file_name, "w")
        json.dump(g_json, geo_file)
        display = json.dumps(g_json, indent=4)
        geo_file.close()
        return g_json
    except Exception as e:
        return(str(e))

@mainstreet.route("/")
def root_site():
    return "Main Page"

@mainstreet.route("/WashingtonGate")
def generate_map():
    try:
        return create_geoJSON("WashingtonGate")
    except Exception as e:
        return(str(e))

@mainstreet.route("/Brighton")
def brighton():
    try:
        return create_geoJSON('Brighton')
    except Exception as e:
        return(str(e))