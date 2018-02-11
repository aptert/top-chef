
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var json = [];
var i = 1;

function restaurants(i){

    if (i > 36){
        fs.writeFile('restaurants.json', json, function (err) {
            if (err) throw err;
            console.log('Saved into restaurants.json!');
        });
        return null;
    }
    url = "https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-"+i;
    console.log(url);
    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            $('[attr-gtm-type = poi]').each(function(i, elem){
                var restau = {nom: "", prix: "", offre: "", genre: ""};
                var data = $(elem);
                restau.nom = data.attr("attr-gtm-title");
                restau.prix = data.find('.poi_card-display-price').text();
                restau.offre = data.find('.mtpb2c-offers').text();
                restau.genre = data.find('.poi_card-display-cuisines').text();
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
restaurants(i);



    

// for(var i = 1; i<36; i++){ //TODO find a way to loop on the result
//     urls.push("https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-"+i);
// }

// for(var i = 0; i<urls.length; i++){
//     request(urls[i], function(error, response, html){
//         console.log(urls[i])

//         if(!error){
//             var $ = cheerio.load(html);
//             var object = { nom: "", offre: "", genre: "", prix: ""}

//             //NAMES
//             $('[attr-gtm-type = poi]').each(function(i, elem){
//                 var data = $(this);
//                 object.nom = data.attr("attr-gtm-title");
//             });

//             //PRIX
//             $('.poi_card-display-price').each(function(i, elem){
//                 var data = $(this);
//                 prix[i] = data.text();
//             });

//             //OFFRE
//             $('.mtpb2c-offers').each(function(i, elem){
//                 var data = $(this);
//                 offre[i] = data.text();
//             });
//             //GENRE
//             $('.poi_card-display-cuisines').each(function(i, elem){
//                 var data = $(this);
//                 genre[i] = data.text();
//             });


//             json.push(object);
//             // console.log("page " + i + "\n");
//             console.log(json)

//         }
//         else{
//             console.log("error")
//         }


//     });

// }

    //console.log(urls);


