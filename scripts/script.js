var dataFromJSON = '';


var pictureStats = [];

// function loadDoc() {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             // document.getElementById("demo").innerHTML =
//             // this.responseText;
//         }
//     };
//     xhttp.open("GET", "/scripts/json_io.py", true);
//     xhttp.send();
// }
// loadDoc();

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

// function getMeta(url, pictureStats) {
//     var img = new Image();
//     img.onload = function () {
//         pictureStats.push(this.width * this.height);
//         console.log(pictureStats);
//     };
//     img.src = url;
// }



for(let i = 0; i < dataFromJSON.length; ++i){
    // console.log(getMeta(dataFromJSON[i]), " get meta from data from json");
        var img = new Image();
        img.src = dataFromJSON[i];
        pictureStats.push(img.naturalWidth * img.naturalHeight);
    // console.log(pictureStats);
}






chart = {
    const arcs = pie(data);
  
    const svg = d3.select(DOM.svg(width, height))
        .attr("text-anchor", "middle")
        .style("font", "12px sans-serif");
  
    const g = svg.append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);
    
    g.selectAll("path")
      .data(arcs)
      .enter().append("path")
        .attr("fill", d => color(d.data.name))
        .attr("d", arc)
      .append("title")
        .text(d => `${d.data.name}: ${d.data.value.toLocaleString()}`);
  
    const text = g.selectAll("text")
      .data(arcs)
      .enter().append("text")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("dy", "0.35em");
    
    text.append("tspan")
        .attr("x", 0)
        .attr("y", "-0.7em")
        .style("font-weight", "bold")
        .text(d => d.data.name);
    
    text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
        .attr("x", 0)
        .attr("y", "0.7em")
        .attr("fill-opacity", 0.7)
        .text(d => d.data.value.toLocaleString());
  
    return svg.node();
  }