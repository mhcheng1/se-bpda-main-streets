import numpy as np 
import plotly.graph_objects as go
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text, func 
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

def generate_graph():
    try:
        items = db.session.query(Business.naics_2_title, (func.count(Business.naics_2_title)).label('Number')).group_by(Business.naics_2_title).all()
        industry = []
        number = []
        for tuple in items:
            industry.append(tuple[0])
            number.append(tuple[1])
        # fig = plt.figure(figsize = (30,10))
        # plt.barh(industry, number, color = 'blue')
        # plt.xlabel("Number of Businesses")
        # plt.ylabel("Industries")
        # plt.title("Number of Businesses in Each Industry in Washington Gate")
        # plt.savefig('bar-chart.png')
        # fig, ax = plt.subplots()
        # mpld3.fig_to_html(fig, d3_url=None, mpld3_url=None, no_extras=False, template_type='general', figid=None, use_http=False)
        # mpld3.show()

        fig = go.Figure(go.Bar(
            x=number,
            y=industry,
            orientation='h'))
        fig.update_layout(
            title = "Number of Businesses by Industry in Washington Gate",
            xaxis_title = "Number of Businesses",
            yaxis_title = "Industries"
        )
        fig.show()
        return "Rendering graph in other page"
    except Exception as e:
        return(str(e))

@mainstreet.route("/")
def root_site():
    return "Main Page"

@mainstreet.route("/WashingtonGate")
def washington():
    return generate_graph()

@mainstreet.route("/Brighton")
def brighton():
    return create_geoJSON('Brighton')
