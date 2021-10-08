from flask import Flask, json, render_template, jsonify, request, redirect, Response
import numpy as np

import awswrangler as wr
import pandas as pd
from datetime import datetime

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func


# --------------------
# Database Setup
# --------------------
engine = create_engine("sqlite:///yelp.db")

app = Flask(__name__)
# --------------------
# Flask Routes
# --------------------
# Main route
@app.route("/")
def index():
    title = "Coffee Shop Business Analysis Accross US"
    return render_template('index.html', title = title)

# --------------------
# Map - location of coffee shops by Jasper
@app.route("/Jindex")
def Jindex():
    return render_template('Jindex.html')

# --------------------
# Popularity of Coffee Business by Priya
@app.route("/Ratings&Reviews")
def RVindex():
    return render_template('Ratings&Reviews.html')

# --------------------
# Top Cities with Coffee shops by Priya
@app.route("/Top20Cities")
def Tindex():
    return render_template('Top20Cities.html')    

# --------------------
# Star Rating by States by Michael
@app.route("/Mindex")
def Mindex():
    return render_template('Mindex.html')

# --------------------
# Progress of Coffee Popularity over Months based on Review nubmer by Galyna 
@app.route('/getMonthlyProgress')
def getNumberOfReviews():
    # csv file resources/monthly_popularity.csv was obtained from athena DB using the following query:
    # with
    # months as
    #   ( SELECT review_id as id, date_trunc('month', date_parse(date, '%Y-%m-%d %H:%i:%s')) as month
    #     FROM review_coffee
    #     where text like '%coffee%' and stars > 4.0)
    # select months.month, count(months.id) as count from months
    # group by months.month
    # order by months.month;
    df = pd.read_csv("resources/monthly_popularity.csv")
    df['month'] = pd.to_datetime(df.month)
    df['month'] = df['month'].astype(str)

    return Response(df.to_json(orient="records"), mimetype='application/json')

# --------------------
# Coffee Shops analysis by Category by Galyna
@app.route('/getCategories')
def getCategories():

    # Get Categories we are interested in from SQLite DB executing the following query
    data = engine.execute("select category, state, count(distinct business_id) as count "+
                            "from business "+
                            "where category in ('Coffee & Tea', 'Coffee & Tea Supplies', 'Bakeries', 'Cafes',"+
                            "'Chocolatiers & Shops', 'Coffee Roasteries', 'Donuts', 'Macarons', 'Patisserie/Cake Shop') "+
                            "and state!='BC' " +
                            "group by state, category "+
                            "order by category, state")

    # List to hold dictionaries with values of state, category and count by category in state
    # [{category: cat1, state: state1, count: count1}, {category: cat2, state: state2, count: count2}...]
    all_categories = []
    for record in data:
        categ_dict = {}
        categ_dict["category"] = record[0]
        categ_dict["state"] = record[1]
        categ_dict["count"] = record[2]
        all_categories.append(categ_dict)

    return jsonify(all_categories)

# --------------------
# Coffee Shops analysis by Attributes by Galyna
@app.route('/getAttributes')
def getAttributes():

    attr_of_interest = ['outdoorseating', 'restaurantsgoodforgroups', 'goodforkids',
                        'bikeparking', 'drivethru', 'dogsallowed']

    # Get total count of all coffee shops by state
    total_count_by_states = engine.execute("SELECT state, count(distinct business_id) as total_count FROM business "+
                                            "where state!='BC' group by state order by state")
    array_state_count = []
    for row in total_count_by_states:
        dict_total = {}
        dict_total["state"] = row.state
        dict_total["count"] = row.total_count   
        array_state_count.append(dict_total) 

    # Define list to hold dictionaries with key = attribute and list of dictionaries for states and count
    # (number of shops with key attribute in state) and a list of total count by states
    # [{attribute: [{state: count}, {state1: count1}...]}, [{state: total_count}]]
    list_for_all_attr = []

    # Get total count of coffee shops with specific atributes by state 
    for attr in attr_of_interest:
        count_for_attr_by_state = engine.execute("SELECT state, count(distinct business_id) as attr_count FROM business "
                            +"where attr_key = '"+attr+"' and attr_value = 'True' and state!='BC'"
                            +"group by state order by attr_count;")

        list_for_attr = []
        for count in count_for_attr_by_state:
            dict = {}
            dict["state"] = count[0]
            dict["count"] = count[1]
            list_for_attr.append(dict)

        attr_dict = {}
        attr_dict[attr] = list_for_attr
        list_for_all_attr.append(attr_dict)

    list_for_all_attr.append(array_state_count)
    return jsonify(list_for_all_attr)
  
if __name__ == "__main__":
    app.run(debug=True)