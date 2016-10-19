const request = require('request');
const cheerio = require('cheerio');

module.export = {

    unshortUrl
}

function unshortUrl(shortUrl) {

    return new Promise((resolve, reject) => {

        if (isShort(shortUrl)) {

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

        } else {

            resolve(shortUrl);
        }

    });
}

function isShort(url) {

    return /\/\/(bit.ly|goo.gl)/g.test(url);
}