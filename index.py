from flask import Flask, request, render_template, session, redirect
import numpy as np
import pandas as pd


import requests 
import pandas as pd


import json


app = Flask(__name__)


# data = "https://raw.githubusercontent.com/jafow/first-news-app/master/static/la-riots-deaths.csv"
data = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/03-19-2020.csv"
datacsv = pd.read_csv(data)


# replacing nan with 0
datacsv["Deaths"].fillna("0", inplace = True) 
datacsv["Recovered"].fillna("0", inplace = True)
datacsv["Confirmed"].fillna("0", inplace = True)
datacsv["Province/State"].fillna("-", inplace = True)

# datacsv["state"] = datacsv["Province/State"] + datacsv["Country/Region"]
df = pd.DataFrame(datacsv)

# Remove three columns (longitude and latitude) as index base 
df.drop(df.columns[[6,7]], axis = 1, inplace = True) 


# converting floating value to int 
cols = ['Confirmed', 'Recovered', 'Deaths']
df[cols] = df[cols].applymap(np.int64)



#replacing Mainland china with just China
df['Country/Region'] = df['Country/Region'].replace('Mainland China', 'China')
 # adding new column in the existing dataframe 
df['Still Infected'] = df['Confirmed']-df['Deaths']-df['Recovered']   

Total_Confirmed = df['Confirmed'].sum()
Total_Recovered = df['Recovered'].sum()
Total_Deaths = df['Deaths'].sum()
Total_Still_Infected = df['Still Infected'].sum()
# df_total = pd.DataFrame(data, columns = ['Total_Confirmed', 'Total_Recovered','Total_Deaths','Total_Still_Infected'])

# @app.route('total')
# def total():
# 	render_template('total.html', column_names=df.columns.values, row_data=list(df.values.tolist()),
#                            link_column="Patient ID", zip=zip)

data = {'total Confirmed':  [Total_Confirmed],
        'total recover': [Total_Recovered]
        
        }

# df = pd.DataFrame (datacsv, columns = ['total Confirmed','total recover'])
# @app.route('/total')
# def total():
# 	render_template('total.html', column_names=df.columns.values, row_data=list(df.values.tolist()),
#                            link_column="Patient ID", zip=zip)


df_total = pd.DataFrame({'Confirmed': [Total_Confirmed],
                   'Recovered': [Total_Recovered],
                   'Deaths': [Total_Deaths],
                   'Infected': [Total_Still_Infected]})

total_data = df_total.to_json (r'templates/total.json')

# data = json.loads("total_data")
# data = json.load(total_data)


with open('templates/total.json') as file_object:
        # store file data in object
        data = json.load(file_object)


@app.route('/total', methods=("POST", "GET"))
def total():

    return render_template('total.html',   column_names_total=df_total.columns.values, row_data_total=list(df_total.values.tolist()),
                           link_column="Patient ID", zip=zip, data = data)







@app.route('/', methods=("POST", "GET"))
def readurl():


    return render_template("readurl.html", column_names=df.columns.values, row_data=list(df.values.tolist()),
                           link_column="Patient ID", zip=zip)


@app.route('/nav', methods=("POST", "GET"))
def navbar():


    return render_template("navbar.html")



@app.route('/test', methods=("POST", "GET"))
def readurle():

    return render_template("test.html", column_names=df.columns.values, row_data=list(df.values.tolist()),
                           link_column="Patient ID", zip=zip)

@app.route('/aboutus')
def aboutus():
  
  return render_template("aboutus.html")





# # data = "https://raw.githubusercontent.com/jafow/first-news-app/master/static/la-riots-deaths.csv"
# data_confirm = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv"
# datacsv_confirm = pd.read_csv(data_confirm)

# df2 = pd.DataFrame(datacsv_confirm)

# # df3 = df2.transpose()

@app.route('/confirm', methods=("POST", "GET"))
def confirm():

    return render_template("confirm.html")











# data_deaths = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv"
# datacsv_deaths = pd.read_csv(data_deaths)

# df3 = pd.DataFrame(datacsv_deaths)

# df3 = df2.transpose()

@app.route('/deaths', methods=("POST", "GET"))
def deaths():

    return render_template("death.html")











# data_recover = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Recovered.csv"
# datacsv_recover = pd.read_csv(data_recover)

# df4 = pd.DataFrame(datacsv_recover)

# # df3 = df2.transpose()

@app.route('/recover', methods=("POST", "GET"))
def recover():

    return render_template("recover.html")













data_india = "https://raw.githubusercontent.com/imdevskp/covid-19-india-data/master/complete.csv"
datacsv_india = pd.read_csv(data_india)

df_india= pd.DataFrame(datacsv_india)

# Remove three columns (longitude and latitude) as index base 
# df_india.drop(df_india.columns[['Latitude','Longitude']], axis = 1, inplace = True) 

df_india.drop(df_india.columns[[5, 6]], axis = 1, inplace = True) 

# df_india.drop(['Latitude', 'Longitude'], axis = 1) 
# fig = px.line(df_india, x = 'Date', y = 'Date', title='Apple Share Prices over time (2014)')
# var = fig.show()

@app.route('/india')
def india():
	
	return render_template("india.html", column_names_india=df_india.columns.values, row_data_india=list(df_india.values.tolist()),
                           link_column_india="Patient ID", zip_india=zip)














@app.route('/home/')
def home():
    return render_template('home.html')

@app.route('/about')
def about():
	return render_template('about.html')

@app.route('/testjson')
def testjson():
  return render_template('testjson.html')


if __name__ == '__main__':
    app.run(debug=True)