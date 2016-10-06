
var express = require('express');
var http = require('http');
var app = express();
var request= require('request');
var fs = require('fs');
var cheerio = require('cheerio');
var path = require('path');
var $ = require("jquery");



const PORT = 3000;



  var linkpaginas =[     {id:1, ur:"http://elcomercio.pe/economia?ref=ecr",pais:"Peru",nombre:"Comercio" },
                       {id:2, ur:"https://github.com/cheeriojs/cheerio",pais:"Peru",nombre:"hithub" },
                       {id:3, ur:"https://www.facebook.com/kiara.reategui.3",pais:"Peru",nombre:"Facebook" },
                       {id:4, ur:"http://elcomercio.pe/",pais:"Peru",nombre:"Comercio" }];






function comercio_economia(periodico,callback){ //funcion para sacar datos de economia del periodico comercio-peruS

  per=periodico.ur;
  request(per,function(err,resp,body){

     if (err){

     }else{
          console.log("else:"+per);
        var $ = cheerio.load(body);
      //  var texto = $('.ec-cols h2');
        arreglos=[];
        var texto = $('.ec-main.ec-ultimas.bi3dColumn p').each(function(){
                        //   var arreglo=this.text();

                           arreglos.push(texto);

        });
        console.log(arreglos);
        var textotext=texto.text();
        //console.log(textotext);
        callback(null,null);
     };
   });
 };

function revisanuevapublicacion(periodico,callback){ //si saco por categorias en este caso economia
  if (periodico.nombre=="Comercio"){
    comercio_economia(periodico,function(nuevo,databruta){
         callback(nuevo,databruta);
    });

  };
};


function revisarsiesnuevo1(url,callback){ //si hubiera sacado todo de facebook


   request(url,function(err,resp,body){
      if (err){
        console.log("error:"+err);
      }else{
        console.log(url.length);
        var num= url.length;
        fs.writeFile("./filetemporal"+ num +".txt", body, function(err) {
        if( err ){
        console.log( err );
         }
        else{
        console.log('Se ha escrito correctamente');
        }
      });

        console.log("revisa la pagina:"+url);
        var $ = cheerio.load(body);

      //var texto = $('#js-repo-pjax-container span');
        var texto = $('.public a');
        var textotext=texto.text();
          console.log("previo_textotext:");
        //  var texto = $('._1dwg _1w_m','#u_jsonp_22_1j');

         console.log(textotext);
         console.log("termino_textotext:");
      //  var textotext=texto.text();
      //  console.log(textotext);
        callback(null,null);
      }

   });

};


function Revisarperiodico(periodico){

  revisanuevapublicacion(periodico,function(nuevo,databruta){

  });

   /*logica
  If(nuevo){
     var post=reordenarpost(databruta);
     guardarencategoria(post,categoria);
   };
  */
};


function sacarpostdeperiodicos(){
    for (var i=0; i<linkpaginas.length; i++){
       //sacamos periodico por periodico
       setTimeout(Revisarperiodico(linkpaginas[i]),0);
         console.log(linkpaginas[i].pais);
    };
};

function publicarpostenpaginafacebook(){
  //postearelpostenfacebook
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


app.listen(PORT, function(){

    console.log("My http server listening on port " + PORT + "...");
    console.log("Comienzoautomatico");
    sacarpostdeperiodicos();
  //    setInterval(sacarpostdeperiodicos,300 000); Paraque lo realize cada 5minutos
  //    sersetInterval(publicarpostenpaginafacebook(post),600 000); Publicar cada 10minutos
    console.log("finaldetodoautomatico");
});
