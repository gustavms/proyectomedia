let app = require('./app');

var newsRef = app.database().ref('news');

var _new = {
    id: '7a252111cda14c38546e136baf625f2885d6c891',
    institution: 'Servicio Nacional de Áreas Naturales Protegidas por el Estado',
    subtitle: 'Más de dos mil metros en redes que servían de corrales no autorizados para cultivo de concha de abanico en la Reserva Nacional de Paracas...',
    date: new Date('2016-10-17').getTime(),
    url: 'http://www.sernanp.gob.pe/noticias-leer-mas/-/publicaciones/c/ica-realizan-intervencion-contra-pesca-ilegal-en-reserva-234079',
    imageUrl: 'http://www.sernanp.gob.pe/documents/10181/233943/F15.jpg/1a3df0b6-950e-447e-83be-bb708ebc6b2f?t=1476743706996',
    source: 'SERNANP',
    title: 'Ica: realizan intervención contra pesca ilegal en Reserva Nacional de Paracas',
    content: 'Más de dos mil metros en redes que servían de corrales no autorizados para cultivo de concha de abanico en la Reserva Nacional de Paracas fueron decomisadas en un operativo conjunto realizado por el Servicio Nacional de Áreas Naturales Protegidas por el Estado (SERNANP), el Ministerio de la Producción (PRODUCE), la Fiscalía de la Nación en Materia Ambiental, la Policía Nacional del Perú, la Dirección Regional de Producción (DIREPRO) y la Capitanía del Puerto de Pisco.\n\nEl SERNANP informó que la intervención se realizó en la zona denominada La Poz|a, en el sector Laguna Grande, al interior del área natural protegida ubicada en la región Ica. Cabe mencionar que estos corrales clandestinos se encontraban en zonas no permitidas ni habilitadas para dicha actividad, utilizando mallas que alteraban los ecosistemas de la Reserva Nacional de Paracas.\n\nFinalmente, se resaltó la sinergia de los sectores competentes durante este tipo de intervenciones para la protección y conservación de las áreas naturales protegidas, una muestra de la alianza para la defensa de la biodiversidad marina costera en el Perú.\n\nLima, 17 de octubre de 2016 Comunicaciones SERNANP',
    config: { 
        limit: 3,
        active: true,
        url: 'http://www.sernanp.gob.pe/noticias1',
        scrapper: '08.sernanp.gob.pe' 
    } 
}

newsRef.child('politica').child(_new.id).set(_new, snapshot => {

    snapshot;

});

newsRef.on('value', snapshot => {

    snapshot

});



