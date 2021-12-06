import pandas as pd
from geojson import Feature, Point, FeatureCollection
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text, func 
from flask import Flask, render_template
from sqlalchemy.sql.roles import BinaryElementRole
from models import Business, Location, Mainstreet, BusiMain, OnlineProfile, BusiOnline
from . import mainstreet
from app import db


def create_geoJSON(ms):
    try:
        items = db.session.query(Business.object_id, Business.name, Location.longitude, Location.lattitude).filter(Business.object_id == Location.b_id).join(BusiMain).join(Mainstreet).filter(Mainstreet.name == ms).all()
        feature_lst = []
        for row in items:
            feature = Feature(geometry=Point((float(row[3]), float(row[2]))), properties={'id': row[0], 'name': row[1]})
            feature_lst.append(feature)
        feature_collection = FeatureCollection(feature_lst)
        return feature_collection
    except Exception as e:
        return (str(e))

def industry_count(ms):
    try:
        items = db.session.query(Business.naics_2_title, (func.count(Business.naics_2_title)).label('Number')).join(BusiMain).join(Mainstreet).filter(Mainstreet.name == ms).group_by(Business.naics_2_title).all()
        graph = dict()
        lst = []
        for tuple in items:
            temp = {}
            temp["industry"] = tuple[0]
            temp["number_of_businesses"] = tuple[1]
            lst.append(temp)
        graph["data"] = lst
        return graph
    except Exception as e:
        return (str(e))

def busi_info(ms):
    try:
        busi = db.session.query((func.count(Business.object_id)).label('busi_num'), (func.sum(Business.employment)).label('employ_num')).join(BusiMain).join(Mainstreet).filter(Mainstreet.name == ms).all()
        avg_employ = db.session.query((func.avg(Business.employment)).label('avg_employ')).join(BusiMain).join(Mainstreet).filter(Mainstreet.name == ms).filter(Business.employment != 0).all()
        return [busi[0][0], busi[0][1], round(avg_employ[0][0])]
    except Exception as e:
        return (str(e))

def employment_count(ms):
    try:
        items = db.session.query(Business.naics_2_title, (func.sum(Business.employment)).label('Number')).join(BusiMain).join(Mainstreet).filter(Mainstreet.name == ms).group_by(Business.naics_2_title).all()
        graph = dict()
        lst = []
        for tuple in items:
            temp = {}
            temp["industry"] = tuple[0]
            temp["number_of_employees"] = tuple[1]
            lst.append(temp)
        graph["data"] = lst
        return graph
    except Exception as e:
        return (str(e))

def homepage_data():
    try:
        data = dict()

        item1 = db.session.query(Business.naics_2_title, (func.count(Business.naics_2_title)).label('Number')).group_by(Business.naics_2_title).all()
        industry_graph = dict()
        lst = []
        for tuple in item1:
            temp = {}
            temp["industry"] = tuple[0]
            temp["number_of_businesses"] = tuple[1]
            lst.append(temp)
        industry_graph["data"] = lst

        item2 = db.session.query(Business.naics_2_title, (func.sum(Business.employment)).label('Number')).group_by(Business.naics_2_title).all()
        employee_graph = dict()
        lst = []
        for tuple in item2:
            temp = {}
            temp["industry"] = tuple[0]
            temp["number_of_employees"] = tuple[1]
            lst.append(temp)
        employee_graph["data"] = lst

        busi = db.session.query((func.count(Business.object_id)).label('busi_num'), (func.sum(Business.employment)).label('employ_num')).all()
        avg_employ = db.session.query((func.avg(Business.employment)).label('avg_employ')).filter(Business.employment != 0).all()
        
        data["industry_graph"] = industry_graph
        data["employment_graph"] = employee_graph
        data["busi_info"] = [busi[0][0], busi[0][1], round(avg_employ[0][0])]
        return data
    except Exception as e:
        return (str(e))

def get_spending_data():
    file = "../../data/trips_washington_gateway.csv"
    df = pd.read_csv(file, header=0)
    df = df.to_numpy().tolist()
    lst1 = []
    lst2 = []
    for tuple in df:
        temp1 = {}
        temp2 = {}
        if isinstance(tuple[0], str):
            temp1["date"] = tuple[0]
            temp1["share"] = tuple[1].replace("%", "")
            temp2["date"] = tuple[0]
            temp2["trips"] = tuple[2]
            lst2.append(temp2)
            lst1.append(temp1)
    return (lst1, lst2)

