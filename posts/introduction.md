# Highcharts introduction

We are living in the time of big data. Our computer systems are constantly generating, collecting and analyzing huge loads of information. More often than not we find ourself in a need to present those datasets to the user in some human-friendly way. One of the better ways to do this is via a some kind of chart. Today we take a look nn one of the most popular charting library in Java Script - Highcharts.

Highcharts the library comes in three flavours: classic, Highstock and Highmap. In this example we focus on the most basic version, as we just want to create some simple line graphs.

### Building a chart

In order to display a chart on our page we need to have a few things set up. First of all, we need two libraries included in our HTML: Highcharts (obviously!) and jQuery which is a dependency of the former. We are using Bower as a dependency management tool for this (more on Bower in one of [previous posts](http://mycodesmells.com/post/introduction-to-bower/)). The last thing we need at this point is a div container where the chart will be rendered:

    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Highcharts Example</title>
        <script src="vendor/jquery/dist/jquery.min.js"></script>
        <script src="vendor/highcharts/highcharts.js"></script>
    
        <script src="data.js"></script>
    </head>
    <body>
    <div id="chartContainer"></div>
    </body>
    </html>

Probably the best thing about Highcharts is that you can have it up and running if no time, as long as you need just a basic chart with no fireworks. The default configuration is well-thought, so that you just need to make some tweaks to make it appropriate for more complex use. The most basic configuration consists of your data series and a title (which can be omitted in fact):

    $("#chartContainer").highcharts({
        title: {
            text: 'NBA Scorers throughout career'
        },
        series: DATA_SERIES
    });
    
Our data represents five of the better NBA players and their points per game stat over their career. Having this data represented as a list of values makes it difficult to compare, so seeing it on a chart should make our analysis easier.

**data.js**

    var DATA_SERIES = [
        {
            name: 'Michael Jordan',
            data: [28.2, 22.7, 37.1, 35.0, 32.5, 33.6, 31.5, 30.1, 32.6, 26.9, 30.4, 29.6, 28.7, 22.9, 20.0]
        }, {
            name: 'Kobe Bryant',
            data: [7.6, 15.4, 19.9, 22.5, 28.5, 25.2, 30.0, 24.0, 27.6, 35.4, 31.6, 28.3, 26.8, 27.0, 25.3, 27.9, 27.3, 13.8, 22.3, 16.9]
        }, {
            name: 'LeBron James',
            data: [20.9, 27.2, 31.4, 27.3, 30.0, 28.4, 29.7, 26.7, 27.1, 26.8, 27.1, 25.3, 27.0]
        }, {
            name: 'Kevin Durant',
            data: [20.3, 25.3, 30.1, 27.7, 28.0, 28.1, 32.0, 25.4, 28.1]
        }, {
            name: 'James Harden',
            data: [9.9, 12.2, 16.8, 25.9, 25.4, 27.4, 28.4]
        }
    ];
    
In fact, if we run this code, we can already see pretty satisfying results:

<img src="https://raw.githubusercontent.com/mycodesmells/highcharts-tutorial/master/posts/images/basic-chart.png" />

### Loading data dynamically

Having all data ready before chart rendering is cool, but we rarely have this comfort. Most probably you are going to have the data fetched from your application backend and then displayed on the chart. Let's mock some AJAX data fetch in order to manage creating your chart. We can draw our chart on fetch's callback, but in this example we will attempt to draw the chart and then update it with newly downloaded data.

First, let's prepare the function that will mock AJAX call. We will pass our `DATA_SERIES` in a callback, which will be called with two second delay:

    function fetchData(callback) {
        setTimeout(callback.bind(this, DATA_SERIES), 2000);
    }
    
Then, let's change the chart initial configuration, so that there is no data at the beginning:

    ...
    series: []
    ...
  
Lastly, we will use `Highcharts.addSeries()` method which allows us to add data onto an existing chart:

    fetchData(function(allSeries){
        allSeries.forEach(function(serie){
            chart.addSeries(serie);
        })
    });
    
If we run our code now, we can see an empty screen with chart title, and then after two seconds all data appears on it. It's empty because before loading any data, Highcharts does not know axis ranges, so it cannot guess where to put grid lines and values. We can improve it a bit and add each data series every two seconds:

    fetchData(function(allSeries){
        allSeries.forEach(function(serie, index){
            setTimeout(chart.addSeries.bind(chart, serie), 2000*index);
        })
    });
 
This time we can see our chart evolving from an empty screen into a useful comparison of players' scores.

Source code for this example is available [on GitHub](https://github.com/mycodesmells/highcharts-tutorial)
