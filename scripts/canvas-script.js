
var dataFromJSON = '';
var dataFromJSONText = '';
var dataFromJSONDescriere = '';

counter1 = 0;
counter2 = 0;
counter3 = 0;
counter4 = 0;
counter5 = 0;
counter6 = 0;
counter7 = 0;
counter8 = 0;
counter9 = 0;
counter10 = 0;
counter11 = 0;
counter12 = 0;
counter13 = 0;

function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                dataFromJSON = JSON.parse(allText);
            }
        }
    }
    rawFile.send(dataFromJSON);
}
function readTextFile2(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                dataFromJSONText = JSON.parse(allText);
            }
        }
    }
    rawFile.send(dataFromJSONText);
}
function readTextFile3(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                dataFromJSONDescriere = JSON.parse(allText);
            }
        }
    }
    rawFile.send(dataFromJSONDescriere);
}
readTextFile("scripts/lungime_poze.json")
readTextFile2("scripts/lungime_tweet.json")
readTextFile3("scripts/lungimeDescriere_tweet.json")

console.log(dataFromJSONDescriere);
for (i = 0; i < dataFromJSON.length; ++i) {
    if (dataFromJSON[i] < 360001)
        counter1++;
    if (dataFromJSON[i] < 691200 && dataFromJSON[i] > 360000)
        counter2++;
    if (dataFromJSON[i] < 810000 && dataFromJSON[i] > 691200)
        counter3++;
    if (dataFromJSON[i] < 1166401 && dataFromJSON[i] > 810000)
        counter4++;
    if (dataFromJSON[i] > 1166401)
        counter5++;
}

for (i = 0; i < dataFromJSONText.length; ++i) {
    if (dataFromJSONText[i] < 85)
        counter6++;
    if (dataFromJSONText[i] < 95 && dataFromJSONText[i] > 85)
        counter7++;
    if (dataFromJSONText[i] < 110 && dataFromJSONText[i] > 96)
        counter8++;
    if (dataFromJSONText[i] > 110)
        counter9++;
}

for (i = 0; i < dataFromJSONDescriere.length; ++i) {
    if (dataFromJSONDescriere[i] < 40)
        counter10++;
    if (dataFromJSONDescriere[i] < 80 && dataFromJSONDescriere[i] > 41)
        counter11++;
    if (dataFromJSONText[i] < 110 && dataFromJSONDescriere[i] > 81)
        counter12++;
    if (dataFromJSONDescriere[i] > 110)
        counter13++;
}

window.onload = function () {

    var min = 1;
    var max = 200;

    // Chart Data
    var data = [
        { label: '<360001', value: counter1 },
        { label: 'intre 360000 si 691200', value: counter2 },
        { label: 'intre 691200 si 810000', value: counter3 },
        { label: 'intre 810000 si 1166401', value: counter4 },
        { label: '>1166401', value: counter5 },
    ];

    // Chart Specifications
    var targetId = 'chart';
    var canvasWidth = 900;
    var canvasHeight = 450;

    // Create Chart
    var chart = new BarChart(targetId, canvasWidth, canvasHeight, data);

};


var myCanvas = document.getElementById("myCanvas");
myCanvas.width = 330;
myCanvas.height = 330;

var ctx = myCanvas.getContext("2d");

function drawLine(ctx, startX, startY, endX, endY) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}

function drawArc(ctx, centerX, centerY, radius, startAngle, endAngle) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.stroke();
}

function drawPieSlice(ctx, centerX, centerY, radius, startAngle, endAngle, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
}

var myVinyls = {
    "< 85": counter6,
    "85 < x < 95": counter7,
    " 96 < x < 110 ": counter8,
    " > 110": counter9
};