def collect_json(ms):
    data = dict()
    data["geo"] = create_geoJSON(ms)
    data["industry_graph"] = industry_count(ms)
    data["employment_graph"] = employment_count(ms)
    data["busi_info"] = busi_info(ms)
    return data

###These are pretty much hard coded for the data given. 
# The structure is accurate and should stand but the fucntions called or dictionaries created are hard coded
# This data is not in the database and is simplified for just this main street.
# Other than create_geoJSON, these functions are temporary and will need to be 
# updated when more data is recieved.
def collect_json_employmnet(ms):
    data = dict()
    data["geo"] = create_geoJSON(ms)
    #This is just washington gateway data 
    data["monthly_income"] = [{"Income": "$1,250 per month or less", "Count": 396},{"Income": "$1,251 to $3,333 per month", "Count": 528},{"Income": "More than $3,333 per month", "Count": 1180}]
    data["gender"] = [{"Gender":"Female", "Count": 1200},{"Gender":"Male", "Count": 904}]
    data["racial_distribution"] = [{"Race": "White Alone", "Count":1527},{"Race": "Black or African American Alone", "Count":301},{"Race": "American Indian or Alaska Native Alone", "Count":7},{"Race": "Asian Alone", "Count":236},{"Race": "Native Hawaiian or Other Pacific Islander Alone", "Count":5},{"Race": "Two or More Race Groups", "Count":28}]
    data["age_distribution"] = [{"Age": "Age 29 or younger", "Count": 494}, {"Age": "Age 30 to 54", "Count": 1123}, {"Age": "Age 55 or older", "Count": 487}]
    data["education_distribution"] = [{"Education": "Less than high school", "Count":193}, {"Education": "High school or equivalent, no college", "Count":314}, {"Education": "Some college or Associate degree", "Count":442}, {"Education": "Bachelor's degree or advanced degree", "Count":661}, {"Education": "Educational attainment unavailable", "Count":494}] 
    return data

def collect_json_spending(ms):
    data = dict()
    data["geo"] = create_geoJSON(ms)
    (spending, mobility) = get_spending_data()
    data["trips"] = mobility
    data["in_person_spending"] = spending
    return data
###

@mainstreet.route("/")
def root_site():
    return homepage_data()

@mainstreet.route("/brighton")
def brighton():
    return collect_json("Brighton")

###The reason this is only main street that has all three pages is because
# this is the only mainstreet that we had all data for
# In the future all main streets should have this.
@mainstreet.route("/washingtongateway")
def washington_gate():
    return collect_json("Washington St Gateway")

@mainstreet.route("/washingtongateway/employment")
def washington_gate_employment():
    return collect_json_employmnet("Washington St Gateway")

@mainstreet.route("/washingtongateway/spending")
def washington_gate_spending():
    return collect_json_spending("Washington St Gateway")
###

@mainstreet.route("/fourcorners")
def four_corners():
    return collect_json("Four Corners")

@mainstreet.route("/allstonvillage")
def allston_village():
    return collect_json("Allston Village")

@mainstreet.route("/eastboston")
def east_boston():
    return collect_json("East Boston")

@mainstreet.route("/threesquares")
def three_squares():
    return collect_json("Three Squares")

@mainstreet.route("/roslindalevillage")
def roslindale_village():
    return collect_json("Roslindale Village")

@mainstreet.route("/fieldscorner")
def fields_corner():
    return collect_json("Fields Corner")

@mainstreet.route("/uphamscorner")
def uphams_corner():
    return collect_json("Uphams Corner")

@mainstreet.route("/greaterashmont")
def greater_ashmont():
    return collect_json("Greater Ashmont")

@mainstreet.route("/chinatown")
def chinatown():
    return collect_json("Chinatown")

@mainstreet.route("/bowdoingeneva")
def bowdoin_geneva():
    return collect_json("Bowdoin/Geneva")

@mainstreet.route("/mattapan")
def mattapan():
    return collect_json("Mattapan")

@mainstreet.route("/hydepark")
def hyde_park():
    return collect_json("Hyde Park")

@mainstreet.route("/eglestonsquare")
def egleston_square():
    return collect_json("Egleston Square")

@mainstreet.route("/centresouth")
def centre_south():
    return collect_json("Centre/South")

@mainstreet.route("/westroxbury")
def west_roxbury():
    return collect_json("West Roxbury")

@mainstreet.route("/dudleysquare")
def dudley_square():
    return collect_json("Dudley Square")

@mainstreet.route("/missionhill")
def mission_hill():
    return collect_json("Mission Hill")

@mainstreet.errorhandler(404)
def page_not_found(e):
    return "404 Page not Found"