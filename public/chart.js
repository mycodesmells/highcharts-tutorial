$(function () {
    $("#chartContainer").highcharts({
        title: {
            text: 'NBA Scorers throughout career'
        },
        series: []
    });

    var chart = $("#chartContainer").highcharts();

    fetchData(function(allSeries){
        allSeries.forEach(function(serie, index){
            setTimeout(chart.addSeries.bind(chart, serie), 2000*index);
        })
    });
});



function fetchData(callback) {
    callback(DATA_SERIES);
}