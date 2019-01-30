// import {fs} from 'fs';

function getMeta(url){   
    var img = new Image();
    img.onload = function(){
        console.log( this.width+' '+ this.height );
    };
    img.src = url;
}

function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'https://raw.githubusercontent.com/Radu22/Socs/Project_2.0/Project_2.0/scripts/media_urls.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }
 
 function init() {
    loadJSON(function(response) {
     // Parse JSON string into object
       var actual_JSON = JSON.parse(response);
       console.log(actual_JSON);
    });
   }
    init();
    

// readTextFile('media_urls.json');
// getMeta('https://pbs.twimg.com/media/Dxzo9K3UwAAh08K.jpg');