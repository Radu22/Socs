
var dataFromJSON = '';


var pictureStats = [];

function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                dataFromJSON = JSON.parse(allText);
                // de adaugat variabila pentru date din alt json
            }
        }
    }
    rawFile.send(dataFromJSON);
}

readTextFile("/scripts/media_urls.json");



for(let i = 0; i < dataFromJSON.length; ++i){
        var img = new Image();
        img.src = dataFromJSON[i];
        var test = img.width * img.height;
        pictureStats.push(test);
}
console.log(pictureStats);


window.onload = function() {

  var min = 1;
  var max = 200;

  // Chart Data
  var data = [
    {label: 'Jan', value: pictureStats[0]},
    {label: 'Feb', value: pictureStats[1]},
    {label: 'March', value: pictureStats[2]},
    {label: 'April', value: pictureStats[3]},
    {label: 'May', value: pictureStats[4]}
  ];

  // Chart Specifications
  var targetId = 'chart';
  var canvasWidth = 600;
  var canvasHeight = 450;

  // Create Chart
  var chart = new BarChart(targetId, canvasWidth, canvasHeight, data);

};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
