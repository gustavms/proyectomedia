
var express = require('express');
var app  = express();
var server  = require('http').Server(app);
var io      = require('socket.io')(server);
var morgan  = require('morgan');
var bodyParser = require('body-parser');
var request= require('request');
var fs = require('fs');
var cheerio = require('cheerio');
var path = require('path');
var $ = require("jquery");
var data= require('./lista.js');
var Noticia=require('./noticia.js');
const firebase = require('firebase');
var sha1 = require('sha1');
const PORT = 3000;


//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
console.log("My http server listening on port " + PORT + "...");

firebase.initializeApp({
apiKey: "AIzaSyCcCUyiGVZWi_e-e5wRl8YWFV_hK7GNxkc",
authDomain: "proyecto-media.firebaseapp.com",
databaseURL: "https://proyecto-media.firebaseio.com",
storageBucket: "",
messagingSenderId: "650128597882"
});



function publicarpostenpaginafacebook(){
  console.log("entro a publicar");
   //sacar el primer post de cada categoria(First In Firs out) y postearlo en su pagina respectiva usando api graph
  //seria bueno probar envairlo automaticamente, lo malo es el token, no puedo administrar mis paginas? probar si se puede falta
  //sino como obtendria un token cada media hora, como extraer el token de facebook para enviarlo automaticamente
  FB.setAccessToken('EAAOWC0VaRVwBAHVgtASGdgQvttMOsEs9sH3ZAdS2YUKLyIOBRsu31oyaIqZCbN1IsGOH5NrN5sny3wwUVqD63TnqotWac2HOBZBJbtdS5snAKrFes2J7zyVFL8UEQTEXX7apGOgEbo9iELQ7fQHHxZCtGI67MvEvRupCXWZAROgZDZD');
 /*
FB.api('me/photo', 'post', { source: fs.createReadStream('my-vacation.jpg'), caption: 'My vacation' }, function (res) {
  if(!res || res.error) {
    console.log(!res ? 'error occurred' : res.error);
    return;
  }
  console.log('Post Id: ' + res.post_id);
});

FB.api('me/photo', 'post', { source: { value: photoBuffer, options: { contentType: 'image/jpeg' } }, caption: 'My vacation' }, function (res) {
  if(!res || res.error) {
    console.log(!res ? 'error occurred' : res.error);
    return;
  }
  console.log('Post Id: ' + res.post_id);
});
*/
FB.api(
  '/me/feed',
  'POST',
  {"message":"logro publicar hola a todos /n hola que tal <p> sdsdsdsd <br> adsad","link":"https://www.npmjs.com/package/fb","picture":"http://e03-elmundo.uecdn.es/assets/multimedia/imagenes/2015/11/13/14474300157302.jpg","name":"este es un gran titulo","caption":"el loco.pe"},
  function(response) {
    if (response.status == 'connected'){console.log("conectado")}
     console.log(response.status);

     console.log(response.authResponse);
      console.log("se publico");
  });

};


app.get('/', function(req, res,next){
     fs.readFile("index.html", function (err, fileBuffer) {
           if (err) {
               return next(err); // Tell express to handle errors
           }
           res.send(fileBuffer.toString());
           });
   console.log("finaldetodo");
});



app.use('/endpoint', function(req, res, next){
    console.log("midleweare");
  req.body.categoria="politica";
next();
  /*
    if (req.body.categoria=="economia"){var newnoticia= new CanalEconomia(); newnoticia};
    if (req.body.categoria=="politica"){};
    if (req.body.categoria=="actualidad"){};
    if (req.body.categoria=="seguridad"){};
    if (req.body.categoria=="empresarial"){};
    if (req.body.categoria=="gastronomia"){};
    if (req.body.categoria=="gastronomia"){};
    */
})

app.post('/endpoint', function(req, res){


var _id= sha1(JSON.stringify(req.body));
var _new = {
    id: _id,
    date: req.body.creator,
    type:req.body.type,
    username: req.body.username,
    message: req.body.message,
    title: req.body.title,
    imageUrl: req.body.picture,
    url: req.body.link,
    source: req.body.caption,
    content: '',

}

    var categoria = "'"+req.body.categoria+"'";
    var newsRef = firebase.database().ref('news');

    newsRef.child(categoria).child(_new.id).set(_new, snapshot => {
     snapshot;

    });

   newsRef.on('value', snapshot => {
       snapshot

    });

});


app.listen(PORT, function(){

  //  fb = new FB.Facebook({appId: '1009400082482524', appSecret: '5f048a33772e36ca38c57bc696884ba2'});

  //  publicarpostenpaginafacebook();
  //  sacarpostdeperiodicos();
  //    setInterval(sacarpostdeperiodicos,1000*60*60*12); Paraque lo realize cada 5minutos
  //    sersetInterval(publicarpostenpaginafacebook,600 000); Publicar cada 10minutos

    console.log("finaldetodoautomatico");

});
