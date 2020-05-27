function Calculate(Parameter, Indicator) {
//console.log(Indicator);
const xhttp = new XMLHttpRequest();
const MainEndpoint = "http://localhost:3000/"
xhttp.open("GET", "http://localhost:3000/"+Parameter, false);
xhttp.send();

const response = JSON.parse(xhttp.responseText);
var obj = JSON.stringify(response, null, 2)
var _id = [];
var count = [];
var docs = JSON.parse(obj)
var keys = Object.keys(docs);
for(var i=0; i<keys.length; i++){
  var key = keys[i];
  _id[i] = docs[key]._id
  count[i] = docs[key].count
}
console.log(Parameter+":");
console.log(_id);
console.log("Number of "+Parameter+" repeated:");
console.log(count);

let trace = {
  x: _id,
  y: count,
  marker: {color: 'rgb(55, 83, 109)'},
  type:'bar'
}
let layout = {
  title: ""+Indicator+"." ,
  yaxis: {title: "Numbers of entries for "+Parameter},
  xaxis: {title: Parameter} }
  Plotly.newPlot(document.getElementById('graph'), [trace], layout);
}
