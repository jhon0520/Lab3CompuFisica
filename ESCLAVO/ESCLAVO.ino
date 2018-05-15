int led = 13;  // usamos un pin de salida al LED
int DATO = 0;      // Variable lectrura serial
  
void setup() {
    pinMode(led, OUTPUT);
    digitalWrite(led, LOW);
    Serial.begin(9600);
}
  
void loop() {
    //si el modulo a manda dato, guardarlo en estado.
     if(Serial.available() > 0){
      DATO = Serial.read();
      Serial.println(DATO);
    } // esta parte del código es para solo 1 Carácter o Unidad.
  
    
    if (DATO == '0') {
         digitalWrite(led, LOW);
         
    }
  
   if (DATO == '1') {
        digitalWrite(led, HIGH);
         
    }
}
