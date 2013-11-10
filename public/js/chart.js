var chart;
var chartCursor;

AmCharts.ready(function () {

    chart = new AmCharts.AmSerialChart();
    chart.pathToImages = "http://www.amcharts.com/lib/3/images/";
    chart.dataProvider = chartData;

    chart.categoryField = "date";
    chart.balloon.bulletSize = 5;


    // AXES
    // category
    var categoryAxis = chart.categoryAxis;
    categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
    categoryAxis.dashLength = 1;
    categoryAxis.minorGridEnabled = true;
    categoryAxis.position = "top";
    categoryAxis.axisColor = "#DADADA";

    // value
    var valueAxis = new AmCharts.ValueAxis();
    valueAxis.axisAlpha = 0;
    valueAxis.dashLength = 1;
    chart.addValueAxis(valueAxis);

    // GRAPH
    var graph = new AmCharts.AmGraph();
    graph.title = "red line";
    graph.valueField = "value";
    graph.bullet = "round";
    graph.bulletBorderColor = "#FFFFFF";
    graph.bulletBorderThickness = 2;
    graph.bulletBorderAlpha = 1;
    graph.lineThickness = 2;
    graph.lineColor = "#5fb503";
    graph.negativeLineColor = "#efcc26";
    graph.hideBulletsCount = 50; // this makes the chart to hide bullets when there are more than 50 series in selection
    chart.addGraph(graph);

    // CURSOR
    chartCursor = new AmCharts.ChartCursor();
    chartCursor.cursorPosition = "mouse";
    chartCursor.pan = true; // set it to fals if you want the cursor to work in "select" mode
    chart.addChartCursor(chartCursor);

    // SCROLLBAR
    var chartScrollbar = new AmCharts.ChartScrollbar();
    chart.addChartScrollbar(chartScrollbar);

    // draw
    chart.write("chartdiv");
});
