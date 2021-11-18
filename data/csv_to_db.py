import psycopg2
import os
import pandas as pd
import numpy as np

"""
This program will take a CSV file of all the Boston Main Streets busineess and add it to our database
"""

#TODO: implement the table for Users and its relationship

TABLES = {
    "business": """CREATE TABLE business (object_id integer, name VARCHAR(100), employment integer, naics_6 integer, naics_6_title VARCHAR(100), naics_2 integer, naics_2_title VARCHAR(100), PRIMARY KEY(object_id))""",
    "mainstreet": """CREATE TABLE mainstreet (id integer, name VARCHAR(50), PRIMARY KEY(id))""",
    "location": """CREATE TABLE location (b_id integer, longitude VARCHAR(20), lattitude VARCHAR(20), street VARCHAR(100), postal integer, PRIMARY KEY(b_id,street), FOREIGN KEY (b_id) REFERENCES business(object_id) ON DELETE CASCADE)""",
    "online_profile": """CREATE TABLE online_profile (id integer, name VARCHAR(20), PRIMARY KEY(id))""",
    "busi_online": """CREATE TABLE busi_online (b_id integer, op_id integer, PRIMARY KEY(b_id, op_id), FOREIGN KEY(b_id) REFERENCES business(object_id), FOREIGN KEY(op_id) REFERENCES online_profile(id))""",
    "busi_to_main": """CREATE TABLE busi_to_main (b_id integer, m_id integer, PRIMARY KEY(b_id, m_id), FOREIGN KEY(b_id) REFERENCES business(object_id), FOREIGN KEY(m_id) REFERENCES mainstreet(id))"""}

MAINSTREETS = {'Four Corners': 1, 'Allston Village': 2, 'East Boston': 3, 'Three Squares': 4, 'Washington St Gateway': 5, 
                'Roslindale Village': 6, 'Fields Corner': 7, 'Uphams Corner': 8, 'Greater Ashmont': 9, 'Chinatown': 10, 
                'Bowdoin/Geneva': 11, 'Mattapan': 12, 'Hyde Park': 13, 'Grove Hall': 14, 'Brighton': 15, 'Egleston Square': 16, 
                'Centre/South': 17, 'West Roxbury': 18, 'Dudley Square': 19, 'Mission Hill': 20, '': None}

DB_USER = ''
DB_PASS = ''
DB_NAME = ''
DB_HOST = ''
DB_PORT = ''

DB_URL = 'postgresql://' + DB_USER + ':' + DB_PASS + '@' + DB_HOST +  ':' + DB_PORT + '/' + DB_NAME

def get_data_from_csv(file, simplified):
    df = pd.read_csv(file, header=0)
    df = df.to_numpy().tolist()
    if not simplified:
        df = remove_unneeded_columns(df)
    return df

def remove_unneeded_columns(df):
#TODO: need to fix this so it returns the same list as the simplified data
    #This will allow for different types of csv to be used by the same script
    temp = []
    #B: 0->objectID, 1->status, 8->name
    #L: 5->lat, 6->post, 7->long, 9->street
    #I: 4->NAICS, 16->F2017, 17->F2017_name, 18->F2_digit, 19-> F2_name
    for r in df:
        ls = r[0:1] + r[2:3] + r[6:8] + r[9:25]
        temp.append(ls)
    return temp

def create_all_tables(cnx):
    cursor = cnx.cursor()
    for table_name in TABLES:
        table_query = TABLES[table_name]
        try:
            print("Creating table {}: ".format(table_name), end='')
            cursor.execute(table_query)
            cnx.commit()
        except psycopg2.Error as err:
            print("Error:      " + err)
        else:
            print("OK")
    cursor.close()

