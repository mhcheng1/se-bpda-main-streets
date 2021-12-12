# Boston Main Street District Viewer

Boston Main Street District Viewer is a project from the BPDA Research Division and Boston University Spark. This interactive map combines public data and anonymized data from private companies to visualize the characteristics of Boston Main Street Districts and the impact of COVID-19 pandemic on the economic prospects of businesses and people in each district.

This is part of broader initiative to understand the current environment in Boston. More research produced by the Boston Planning and Development Agency can be found on the BPDA Research Website: www.bostonplans.org/research

## Technical Architecture 

Frontend: 
 - React App
Backend:
 - Python Flask
Database
 - Postgres
 - hosted by Heroku

 **Insert Image**

## Relational Database

This was built based of data given in backend/data/MainStreets_Business_List.csv

In backend/data/csv_to_db.py, the tables are created and then populated.

**Important Note**: This database cannot be worked on anymore due to the limitations of a free Heroku account. This database is only temporary and should be left alone and simply used to display the current data within the tables. If future work is needed, such as adding features to the table, I reccomend creating a new database and using the script provided (csv_to_db.py).

**Insert Image**

## Flask API and React App Deployment

Clone the repository first

### Run Flask API Locally

Enter backend directory

`cd backend`

Download requirements from requirements.txt

`pip install -r requirements.txt`

Commands are also located in /backend/launch.sh

`cd api`

For Linux System: 
`export FLASK_APP="app:create_app('default')"`

For Windows Powershell:
`env:FLASK_APP = "app:create_app('default')"`

`flask run`

### Deployment of Flask API

Deployed on a virtual machine 

The current Flask API is deployed here: [Deployed FLASK API](https://se-bpda.buspark.io/)

### Deployment of React App Locally

Enter frontend directory

`cd frontend/dev-app/`

Download requirements

`npm install`

Deploy

`npm start`

If react scripts are needed (an error arises when deploying for react scripts)

`npm install react-scripts --save`

### Deploy React App to Github Pages

Enter frontend directory

`cd frontend/dev-app/`

Deploy to [BPDA Page](https://bu-spark.github.io/se-bpda-main-streets/)

`npm run deploy`