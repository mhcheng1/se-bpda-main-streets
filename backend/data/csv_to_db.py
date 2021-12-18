import psycopg2
import os
import pandas as pd
import numpy as np

"""
This program will take a CSV file of all the Boston Main Streets businesses and add it a PostgreSQL database. This database is based on MainStreets_Business_List.csv.
"""

TABLES = {
    "business": """CREATE TABLE business (object_id integer, name VARCHAR(150), employment integer, naics_6 integer, naics_6_title VARCHAR(150), naics_2 integer, naics_2_title VARCHAR(150), PRIMARY KEY(object_id))""",
    "mainstreet": """CREATE TABLE mainstreet (id integer, name VARCHAR(100), PRIMARY KEY(id))""",
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

def get_data_from_csv(file):
    """
    Input: File name
    Output: A list of lists of the inputted files data
    Description: Turn csv file into list of lists
    """
    df = pd.read_csv(file, header=0)
    df = df.to_numpy().tolist()
    return df

def create_all_tables(cnx):
    """
    Input: Database connection
    Output: None
    Description: This function creates all the tables in the database
    """
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

def fill_all_tables(cnx, df):
    """
    Input: Database connection, list of lists containing the data from file
    Output: None
    Description: Populate the databse with the data from the file
    """
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

    cursor.close()

def fill_mainstreet_table(cnx):
    """
    Input: Database connection
    Output: None
    Description: Create the mainstreet table consisting of the main street name and its corresponding id
    """
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
    """
    Input: Database connection
    Output: None
    Description: Create the online_profile table which has the name of the online profile and its corresponding id
    """
    cursor = cnx.cursor()
    l = ['Google', 'Yelp', 'Bing', 'YP', 'DataAxle']
    for i, val in enumerate(l):
        query_profile = """INSERT INTO online_profile (id, name) VALUES (%s, %s)"""
        data_profile = (i, val)
        cursor.execute(query_profile, data_profile)
        cnx.commit()
    cursor.close()

def fill_busi_online_table(cnx, b_id, yelp, bing, yp, dataaxle, google, cursor):
    """
    Note - This is currently unused by MainStreets_Business_List.csv's data. However it is used in washington_gateway_csv. 
           If this data is used in the future, this function can be used.
    Input: 
        cnx - A database connection,
        cursor - database cursor
        b_id - the business id from the business table
        yelp, bing, yp, dataaxle, google -  a 'Yes' or 'No' String of whether or not the corresponding business has this online profile
    Output: None
    Description: Create the busi_online table 
    """
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
    """
    Input: None
    Output: None
    Description: Drop all current tables
    """
    cnx = psycopg2.connect(DB_URL)
    cursor = cnx.cursor()
    query = """DROP TABLE business, mainstreet, location, online_profile, busi_online, busi_to_main;"""
    cursor.execute(query)
    cnx.commit()
    cursor.close()
    cnx.close()

    print("complete")

def populate_database(file):
    """
    Input: File name
    Output: None
    Description: Get data from the inputted file, create the database tables, then populate the database tables through the helper functions
    """
    data = get_data_from_csv(file)

    cnx = psycopg2.connect(DB_URL)
    create_all_tables(cnx) 
    fill_online_profile_table(cnx)
    fill_mainstreet_table(cnx)
    fill_all_tables(cnx, data)
    cnx.close()

    print("complete")

#populate_database('data/MainStreets_Business_List.csv', True)
#drop_all_tables()
