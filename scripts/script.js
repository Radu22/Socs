var dataFromJSON = '';

// function loadDoc() {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//       if (this.readyState == 4 && this.status == 200) {
//         // document.getElementById("demo").innerHTML =
//         // this.responseText;
//       }
//     };
//     xhttp.open("GET", "/scripts/json_io.py", true);
//     xhttp.send();
//   }
//   loadDoc();

function getMeta(url) {
    var img = new Image();
    img.onload = function () {
        console.log(this.width + ' ' + this.height);
    };
    img.src = url;
}

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                dataFromJSON = JSON.parse(allText);
            }
        }
    }
    rawFile.send(dataFromJSON);
}

readTextFile("/scripts/media_urls.json");
console.log(dataFromJSON)


// getMeta('https://pbs.twimg.com/media/Dxzo9K3UwAAh08K.jpg');