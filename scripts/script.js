
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
            }
        }
    }
    rawFile.send(dataFromJSON);
}

readTextFile("/scripts/media_urls.json");



for(let i = 0; i < dataFromJSON.length; ++i){
        var img = new Image();
        img.src = dataFromJSON[i];
        var test = img.naturalWidth * img.naturalHeight;
        pictureStats.push(test);
}
console.log(pictureStats);


