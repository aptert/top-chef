
var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var json    = [];
var i       = 1;

function restaurants(i){

    if (i > 36){
        fs.writeFile('restaurants.json', JSON.stringify(json), function (err) {
            if (err) throw err;
            console.log('Saved into restaurants.json!');
        });
        return json;
    }
    url = "https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-"+i;
    console.log(url);
    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            $('[attr-gtm-type = poi]').each(function(i, elem){
                var restau = {nom: "", prix: "", genre: "", promotion: "", evenement:"", id:""};
                var data = $(elem);
                restau.nom = data.attr("attr-gtm-title").trim();
                restau.prix = data.find('.poi_card-display-price').text().trim();
                restau.genre = data.find('.poi_card-display-cuisines').text().trim();
                json.push(restau)
            });
        }
        else{
            console.log("error")
        }

        i++;
        restaurants(i)
    });
}


module.exports.restaurants = restaurants;
module.exports.etoiles = json;



    