var Piechart = function (options) {
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;

    this.draw = function () {
        var total_value = 0;
        var color_index = 0;
        for (var categ in this.options.data) {
            var val = this.options.data[categ];
            total_value += val;
        }

        var start_angle = 0;
        for (categ in this.options.data) {
            val = this.options.data[categ];
            var slice_angle = 2 * Math.PI * val / total_value;

            drawPieSlice(
                this.ctx,
                this.canvas.width / 2,
                this.canvas.height / 2,
                Math.min(this.canvas.width / 2, this.canvas.height / 2),
                start_angle,
                start_angle + slice_angle,
                this.colors[color_index % this.colors.length]
            );

            start_angle += slice_angle;
            color_index++;
        }

        if (this.options.doughnutHoleSize) {
            drawPieSlice(
                this.ctx,
                this.canvas.width / 2,
                this.canvas.height / 2,
                this.options.doughnutHoleSize * Math.min(this.canvas.width / 2, this.canvas.height / 2),
                0,
                2 * Math.PI,
                "#ff0000"
            );
        }
        start_angle = 0;
        for (categ in this.options.data) {
            val = this.options.data[categ];
            slice_angle = 2 * Math.PI * val / total_value;
            var pieRadius = Math.min(this.canvas.width / 2, this.canvas.height / 2);
            var labelX = this.canvas.width / 2 + (pieRadius / 2) * Math.cos(start_angle + slice_angle / 2);
            var labelY = this.canvas.height / 2 + (pieRadius / 2) * Math.sin(start_angle + slice_angle / 2);

            if (this.options.doughnutHoleSize) {
                var offset = (pieRadius * this.options.doughnutHoleSize) / 2;
                labelX = this.canvas.width / 2 + (offset + pieRadius / 2) * Math.cos(start_angle + slice_angle / 2);
                labelY = this.canvas.height / 2 + (offset + pieRadius / 2) * Math.sin(start_angle + slice_angle / 2);
            }

            var labelText = Math.round(100 * val / total_value);
            this.ctx.fillStyle = "white";
            this.ctx.font = "bold 20px Arial";
            this.ctx.fillText(labelText + "%", labelX, labelY);
            start_angle += slice_angle;
        }

    }
}


var myPiechart = new Piechart(
    {
        canvas: myCanvas,
        data: myVinyls,
        colors: ["#fde23e", "#f16e23", "#57d9ff", "#937e88"]
    }
);
myPiechart.draw();


//  LINE CHART

var canvas = document.getElementById("canvas");
var settings = {
    "backgroundColor": "",
    "chartColor": "",
    "chartLinesColor": "",
    "textColor": ""
};

var data = {
    "xName": "Month",
    "yName": "Users",
    "cols": [" < 40 ", " 41 < x < 80 ", " 81 < x < 110 ", " > 110 "],
    "data": [{ "name": "", "values": [counter10, counter11, counter12, counter13] }]
};

var canvas;
var context;
var margin;
var startX;
var endX;
var endY;
var startY;
var chartWidth;
var chartHeight;
var nodeSideLength;//Node square side length
var colors = [];
var foundNode = false; //Used for the reapinting procedure
var nodes = [];
var chartData;

//Settings variables
var chartColor = "black";
var backgroundColor = "#FFFFFF";
var chartLinesColor = "lightgray";
var textColor = "black";


function chartify(canvas, chartData, settings) {
    this.canvas = canvas;
    context = canvas.getContext("2d");
    margin = 50;
    startX = margin;
    endX = canvas.width - margin - 80;
    endY = canvas.height - margin;
    startY = margin;
    chartWidth = endX - startX;
    chartHeight = endY - startY;
    nodeSideLength = 8;
    this.chartData = chartData;

    if (settings != undefined) {
        if (settings.chartColor != "" && settings.chartColor != undefined) {
            this.chartColor = settings.chartColor;
        }
        if (settings.backgroundColor != "" && settings.backgroundColor != undefined) {
            this.backgroundColor = settings.backgroundColor;
        }
        if (settings.chartLinesColor != "" && settings.chartLinesColor != undefined) {
            this.chartLinesColor = settings.chartLinesColor;
        }
        if (settings.textColor != "" && settings.textColor != undefined) {
            this.textColor = settings.textColor;
        }
    }

    canvas.style.backgroundColor = backgroundColor;

    //Generate colors for all the data sets
    for (var i = 0; i < chartData.data.length; i++) {
        colors[i] = generateHexColor();
    }

    drawChart(chartData);

    canvas.onmousemove = function (e) {
        checkCollision(e.clientX, e.clientY);
    }
}

