/* ***** Conexion con el socket ***** */
var socket = io.connect('http://localhost:4000');
/* ***** ---------- ***** */

/* ***** Funcion Sockets ***** */

var UltraSonico = document.getElementById('UltraSonico'),
    Temperatura1 = document.getElementById('Temperatura1'),
    Temperatura2 = document.getElementById('Temperatura2'),
    Humedad = document.getElementById('Humedad');



// Lo que llega del socket del Mensaje privado
socket.on('Arduino', function (data) {

    console.log("Lo que llega: " + data);

    UltraSonico.innerHTML = '';
    Temperatura1.innerHTML = '';
    Temperatura2.innerHTML = '';
    Humedad.innerHTML = '';
    
    UltraSonico.innerHTML = data[1];
    Temperatura1.innerHTML = data[2];
    Temperatura2.innerHTML = data[3];
    Humedad.innerHTML = data[4];
});