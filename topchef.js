var fourchette = require("./scrap_fourchette_promise");
var fs = require("fs");

var file = fs.readFileSync("./restaurants.json");
var restau = JSON.parse(file);

function write(name, content){
    fs.writeFile(name, content, function (err) {
        if (err) throw err;
        console.log('******************************************* Saved into ' + name);
    })
}



const ids = restau.map(oneResteau => fourchette.getId(oneResteau.nom))
Promise.all(ids)
    .then(response => {
        //On recupere les ids pour chaque restaurant
        restau.forEach(function(element, index){
            element.id = response[index]
        })
        const promo = restau.map(oneResteau => fourchette.getPromo(oneResteau.id))
        console.log("Deuxième étape")
        Promise.all(promo)
            .then(response => {
                var promo= []
                response.forEach(element => {
                    if(element != "no restaurant"){
                        promo.push(element)
                    }
                })

                restau.forEach((element, index) => {
                    element.promotion = promo[index]
                })
                write("restaurants.json", JSON.stringify(restau))

            })
            .catch(err => console.error("ERROR 2 --> " + err))
        
    })
    .catch(err => console.log("ERROR 1 -->" + err))

