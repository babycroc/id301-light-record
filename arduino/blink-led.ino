#include <SoftwareSerial.h>

SoftwareSerial SerialBt(2, 3);

char data = 0;

void setup() {
    Serial.begin(9600);
    SerialBt.begin(9600);
    pinMode(13, OUTPUT);
}

void loop() {
    if (SerialBt.available()) {
        data = SerialBt.read();
        if(data == '1') {               // Checks whether value of data is equal to 1  
          digitalWrite(13, HIGH);       // If value is 1 then LED turns ON  
        } else if(data == '0') {        //  Checks  whether value of data is equal to 0  
           digitalWrite(13, LOW);       // If value is 0 then LED turns OFF  
        }
        Serial.write(data);
    }

    if (Serial.available()) {
        SerialBt.write(Serial.read());
    }
}