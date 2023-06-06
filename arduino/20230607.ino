//Includes the Arduino Stepper Library
#include <Stepper.h>

String data = "";

// stepper motor
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
    // serial monitor
    Serial.begin(9600);
    
    // stepper motor
    myStepper.setSpeed(5);

    // led
    pinMode(13, OUTPUT);
}

void loop() {
  if(Serial.available() > 0) {
    data = Serial.readString();
    Serial.println(data);

    char type = data.charAt(0);
    Serial.print("type ");
    Serial.println(type);
    if(type) {
      if(type == '1') {
        play = true;
        digitalWrite(13, HIGH);
      } else if(type == '0') {
        play = false;
        digitalWrite(13, LOW);
      }
    }
  }

  if(play) {
    stepperRotate(1);
  }
}