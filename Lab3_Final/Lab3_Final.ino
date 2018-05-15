  #include <SoftwareSerial.h>
  #include <NewPing.h>
  #include "DHT.h"
  
// se define al Pin2 como RX, Pin3 como TX
  SoftwareSerial mySerial(2,3);// RX,TX

// Se definen pines y variables para Sensor de ultra sonido
  #define TRIGGER_PIN  7  // Pin del arduino conectado al pin del Trigger del sensor.
  #define ECHO_PIN     6  // Pin del arduino conectado al pin del Echo del sensor.
  #define MAX_DISTANCE 200 // Maxima distancia que se va a sensar.
  NewPing sonar(TRIGGER_PIN, ECHO_PIN, MAX_DISTANCE); // NewPing setup of pins and maximum distance.

 // Se definen pines y variables para Sensor de Temperatura y Humedad.
  #define DHTPIN 8
  #define DHTTYPE DHT22   // Sensor DHT22
  DHT dht(DHTPIN, DHTTYPE);

void setup()
{
  //inicializa la comunicación serial
  Serial.begin(9600);
  mySerial.begin(9600);
  dht.begin();
}
void loop()
{
  mySerial.write("1");  Serial.println("LED: on");
  SensorUltrasonido();
  SensorTemperaturaHumedad();
  delay(2000);
  mySerial.write("0");  Serial.println("LED: off");
  delay(2000);

}

void SensorUltrasonido(){
  //delay(50);
  unsigned int uS = sonar.ping(); // Envia y recibe Ping del sensor.
  Serial.print("Ping: ");
  Serial.print(uS / US_ROUNDTRIP_CM); // Convierte el Ping en distancia.
  mySerial.write(uS / US_ROUNDTRIP_CM);
  Serial.println("cm");
}

void SensorTemperaturaHumedad(){

  int h = dht.readHumidity(); //Leemos la Humedad
  int t = dht.readTemperature(); //Leemos la temperatura en grados Celsius
  int f = dht.readTemperature(true); //Leemos la temperatura en grados Fahrenheit
  //--------Enviamos las lecturas por el puerto serial-------------
  Serial.println("Temperatura: ");
  Serial.print(t);
  Serial.print(" *C ");
  mySerial.write(t);
  Serial.print(f);
  Serial.print(" *F");
  mySerial.write(f);
  Serial.print("Humedad ");
  Serial.println(h);
  mySerial.write(h);


}

