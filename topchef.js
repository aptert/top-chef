var fourchette = require("./scrap_fourchette_promise");
var fs = require("fs");

var file = fs.readFileSync("./restaurants.json");
var json = JSON.parse(file);

var restaurants = []
json.forEach(element => {
    restaurants.push(element.nom)
});

function mapForPromo(ids){
    
}

const ids = restaurants.map(restaurants => fourchette.getId(restaurants))
const promo = ids.map(ids => fourchette.getPromo(ids))
// Promise.all(ids)
//     .then(Promise.all(promo)
//         .then(response => console.log("ids" + ids + "response" + response))
//         .catch(err => console.log("err" + err)))
//     .catch(err => console.log("error" + err))


Promise.all(ids)
    .then(function(response){
        var treatedResponse = response.toString().split(",");
        var onlyIds = []
        treatedResponse.forEach(function(element){
            if(element != "restaurant not found"){
                onlyIds.push(element);
            }
        });

        console.log("nombre d'ids" + onlyIds.length)
        fs.writeFile('testIds.txt', onlyIds, function (err) {
            if (err) throw err;
            console.log('Saved into testIds.txt!')
        });
    })
    .catch(err => console.log(err))
