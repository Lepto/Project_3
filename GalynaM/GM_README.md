## Project_3 GalynaM
----------------------------------------------------------------------------------------------------

#### app.py
- main file to run project from. Flask and Python.
- Flask routs connect to SQLite DB using SQLAlchemy engine.
- Routs return JSON response.

#### plot.js
- JavaScript file that performs actions on client side.
- D3 library is used to get requests from server.
- Chart.JS and CanvavJS library used for visualizations.

#### index.html
- main Dashboard page.
- Bootstrap used to build the page.

#### QuickDBD-export.sql
- DB schema for SQLite Yelp DB

#### Resources
- Extracted via Athena SQL query CSV file monthly_popularity.csv
- SQL query:
  with
  months as
      ( SELECT review_id as id, date_trunc('month', date_parse(date, '%Y-%m-%d %H:%i:%s')) as month
        FROM review_coffee
        where text like '%coffee%' and stars > 4.0)
    select months.month, count(months.id) as count from months
    group by months.month
    order by months.month;

#### DataBase
- yelp.db 
- https://s3.us-west-1.amazonaws.com/project3.coffee.group4/Project3_coffee_group4/yelp.db

Please download the DB from S3 to get project working and put it under the main directory Project3_Coffee_Gr4.

----------------------------------------------------------------------------------------------------
