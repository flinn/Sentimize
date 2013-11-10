var chart;
var chartCursor;

AmCharts.ready(function () {

    //Color Key:
    var color_blue = '#3498DB';
    var color_red = '#E74C3C';
    var color_green = '#2ECC71';

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

    var valueAxis2 = new AmCharts.ValueAxis();
    valueAxis2.position = "right";
    valueAxis2.axisAlpha = 0;
    valueAxis2.dashLength = 1;
    chart.addValueAxis(valueAxis2);

    // GRAPH
    var graph1 = new AmCharts.AmGraph();
    graph1.valueAxis = valueAxis1; // we have to indicate which value axis should be used
    graph1.title = "Bullish";
    graph1.valueField = "bullish";
    graph1.bullet = "round";
    graph1.bulletBorderColor = "#FFFFFF";
    graph1.bulletBorderThickness = 2;
    graph1.bulletBorderAlpha = 1;
    graph1.lineThickness = 2;
    graph1.lineColor = color_green;
    graph1.negativeLineColor = "#efcc26";
    graph1.hideBulletsCount = 50; // this makes the chart to hide bullets when there are more than 50 series in selection
    chart.addGraph(graph1);

    var graph2 = new AmCharts.AmGraph();
    graph2.valueAxis = valueAxis1; // we have to indicate which value axis should be used
    graph2.title = "Bearish";
    graph2.valueField = "bearish";
    graph2.bullet = "round";
    graph2.bulletBorderColor = "#FFFFFF";
    graph2.bulletBorderThickness = 2;
    graph2.bulletBorderAlpha = 1;
    graph2.lineThickness = 2;
    graph2.lineColor = color_red;
    graph2.negativeLineColor = "#efcc26";
    graph2.hideBulletsCount = 50; // this makes the chart to hide bullets when there are more than 50 series in selection
    chart.addGraph(graph2);

    var graph3 = new AmCharts.AmGraph();
    graph3.valueAxis = valueAxis2; // we have to indicate which value axis should be used
    graph3.title = "Price";
    graph3.valueField = "price";
    graph3.bullet = "round";
    graph3.bulletBorderColor = "#FFFFFF";
    graph3.bulletBorderThickness = 2;
    graph3.bulletBorderAlpha = 1;
    graph3.lineThickness = 2;
    graph3.lineColor = color_blue;
    graph3.negativeLineColor = "#efcc26";
    graph3.hideBulletsCount = 50; // this makes the chart to hide bullets when there are more than 50 series in selection
    chart.addGraph(graph3);

    // CURSOR
    chartCursor = new AmCharts.ChartCursor();
    chartCursor.cursorPosition = "mouse";
    chartCursor.pan = true; // set it to fals if you want the cursor to work in "select" mode
    chart.addChartCursor(chartCursor);

    // SCROLLBAR
    var chartScrollbar = new AmCharts.ChartScrollbar();
    chart.addChartScrollbar(chartScrollbar);

    // LEGEND

    var legend = new AmCharts.AmLegend();
    legend.marginLeft = 110;
    legend.useGraphSettings = true;
    chart.addLegend(legend);

    // draw
    chart.write("chartdiv");
});
