var dataFromJSONLineChart = '';
var counterLineChart = [0, 0, 0, 0];

function readTextFilePieChart(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                dataFromJSONLineChart = JSON.parse(allText);
            }
        }
    }
    rawFile.send(dataFromJSONLineChart);
}
readTextFilePieChart("scripts/lungime_tweet.json");


for (i = 0; i < dataFromJSONLineChart.length; ++i) {
    if (dataFromJSONLineChart[i] < 85)
        counterLineChart[0]++;
    if (dataFromJSONLineChart[i] < 95 && dataFromJSONLineChart[i] > 85)
        counterLineChart[1]++;
    if (dataFromJSONLineChart[i] < 110 && dataFromJSONLineChart[i] > 96)
        counterLineChart[2]++;
    if (dataFromJSONLineChart[i] > 110)
        counterLineChart[3]++;
}

var myCanvas = document.getElementById("myCanvas");
myCanvas.width = 500;
myCanvas.height = 500;

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
    "less than 85 letters": counterLineChart[0],
    "between 85 and 95 letters": counterLineChart[1],
    "between 96 and 110 letters": counterLineChart[2],
    "more than 110 letters": counterLineChart[3]
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
            this.ctx.font = "bold 12px Arial";
            //this.ctx.fillText(labelText);
            this.ctx.fillText(categ, labelX-90, labelY);
            this.ctx.font = "bold 22px Arial";
            this.ctx.fillText(labelText+"%", labelX-70, labelY-20);
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