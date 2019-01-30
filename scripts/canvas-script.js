
var dataFromJSON = '';

counter1 = 0;
counter2 = 0;
counter3 = 0;
counter4 = 0;
counter5 = 0;

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
readTextFile("scripts/lungime_poze.json")

for (i = 0; i < dataFromJSON.length; ++i) {
    if (dataFromJSON[i] < 360001)
        counter1++;
    if (dataFromJSON[i] < 691200 && dataFromJSON[i] > 360000)
        counter2++;
    if (dataFromJSON[i] < 810000 && dataFromJSON[i] > 691200)
        counter3++;
    if (dataFromJSON[i] < 1166401 && dataFromJSON [i]> 810000)
        counter4++;
    if (dataFromJSON[i] > 1166401)
        counter5++;
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

