
var express = require('express');
var    app  = express();
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
var mongoose = require('mongoose');
var FB = require('fb');


mongoose.Promise = require('bluebird');

// mongoose.Promise = Promise;
mongoose.connect('mongodb://gustavo:gustavo@ds021166.mlab.com:21166/noticias',
 function(err,res){
    if(err) console.log ('error: coenctado a la bd :'+ err);
    else console.log('conexion a la bd realizada');
 });

/*
mongoose.Promise = require('bluebird');
var db= mongoose.createConnection('mongodb://gustavo:gustavo@ds021166.mlab.com:21166/noticias',
function(err,res){
   if(err) console.log ('error: coenctado a la bd :'+ err);
   else console.log('conexion a la bd realizada');

});
*/

var Canalpolitica=mongoose.model('canalpolitica',Noticia);
var Canaleconomia=mongoose.model('canaleconomia',Noticia);
var Canalsctualidad=mongoose.model('actualidad',Noticia);

const PORT = 3000;



//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

linkwebpaginas=[{url:"http://www.apn.gob.pe/site/noticias.aspx",nombre:"AUTORIDAD PORTUARIA NACIONAL" , frecuenciaarticulosnuevos:"" },
             {url:"http://www2.trabajo.gob.pe/prensa/notas-de-prensa",nombre:"Ministerio de Trabajo" , frecuenciaarticulosnuevos:"" },//1 al dia
             {url:"http://www.sbn.gob.pe/noticias_hist.php",nombre:"Superintencia de banca y seguros" , frecuenciaarticulosnuevos:"" }, //1 o 2 cada 2 dias
             {url:"http://www.apci.gob.pe/index.php/noticias",nombre:"APCI" , frecuenciaarticulosnuevos:"" }, //2 o 3  cada 3 dias
             {url:"http://www.igss.gob.pe/portal/index.php/joomla/contentall-comcontent-views/category-list",nombre:"Gestion de servicios de salud" , frecuenciaarticulosnuevos:"" },
             {url:"http://www.minsa.gob.pe/index.asp?op=5#Prensa",nombre:"Ministerio de Salud" , frecuenciaarticulosnuevos:"" },//6 articulso al dia
             {url:"http://www.rree.gob.pe/noticias/Paginas/Notas_de_Prensa.aspx",nombre:"" , frecuenciaarticulosnuevos:"" },//1 al dia
             {url:"http://www.rree.gob.pe/noticias/Paginas/NotasInformativas.aspx",nombre:"" , frecuenciaarticulosnuevos:"" }, //6 al dia
             {url:"http://www.sedena.gob.pe/prensa.html",nombre:"" , frecuenciaarticulosnuevos:"" },//1 al mes
             {url:"http://www.itp.gob.pe/index.php/publicaciones/ultimas-noticias",nombre:"Instituto de Producci´n" , frecuenciaarticulosnuevos:"" },
             {url:"http://www.apn.gob.pe/site/noticias.aspx",nombre:"" , frecuenciaarticulosnuevos:"" }

           ];



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
  }
);

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
    //logica para diferenciarlo en que categoria poner
    next();
})

app.post('/endpoint', function(req, res){

var noticia= new Canalpolitica({
categoria:req.body.categoria,
creator:req.body.creator,
type:req.body.type,
message:req.body.message,
title:req.body.title,
picture:req.body.picture,
link:req.body.link,
se_publico:"false"
});

console.log(" tipo 2:" + noticia);
console.log(" tipo 3:" + JSON.stringify(noticia));
console.log("////");

console.log(JSON.stringify(noticia.type));
console.log(noticia.message);
console.log(noticia.title);

     noticia.save().then(function(){
            return res.status(200).send();
    },function(err){
      if (err){
         console.log(err);
         return res.status(500).send();
      }

     });

/*
     noticia.save(function(err){

       if (err){
          console.log(err);
          return res.status(500).send();
       }
       return res.status(200).send();
     })

  /*
  if (req.body.categoria=="economia"){var newnoticia= new CanalEconomia(); newnoticia};
  if (req.body.categoria=="politica"){};
  if (req.body.categoria=="actualidad"){};
  if (req.body.categoria=="seguridad"){};
  if (req.body.categoria=="empresarial"){};
  if (req.body.categoria=="gastronomia"){};
  if (req.body.categoria=="gastronomia"){};
  */


});



app.listen(PORT, function(){

    console.log("My http server listening on port " + PORT + "...");
    fb = new FB.Facebook({appId: '1009400082482524', appSecret: '5f048a33772e36ca38c57bc696884ba2'});

    console.log("Paginas de facebook api graf");
    publicarpostenpaginafacebook();
  //  sacarpostdeperiodicos();
  //    setInterval(sacarpostdeperiodicos,1000*60*60*12); Paraque lo realize cada 5minutos
  //    sersetInterval(publicarpostenpaginafacebook,600 000); Publicar cada 10minutos

    console.log("finaldetodoautomatico");
});
