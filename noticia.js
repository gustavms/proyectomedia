var mongoose = require ('mongoose');
 Schema=mongoose.Schema;

 var noticiero = new Schema ({
   categoria:String, //categoria del periodico
   datecreator:String,
   type:String, //link o photo o video
   message:String,
   hashtag:String,//solo si se saca de facebook sino no tiene
    title:String,
    picture:String,
    content:String //solo si se saca de la web
    link:String,
    se_publico:String

});

 module.export=noticiero;