function drawChart() {
    drawAxis(chartData);
    drawChartLines(chartData);
    drawInfo(chartData);
}

//Draws the line info and color
function drawInfo(chartData) {
    var infoStartX = endX + 20;
    var infoStartY = startY;
    var infoRectWidth = 100;
    var infoRectHeight = chartData.data.length * 40;

    context.fillStyle = backgroundColor;
    context.fillRect(infoStartX, infoStartY, infoRectWidth, infoRectHeight);

    for (var i = 0; i < chartData.data.length; i++) {
        var textWidth = context.measureText(chartData.data[i].name).width;
        context.fillStyle = textColor;
        context.font = "Bold 8pt Arial";
        context.fillText(chartData.data[i].name, infoStartX + (infoRectWidth / 2) - (textWidth / 2), infoStartY + 20 + (i * 25));
        context.strokeStyle = colors[i];
        context.lineWidth = 2.5;
        drawLine(infoStartX + infoRectWidth * 0.1, infoStartY + 25 + (i * 25), infoStartX + infoRectWidth * 0.9, infoStartY + 25 + (i * 25));
    }

}

function drawAxis(chartData) {
    var cols = chartData.cols;
    var YAxisMax = getYAxisMax(chartData.data);

    context.strokeStyle = chartColor;
    context.fillStyle = chartColor;

    //Draws chart lines
    drawLine(startX, startY, startX, endY);
    drawLine(startX, endY, endX, endY);

    //Draws y-axis arrow and x-axis arrow
    drawTriangle(startX, startY - 7, startX + 5, startY, startX - 5, startY);
    drawTriangle(endX + 7, endY, endX, endY + 5, endX, endY - 5);

    context.fillStyle = textColor;
    context.font = "8pt Arial";
    context.strokeStyle = chartLinesColor; //For background lines color
    context.lineWidth = 0.5; //For background lines width

    //Draws column names
    for (var i = 0; i < cols.length; i++) {
        context.fillText(cols[i], i * (chartWidth / cols.length) + margin + 15, chartHeight + margin + 15);
    }

    //Draws Y-axis values and background lines
    for (var i = 0; i < 11; i++) {
        var value = (YAxisMax / 10) * i;
        context.fillText(value, startX - context.measureText(value).width - 5,
            ((11 - i) * (chartHeight / 11) + (margin - 11)));
        drawLine(startX + 1, ((11 - i) * (chartHeight / 11) + (margin - 11)), endX, ((11 - i) * (chartHeight / 11) + (margin - 11)));
    }
}

