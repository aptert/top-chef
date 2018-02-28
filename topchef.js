var fourchette = require("./scrap_fourchette_promise");
var fs = require("fs");

var file = fs.readFileSync("./restaurants.json");
var restau = JSON.parse(file);




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
                var promo = []
                
                // fs.writeFile('promo.json', JSON.stringify(promo), function (err) {
                //                     if (err) throw err;
                //                     console.log('Saved into promo.json!');
                //                 })

                console.log(response)
            })
            .catch(err => console.error("ERROR --> " + err))
        
    })
    .catch(err => console.log(err))

