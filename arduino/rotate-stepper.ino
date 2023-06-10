#include <SoftwareSerial.h>
#include <Stepper.h>

SoftwareSerial SerialBt(2, 3);

const int totalSteps = 2048;
Stepper myStepper = Stepper(totalSteps, 8, 10, 9, 11);
bool play = false;

void stepperRotate(int steps) {
  if(steps > 0) {
    myStepper.setSpeed(5);
    myStepper.step(-steps);
    delay(steps * 10);
  } else {
    myStepper.setSpeed(0);
  }
}

void setup() {
    Serial.begin(9600);
    SerialBt.begin(9600);
    myStepper.setSpeed(5);
    pinMode(13, OUTPUT);
}

void loop() {
    char btCommand[10];
    if (SerialBt.available()) {
        int numberOfBytesReceived = SerialBt.readBytesUntil('\n', btCommand, 9);
        btCommand[numberOfBytesReceived] = NULL;

        if(&btCommand[0] == strstr(btCommand, "PLAY")) {
          play = true;
          digitalWrite(13, HIGH);
        } else if(&btCommand[0] == strstr(btCommand, "PAUSE")) {
          play = false;
          digitalWrite(13, LOW);
        }
        Serial.write(btCommand);
    }

    char command[10];
    if (Serial.available()) {
        int numberOfBytesReceived = SerialBt.readBytesUntil('\n', command, 9);
        command[numberOfBytesReceived] = NULL;
        SerialBt.write(command);
    }

    if(play) {
      stepperRotate(1);
    }
}