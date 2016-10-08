
var express = require('express');
var http = require('http');
var app = express();
var request= require('request');
var fs = require('fs');
var cheerio = require('cheerio');
var path = require('path');
var $ = require("jquery");

const PORT = 3000;
//nose sabe a que hora se cuelgan lso articulos pero debe ser entre las 8am y las 6pm porq es trabajo del estado de L a V
linkpaginas=[{url:"http://www.apn.gob.pe/site/noticias.aspx",nombre:"AUTORIDAD PORTUARIA NACIONAL" , frecuenciaarticulosnuevos: }, //1 articulo al dia
             {url:"http://www2.trabajo.gob.pe/prensa/notas-de-prensa",nombre:"Ministerio de Trabajo" , frecuenciaarticulosnuevos: },//1 al dia
             {url:"http://www.sbn.gob.pe/noticias_hist.php",nombre: , frecuenciaarticulosnuevos: }, //1 o 2 cada 2 dias
             {url:"http://www.apci.gob.pe/index.php/noticias",nombre: , frecuenciaarticulosnuevos: }, //2 o 3  cada 3 dias
             {url:"http://www.igss.gob.pe/portal/index.php/joomla/contentall-comcontent-views/category-list",nombre:"Gestion de servicios de salud" , frecuenciaarticulosnuevos: },
             {url:"http://www.minsa.gob.pe/index.asp?op=5#Prensa",nombre:L , frecuenciaarticulosnuevos: },//6 articulso al dia
             {url:"http://www.rree.gob.pe/noticias/Paginas/Notas_de_Prensa.aspx",nombre: , frecuenciaarticulosnuevos: },//1 al dia
             {url:"http://www.rree.gob.pe/noticias/Paginas/NotasInformativas.aspx",nombre: , frecuenciaarticulosnuevos: }, //6 al dia
             {url:"http://www.sedena.gob.pe/prensa.html",nombre: , frecuenciaarticulosnuevos: },//1 al mes
             {url:"http://www.itp.gob.pe/index.php/publicaciones/ultimas-noticias",nombre:"Instituto de Producci´n" , frecuenciaarticulosnuevos: },
             {url:"http://www.apn.gob.pe/site/noticias.aspx",nombre: , frecuenciaarticulosnuevos: }



           ]

/* usar cheerio en estas paginas
   //
  http://www2.trabajo.gob.pe/prensa/notas-de-prensa/ // MINISTERIODETRABAJO //1 al dia
  http://www.sbn.gob.pe/noticias_hist.php // 1 o 2 cada 3 diarionuevosol
  http://www.apci.gob.pe/index.php/noticias // cada 3 dias
 http://www.igss.gob.pe/portal/index.php/joomla/contentall-comcontent-views/category-list Gestion de servicios de salud
  http://www.minsa.gob.pe/index.asp?op=5#Prensa //6 articulso al dia
  http://www.rree.gob.pe/noticias/Paginas/NotasInformativas.aspx //6 al dia
  http://www.rree.gob.pe/noticias/Paginas/Notas_de_Prensa.aspx //1 al dia
  http://www.sedena.gob.pe/prensa.html // 1 cada mes
  http://www.itp.gob.pe/index.php/publicaciones/ultimas-noticias // instituto de produccion 1 cada dia
  http://www.inacal.gob.pe/principal/noticias //2 cada dia instituto para la calidad
  http://www.produce.gob.pe/index.php/k2/noticias?start=1 // 1 cada dia
  https://www.ositran.gob.pe/publicaciones1/notas-de-prensa.html // 1 al dia
  http://www.pcm.gob.pe/seccion/noticias/notas-de-prensa/ //1 al dia
  http://www.osinergmin.gob.pe/seccion/noticias/noticias#k= //1 al dia
  http://www.osiptel.gob.pe/noticias //1 al dia
  https://www.inei.gob.pe/prensa/noticias/ // 2 al dia
  https://www.indecopi.gob.pe/noticias //1 al dia
  http://www.presidencia.gob.pe/lista-notas-prensa
  http://www.ceplan.gob.pe/comunicaciones-2/notas-de-prensa/ // 1 al dia
  http://www.cenepred.gob.pe/web/notas-de-prensa/ //2 al dia
  http://www.minjus.gob.pe/categoria/ultimas-noticias/ //2 al dia
  http://www.inpe.gob.pe/contenidosprensa_all.php?direccion=1 //4 al dia
  http://www.sunat.gob.pe/salaprensa/lima/index.html //1 al dia
  http://www.minedu.gob.pe/n/archivo.php //1 al dia
  http://portal.osce.gob.pe/osce/noticias //1 vada 2 dias
  https://www.mef.gob.pe/es/presentaciones?id=4612 // economia es pdf, pero hay q usar imagenes fijas para publicar cada 5 dias
  https://www.mef.gob.pe/es/noticias //cada 3 dias
  http://www.midis.gob.pe/index.php/es/centro-de-informacion //cada 2 dias
  http://www.promperu.gob.pe/ //1 al dia
  http://www.cultura.gob.pe/es/comunicacion/noticias //2 al dia
  http://www.inaigem.gob.pe/NotasDePrensa // 2 al dia
  http://www.sernanp.gob.pe/noticias1 // 3 al dia
  http://www.minam.gob.pe/notas-de-prensa/ // 1 al dia
  http://www.minam.gob.pe/medios/ //1 al dia
  http://www.oefa.gob.pe/noticias-institucionales //1 al dia
  http://infosenasa.blogspot.pe/2016/ // 1 al dia

*/



function sacarposts(periodico,callback){
 //por cada link es una extraccion diferente falta el switch y la logica de cada uno
  //logica de prueba:
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

//probando extraer de facebok usando cheerio
//-no pude u.u
function revisarsiesnuevo1(url,callback){


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

// revisa cada periodico y si tiene nuevos articulos lo enviara a la categorias
function Revisarperiodico(periodico){

     sacarposts(periodico,function(nuevo,databruta){
    /*logica
    If(nuevo){
      var post=reordenarpost(databruta);
      guardarencategoria(post,categoria);
    };
   */
  });


};


function sacarpostdeperiodicos(){
    for (var i=0; i<linkpaginas.length; i++){
       //sacamos periodico por periodico
         console.log("sacarperiodicos");
       setTimeout(Revisarperiodico(linkpaginas[i]),0);
         console.log(linkpaginas[i].pais);
    };
};

function publicarpostenpaginafacebook(){
   //sacar el primer post de cada categoria(First In Firs out) y postearlo en su pagina respectiva usando api graph
  //seria bueno probar envairlo automaticamente, lo malo es el token, no puedo administrar mis paginas? probar si se puede falta
  //sino como obtendria un token cada media hora, como extraer el token de facebook para enviarlo automaticamente
};

// esto esta muy truncado para probarlo rapido nomas hay q arreglarlo
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
    console.log("Paginas de facebook api graf");
    sacarpostdeperiodicos();
  //    setInterval(sacarpostdeperiodicos,1000*60*60*12); Paraque lo realize cada 5minutos
  //    sersetInterval(publicarpostenpaginafacebook,600 000); Publicar cada 10minutos
    console.log("finaldetodoautomatico");
});
