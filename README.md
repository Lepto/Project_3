# Data Viz Project 3


## Team Members: The Baristas
Galyna Malynska, Priya Singh, Banke Ogunjumo, Michael Liu, Jasper Chou

## Title of our project:  Who Loves Coffee?  
An synopsis of the retail coffee industry's popularity in the United States.

 Our project will delve into a high level review of the retail coffee business.  Our goal is to examine the popularity of coffee as a beverage and people's overall reaction towards the bean.

 This very high level overview of the retail coffee business will look at the following aspects: populairty, acceptance, and viability of the retail coffee market.  All analysis based on datasets obtained from Yelp.com, to see the upbiquitousness of coffee in our culture.

 Yelp provided datasets for only seven metropolitan cities: Portland, OR; Boulder, CO; Austin, TX; Orlando, FL, Columbus, OH; Atlanta, GA; and Boston, MA.  All of our datasets were cleaned using Python, some were converted into the following formats: Excel, CSV, JSON, and geoJSON.

 All of our codes were written in all or some of the following languages: **Python**, **Javascript**, **HTML**, and/or **Javascript**.  In our project we incorporated **Flask**, Javascript libraries: **APEXCHARTS**, **Leaflet**, **CanvasJS**, and **ChartsJS**.
 
 ## Challenges: What the Frapp??!!
 Our group experienced challenges in cleaning the dataset from Yelp.com.  The json dataset was large and couldn't not be efficiently stored, processed and reduced locally.  The decision was made to store our data on **AWS S3**, where it was cleaned using **Athena**,  and reduced to a size that was easier to manage and can be download locally.  Along the process, we discovered the following problems:
  1) The initial data size was over serveral gigabytes large.  Not feasible to be worked on locally
  2) Many of the data points were cryptic in nature (some were in hexidecimal) that could not be interpreted (e.g. USER ID and BUSINESS ID)
  3) Too many duplicate data points
  4) Incomplete dataset - data only covered seven state and one major metropolitan area of that state.

After an injection of caffine into our system, each team member was able to reduce their respective dataset and create their visualization portion.

## Conclusion
 Overall, the dataset showed the popularity of our coffee shops in each of the respective states we observed.  Reviews submitted on Yelp.com went as high as 7000 for one coffee shop and to as low as zero (0) reviews.  Some of the reviews from the Yelp.com dataset showed how engaging and serious people think about coffee.  In each of the metropolitan areas surveyed, there were at least 300 coffee shops to serve a population of less than 1,000,000 people.  The retail coffee business is doing well (except during the COVID pandemic of 2020), and its popularity is steadily growing over the years, making it a viable enterprise for the future.


