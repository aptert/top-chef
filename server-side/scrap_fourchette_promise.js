
var fs = require("fs");
var request = require("request");
var cheerio = require("cheerio");
var accent = require("remove-accents");

function getId(name) {
    normalizedName = name.normalize('NFD').replace(/[\u0300-\u036f]/g, ""); //On enlève les accents sinon bad request erreur 400

    return new Promise((resolve, reject) => {
        request("https://m.lafourchette.com/api/restaurant-prediction?name=" + normalizedName, (err, resp, html) => {
            if (err) {
                return reject(err);
            }
            else {
                if (html == "<html><body><h1>400 Bad request</h1>\nYour browser sent an invalid request.\n</body></html>\n") {
                    return resolve("400 bad request")
                }
                else {
                    const json = JSON.parse(html);
                    if (json[0] == null) {
                        return resolve("restaurant not found");
                    }
                    else {
                        return resolve(json[0].id)
                    }
                }
            }
        });
    });

}

function getPromo(id) {
    return new Promise((resolve, reject) => {
        request("https://m.lafourchette.com/api/restaurant/" + id + "/sale-type", (err, resp, html) => {
            if (err) {
                return reject(err);
            }
            else if (id != "restaurant not found") {
                const json = JSON.parse(html);
                var promo = []

                json.forEach((element, index) => {
                    if(element.is_special_offer){
                        promo.push(element)
                    }
                });
                return resolve(promo)
            }
            else {
                return resolve("no restaurant")
            }
        });
    });

}

module.exports.getId = getId;
module.exports.getPromo = getPromo;

// getId("Le Bénaton")
// .then(result => console.log(result))
// .catch(err => console.log(err))

