var fourchette = require("./scrap_fourchette_promise");
var fs = require("fs");

var file = fs.readFileSync("./restaurants.json");
var json = JSON.parse(file);

var restaurants = []
json.forEach(element => {
    restaurants.push(element.nom)
});

const ids = restaurants.map(restaurants => fourchette.getId(restaurants))
Promise.all(ids)
    .then(response => console.log(response.toString().split(",")))
    .catch(err => console.log("error" + err))

// console.log(ids)
