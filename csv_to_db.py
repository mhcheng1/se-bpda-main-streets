import psycopg2
import os
import pandas as pd
import numpy as np

"""
This program will take a CSV file from BPDA Main Streets and add it to our database
"""

TABLES = {
    "buissness": """CREATE TABLE business (object_id integer, name VARCHAR(50), status VARCHAR(20), PRIMARY KEY(object_id))""",
    "location": """CREATE TABLE location (b_id integer, longitude VARCHAR(20), lattitude VARCHAR(20), street VARCHAR(40), postal integer, PRIMARY KEY(b_id,street), FOREIGN KEY (b_id) REFERENCES business(object_id) ON DELETE CASCADE)""",
    "online_profile": """CREATE TABLE online_profile (id integer, name VARCHAR(20), PRIMARY KEY(id))""",
    "busi_online": """CREATE TABLE busi_online (b_id integer, op_id integer, PRIMARY KEY(b_id, op_id), FOREIGN KEY(b_id) REFERENCES business(object_id), FOREIGN KEY(op_id) REFERENCES online_profile(id))""",
    "industry": """CREATE TABLE industry (id integer, NAICS integer, F2_2017 integer, F2_2017_n VARCHAR(100), F2_digit integer, F2_digit_n VARCHAR(50), PRIMARY KEY(id))""", 
    "busi_industry": """CREATE TABLE busi_industry (b_id integer, ind_id integer, PRIMARY KEY(b_id, ind_id), FOREIGN KEY(b_id) REFERENCES business(object_id), FOREIGN KEY(ind_id) REFERENCES industry(id))""",}
#TODO: Imporve industry table, not efficient

DB_USER = ''
DB_PASS = ''
DB_NAME = ''
DB_HOST = ''
DB_PORT = ''


DB_URL = 'postgresql://' + DB_USER + ':' + DB_PASS + '@' + DB_HOST +  ':' + DB_PORT + '/' + DB_NAME
cnx = psycopg2.connect(DB_URL)

def get_data_from_csv():
    df = pd.read_csv('washington_gateway.csv', header=None)
    df = df.to_numpy().tolist()
    df = remove_unneeded_columns(df)
    return df

def remove_unneeded_columns(df):
    temp = []
    #B: 0->objectID, 1->status, 8->name
    #L: 5->lat, 6->post, 7->long, 9->street
    #I: 4->NAICS, 16->F2017, 17->F2017_name, 18->F2_digit, 19-> F2_name
    for r in df:
        ls = r[0:1] + r[2:3] + r[6:8] + r[9:25]
        temp.append(ls)
    return temp

def create_all_tables():
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


def fill_all_tables(df):
    cursor = cnx.cursor()
    NAICS = None
    F2017 = None
    F2017_NAME = ""
    F2_DIGIT = None
    F2_NAME = ""

    buis_id = None
    buis_status = ""
    buis_name = ""

    loc_id = None
    long = None
    lat = None
    street = ""
    postal = None

    for i, r in enumerate(df):
        #TODO: remove this if statement
        if i==0: 
            continue

        NAICS = int(r[4])
        F2017 = int(r[16])
        F2017_NAME = r[17]
        F2_DIGIT = int(r[18])
        F2_NAME = r[19]

        query_industry = ("""INSERT INTO industry (id, NAICS, F2_2017, F2_2017_n, F2_digit, F2_digit_n)
                            VALUES (%s, %s, %s, %s, %s, %s)""")
        data_industry = (i, NAICS, F2017, F2017_NAME, F2_DIGIT, F2_NAME)

        cursor.execute(query_industry, data_industry)
        cnx.commit()

        busi_id = int(r[0])
        busi_status = r[1]
        busi_name = r[8]

        query_busi = ("""INSERT INTO business (object_id, name, status)
                        VALUES (%s, %s, %s)""")
        data_busi = (busi_id, busi_name, busi_status)

        cursor.execute(query_busi, data_busi)
        cnx.commit()

        long = r[7]
        lat = r[5]
        street = r[9]
        postal = int(r[6])

        query_location = ("""INSERT INTO location (b_id, longitude, lattitude, street, postal) 
                            VALUES (%s, %s, %s, %s, %s)""")
        data_location = (busi_id, long, lat, street, postal)
        cursor.execute(query_location, data_location)
        cnx.commit()

        query_busi_indus = ("""INSERT INTO busi_industry (b_id, ind_id) 
                            VALUES (%s, %s)""")
        data_busi_indus = (busi_id, i)

        cursor.execute(query_busi_indus, data_busi_indus)
        cnx.commit()

        fill_busi_online(busi_id, r[10], r[11], r[12], r[13], r[14], cursor)

    cursor.close()

def fill_online_profile_table():
    cursor = cnx.cursor()
    l = ['Google', 'Yelp', 'Bing', 'YP', 'DataAxle']
    for i, val in enumerate(l):
        query_profile = """INSERT INTO online_profile (id, name) VALUES (%s, %s)"""
        data_profile = (i, val)
        cursor.execute(query_profile, data_profile)
        cnx.commit()
    cursor.close()


def fill_busi_online(b_id, yelp, bing, yp, dataaxle, google, cursor):
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

def drop_all():
    cursor = cnx.cursor()
    query = """DROP TABLE busi_online, location, online_profile, busi_industry, industry, business;"""
    cursor.execute(query)
    cnx.commit()
    cursor.close()
    print("complete")

def main():
    data = get_data_from_csv()
    #create_all_tables() #This works but only needs to be runned once
    fill_online_profile_table()
    fill_all_tables(data)
    cnx.close()
    print("complete")