def fill_all_tables(cnx, df, simplified):
    cursor = cnx.cursor()

    busi_id = None
    busi_name = ""

    long = None
    lat = None
    street = ""
    postal = None

    for i, r in enumerate(df):

        busi_id = i+1
        busi_name = r[3]
        employment = r[10]
        naics_6 = r[6]
        naics_6_title = r[7]
        naics_2 = r[8]
        naics_2_title = r[9]

        query_business = ("""INSERT INTO business (object_id, name, employment, naics_6, naics_6_title, naics_2, naics_2_title)
                            VALUES (%s, %s, %s, %s, %s, %s, %s)""")
        data_business = (busi_id, busi_name, employment, naics_6, naics_6_title, naics_2, naics_2_title)

        cursor.execute(query_business, data_business)
        cnx.commit()

        long = str(r[2])
        lat = str(r[1])
        street = r[4]
        postal = r[5]

        query_location = ("""INSERT INTO location (b_id, longitude, lattitude, street, postal) 
                            VALUES (%s, %s, %s, %s, %s)""")
        data_location = (busi_id, long, lat, street, postal)
        cursor.execute(query_location, data_location)
        cnx.commit()

        busi_main = r[12]
        if busi_main != ' ':
            main_id = MAINSTREETS[busi_main]

            query_busi_main = ("""INSERT INTO busi_to_main (b_id, m_id) 
                                VALUES (%s, %s)""")
            data_busi_main = (busi_id, main_id)
            cursor.execute(query_busi_main, data_busi_main)
            cnx.commit()

        if not simplified:
            fill_busi_online_table(cnx, busi_id, r[12], r[13], r[14], r[15], r[16], cursor)

    cursor.close()

def fill_mainstreet_table(cnx):
    cursor = cnx.cursor()
    for val in MAINSTREETS:
        if MAINSTREETS[val] == None:
            continue
        query_mainstreet = """INSERT INTO mainstreet (id, name) VALUES (%s, %s)"""
        data_mainstreet = (MAINSTREETS[val], val)
        cursor.execute(query_mainstreet, data_mainstreet)
        cnx.commit()
    cursor.close()

def fill_online_profile_table(cnx):
    cursor = cnx.cursor()
    l = ['Google', 'Yelp', 'Bing', 'YP', 'DataAxle']
    for i, val in enumerate(l):
        query_profile = """INSERT INTO online_profile (id, name) VALUES (%s, %s)"""
        data_profile = (i, val)
        cursor.execute(query_profile, data_profile)
        cnx.commit()
    cursor.close()

def fill_busi_online_table(cnx, b_id, yelp, bing, yp, dataaxle, google, cursor):
    query_op = ("""INSERT INTO busi_online 
                    (b_id, op_id) 
                    VALUES (%s, %s)""")
    if yelp == 'Y':
        data_op = (b_id, 1)
        cursor.execute(query_op, data_op)
        cnx.commit()
    if google == 'Y':
        data_op = (b_id, 0)
        cursor.execute(query_op, data_op)
        cnx.commit()
    if bing == 'Y':
        data_op = (b_id, 2)
        cursor.execute(query_op, data_op)
        cnx.commit()
    if yp == 'Y':
        data_op = (b_id, 3)
        cursor.execute(query_op, data_op)
        cnx.commit()
    if dataaxle == 'Y':
        data_op = (b_id, 4)
        cursor.execute(query_op, data_op)
        cnx.commit()

def drop_all_tables():
    cnx = psycopg2.connect(DB_URL)
    cursor = cnx.cursor()
    query = """DROP TABLE business, mainstreet, location, online_profile, busi_online, busi_to_main;"""
    cursor.execute(query)
    cnx.commit()
    cursor.close()
    cnx.close()

    print("complete")

def populate_database(file, simplified):
    data = get_data_from_csv(file, simplified)

    cnx = psycopg2.connect(DB_URL)
    create_all_tables(cnx) #This works but only needs to be runned once
    fill_online_profile_table(cnx)
    fill_mainstreet_table(cnx)
    fill_all_tables(cnx, data, simplified)
    cnx.close()

    print("complete")

#populate_database('data/MainStreets_Business_List.csv', True)
#drop_all_tables()
