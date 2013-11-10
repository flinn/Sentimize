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
    var valueAxis1 = new AmCharts.ValueAxis();
    valueAxis1.axisAlpha = 0;
    valueAxis1.dashLength = 1;
    chart.addValueAxis(valueAxis1);

    // GRAPH
    var graph1 = new AmCharts.AmGraph();
    graph1.valueAxis = valueAxis1; // we have to indicate which value axis should be used
    graph1.title = "red line";
    graph1.valueField = "value";
    graph1.bullet = "round";
    graph1.bulletBorderColor = "#FFFFFF";
    graph1.bulletBorderThickness = 2;
    graph1.bulletBorderAlpha = 1;
    graph1.lineThickness = 2;
    graph1.lineColor = "#5fb503";
    graph1.negativeLineColor = "#efcc26";
    graph1.hideBulletsCount = 50; // this makes the chart to hide bullets when there are more than 50 series in selection
    chart.addGraph(graph1);

    var graph2 = new AmCharts.AmGraph();
    graph2.valueAxis = valueAxis1; // we have to indicate which value axis should be used
    graph2.title = "red line";
    graph2.valueField = "value";
    graph2.bullet = "round";
    graph2.bulletBorderColor = "#FFFFFF";
    graph2.bulletBorderThickness = 2;
    graph2.bulletBorderAlpha = 1;
    graph2.lineThickness = 2;
    graph2.lineColor = "#5fb503";
    graph2.negativeLineColor = "#efcc26";
    graph2.hideBulletsCount = 50; // this makes the chart to hide bullets when there are more than 50 series in selection
    chart.addGraph(graph2);

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
