var Datos = [];
var DatosAcomodados = [];

var express = require('express');
var socket = require('socket.io');
var SerialPort = require('serialport');



 /**
  * Express.
  */
// App setup
var app = express();

var server = app.listen(4000, function () {
    console.log('Escuchando peticiones en el puerto 4000.');
});

// Static files
app.use(express.static('public'));
app.use(express.static('public/pruebapost'));


/**
 * Sockets 
 */

// Socket setup & pass server
var io = socket(server);


//var port = new SerialPort('/dev/tty-usbserial1');
//var port = new SerialPort("COM3");
var port = new SerialPort('com6', {
    parser: SerialPort.parsers.raw
  });
  port.setEncoding('utf8');
  
  
  
  /**
   * Puerto Serial.
   */
  
   // Switches the port into "flowing mode"
  port.on('data', function (data) {
  
      if(Datos.length == 6 ){

          for(var i=0; i<=Datos.length; i++){
              
              if(Datos[i] == 49 && i == 0){
                  console.log("Lo logramos, estamos de mucha suerte pos " + i);
                  DatosAcomodados = [Datos[i],Datos[i+1],Datos[i+2],Datos[i+3],Datos[i+4],Datos[i+5]];
              }else if(Datos[i] == 49 && i == 1){
                console.log("Que chamfle estamos en " + i);
                DatosAcomodados = [Datos[i],Datos[i+1],Datos[i+2],Datos[i+3],Datos[i+4],Datos[i-1]];
              }else if(Datos[i] == 49 && i == 2){
                console.log("Que chamfle estamos en " + i);
                DatosAcomodados = [Datos[i],Datos[i+1],Datos[i+2],Datos[i+3],Datos[i-2],Datos[i-1]];
              }else if(Datos[i] == 49 && i == 3){
                console.log("Que chamfle estamos en " + i);
                DatosAcomodados = [Datos[i],Datos[i+1],Datos[i+2],Datos[i-3],Datos[i-2],Datos[i-1]];
              }else if(Datos[i] == 49 && i == 4){
                console.log("Que chamfle estamos en " + i);
                DatosAcomodados = [Datos[i],Datos[i+1],Datos[i-4],Datos[i-3],Datos[i-2],Datos[i-1]];
              }else if(Datos[i] == 49 && i == 5){
                console.log("Que chamfle estamos en " + i);
                DatosAcomodados = [Datos[i],Datos[i-5],Datos[i-4],Datos[i-3],Datos[i-2],Datos[i-1]];
              }
              
            }
          console.log("Full");
          console.log("Original: "+ Datos);
          console.log("Como quedo: "+ DatosAcomodados);

          io.sockets.emit('Arduino', DatosAcomodados);

          Datos = [];
        }
      Datos.push(data);
      console.log("Datosssss: " + Datos);
      
    });
  
  
    
    // Read data that is available but keep the stream from entering "flowing mode"
    port.on('readable', function () {
      console.log('Data:', port.read());
    });
  
  port.write('main screen turn on', function(err) {
      if (err) {
        return console.log('Error on write: ', err.message);
      }
      console.log('message written');
    });
    
    // Open errors will be emitted as an error event
    port.on('error', function(err) {
      console.log('Error: ', err.message);
    })
  