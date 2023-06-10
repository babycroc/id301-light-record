#include <SoftwareSerial.h>

SoftwareSerial SerialBt(2, 3);

char type = 0;
char data = 0;

void setup() {
    Serial.begin(9600);
    SerialBt.begin(9600);
    pinMode(13, OUTPUT);
}

void loop() {
    char btCommand[10];
    if (SerialBt.available()) {
        int numberOfBytesReceived = SerialBt.readBytesUntil('\n', btCommand, 9);
        btCommand[numberOfBytesReceived] = NULL;

        if(&btCommand[0] == strstr(btCommand, "LED ON")) {                  // Checks whether value of data is equal to 1  
          digitalWrite(13, HIGH);                                           // If value is 1 then LED turns ON  
        } else if(&btCommand[0] == strstr(btCommand, "LED OFF")) {          // Checks  whether value of data is equal to 0  
            digitalWrite(13, LOW);                                          // If value is 0 then LED turns OFF  
        }
        Serial.write(btCommand);
    }

    char command[10];
    if (Serial.available()) {
        int numberOfBytesReceived = SerialBt.readBytesUntil('\n', command, 9);
        command[numberOfBytesReceived] = NULL;
        SerialBt.write(command);
    }
}