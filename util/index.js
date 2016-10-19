const request = require('request');
const cheerio = require('cheerio');

module.export = {

    getOriginalUrlFromShort
}

function getOriginalUrlFromShort(shortUrl) {

    return new Promise((resolve, reject) => {

        request
            .post({
                url: "http://urlex.org",
                form: { s: shortUrl }
            }, (err, response) => {

                if (err) throw new Error("Error");

                var $ = cheerio.load(response.body);

                var url = $('table td a').first().attr('href');

                resolve(url);
            });

    });
}