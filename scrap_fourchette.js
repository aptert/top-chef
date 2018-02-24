
var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');

function getPromotions(href, callback){
    request("www.lafourchette.com"+href, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            var promo = $('.saleType--event > .saleType.title').each(function(index, element){
                var data = $(element);
                callback(data.text);
            });
        }
        else{

        }
    });
}

function getPage(name, callback){
    var href;
    const configuration_search = {
        'url': "https://www.lafourchette.com/search-refine/"+name,
        'headers': {
            "cookie": "datadome=AHrlqAAAAAMAamrCke7KgmkALtotww=="
        }
    }
    request(configuration_search, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            href = $('.resultItem-name').children().attr('href');
            console.log(name)
            callback (href);
        }
        else{
            console.log("error")
        }
    });
}



//getPage("octopus", console.log);
module.exports.promo = getPromotions;
module.exports.page = getPage;