function drawChartLines(chartData) {
    var yMax = getYAxisMax(chartData.data);
    var yDiff = chartHeight / (yMax + (yMax / 10));
    var xDiff = chartWidth / chartData.cols.length;
    var nodeX;
    var nodeY;

    context.lineWidth = 0.7;

    for (var i = 0; i < chartData.data.length; i++) {
        context.strokeStyle = colors[i];
        var values = chartData.data[i].values;

        for (var j = 0; j < values.length - 1; j++) {
            //Draws the line between two nodes
            drawLine(margin + 25 + xDiff * j, endY - 11 - values[j] * yDiff,
                margin + 25 + xDiff * (j + 1), endY - 11 - values[j + 1] * yDiff);

            context.fillStyle = colors[i];

            nodeX = margin - (nodeSideLength / 2) + 25 + xDiff * j;
            nodeY = endY - (nodeSideLength / 2) - 11 - values[j] * yDiff;

            //Draws the node for the current line
            context.fillRect(nodeX, nodeY, nodeSideLength, nodeSideLength);

            //Save the node info for generating detail popup on hover
            nodes[nodes.length] = {
                "name": chartData.data[i].name,
                "col": chartData.cols[j],
                "value": values[j],
                "xpos": nodeX,
                "ypos": nodeY,
                "color": colors[i]
            };
        }
        nodeX = margin - (nodeSideLength / 2) + 25 + xDiff * (values.length - 1);
        nodeY = endY - (nodeSideLength / 2) - 11 - values[values.length - 1] * yDiff;

        //Draws the last node of the line
        context.fillRect(nodeX, nodeY, nodeSideLength, nodeSideLength);

        //Save the node info for generating detail popup on hover
        nodes[nodes.length] = {
            "name": chartData.data[i].name,
            "col": chartData.cols[chartData.cols.length - 1],
            "value": values[values.length - 1],
            "xpos": nodeX,
            "ypos": nodeY,
            "color": colors[i]
        };
    }
}

//Draws a line to canvas
function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.closePath();
    context.stroke();
}

//Draws a traingle to canvas
function drawTriangle(x1, y1, x2, y2, x3, y3) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(x3, y3);
    context.lineTo(x1, y1);
    context.closePath();
    context.fill();
}

//Returns the highest value found in data arrays
function getYAxisMax(arrays) {
    var largestNumber = 0;
    for (var i = 0; i < arrays.length; i++) {
        var temp = Math.max.apply(Math, arrays[i].values);
        if (temp > largestNumber) {
            largestNumber = temp;
        }
    }

    if (largestNumber <= 1) {
        return 1;
    }
    if (largestNumber <= 100) {
        return Math.ceil(largestNumber / 10) * 10;
    }

    return Math.ceil(largestNumber / 100) * 100;

}

//Returns a hex color
function generateHexColor() {
    var chars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += chars[Math.round(Math.random() * (chars.length - 1))];
    }
    return color;
}

//Checks if mouse pointer is over a node
function checkCollision(x, y) {
    var canvas_element = document.getElementById("canvas");
    var offset = {
        x: canvas_element.offsetLeft,
        y: canvas_element.offsetTop
    };

    for (var i = 0; i < nodes.length; i++) {
        var nodeX = nodes[i].xpos;
        var nodeY = nodes[i].ypos;

        if (x > nodeX + offset.x && x < nodeX + nodeSideLength + offset.x && y > nodeY + offset.y && y < nodeY + nodeSideLength + offset.y) {
            foundNode = true;
            drawDetails(nodes[i]);
            return;
        }
        else {
            if (foundNode == true) {
                repaint();
                foundNode = false;
            }
        }
    }
}

//Draws the detail information when mouse is over a line node
function drawDetails(node) {
    var rectWidth = 170;
    var rectHeight = 60;

    context.beginPath();
    context.fillStyle = backgroundColor;
    context.strokeStyle = node.color;
    context.lineWidth = 2.0;
    context.font = "Bold 10pt Arial";
    context.fillRect(node.xpos, node.ypos, rectWidth, rectHeight);
    context.strokeRect(node.xpos, node.ypos, rectWidth, rectHeight);
    context.fillStyle = textColor;
    context.fillText(node.name, node.xpos + rectWidth / 2 - context.measureText(node.name).width / 2, node.ypos + 18);
    context.font = "10pt Arial";
    context.fillText(chartData.xName + ": " + node.col, node.xpos + 5, node.ypos + 37);
    context.fillText(chartData.yName + ": " + node.value, node.xpos + 5, node.ypos + 53);
}

//Reapaints the whole surface
function repaint() {
    context.beginPath();
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawChart();
}

chartify(canvas, data, settings);