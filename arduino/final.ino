#include <SoftwareSerial.h>
#include <Stepper.h>
#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
#include <avr/power.h> // Required for 16 MHz Adafruit Trinket
#endif
#include "pitches.h"

// Bluetooth
#define BLUETOOTH_TX_PIN  2
#define BLUETOOTH_RX_PIN  3
#define BAUDRATE          9600
#define COMMAND_LENGTH    30

SoftwareSerial SerialBt(BLUETOOTH_TX_PIN, BLUETOOTH_RX_PIN);

// Stepper Motor
#define STEPPER_INT1_PIN      8
#define STEPPER_INT2_PIN      9
#define STEPPER_INT3_PIN      10
#define STEPPER_INT4_PIN      11
#define STEPPER_TOTAL_STEPS   2048
#define STEPPER_SPEED         5
#define DELAY_PER_STEP        10 / 4

Stepper myStepper = Stepper(STEPPER_TOTAL_STEPS, STEPPER_INT1_PIN, STEPPER_INT3_PIN, STEPPER_INT2_PIN, STEPPER_INT4_PIN);
bool play = false;
int totalSteps = 0;

void stepperRotate(int steps) {
  if(steps > 0) {
    myStepper.setSpeed(STEPPER_SPEED);
    myStepper.step(-steps);
    totalSteps += steps;
    delay(steps * DELAY_PER_STEP);
  } else {
    myStepper.setSpeed(0);
  }
}

// LED
#define NEOPIXEL_PIN    7
#define STRIP_NUM       16
#define PIXEL_NUM       8
#define BRIGHTNESS      5 / 255

Adafruit_NeoPixel NeoPixel(STRIP_NUM * PIXEL_NUM, NEOPIXEL_PIN, NEO_GRB + NEO_KHZ800);

const int colors[][3] = {
  {128, 0, 0}, 
  {255, 128, 0}, 
  {255, 255, 0}, 
  {0, 255, 0}, 
  {0, 128, 255}, 
  {128, 0, 255}, 
  {255, 0, 255}, 
  {255, 255, 255},
  {0, 0, 0}
};
String melody = "0132565234776132";
int currMelody[] = {0, 1, 3, 2, 5, 6, 5, 2, 3, 4, 7, 7, 6, 1, 3, 2};

void ledStripOn(int stripNum, int colorIdx) {
  int startPixel = stripNum * PIXEL_NUM;
  for (int pixel = startPixel; pixel < startPixel + PIXEL_NUM; pixel++) { // for each pixel
    NeoPixel.setPixelColor(pixel, NeoPixel.Color(colors[colorIdx][0]*BRIGHTNESS, colors[colorIdx][1]*BRIGHTNESS, colors[colorIdx][2]*BRIGHTNESS));
  }
}
void ledStripOff(int stripNum) {
  ledStripOn(stripNum, 8);
}
void recordOn(String melody) {
  for(int i = 0; i < STRIP_NUM; i++) {
    currMelody[i] = melody[i] - '0';
  }
  NeoPixel.clear();
  for(int i = 0; i < STRIP_NUM; i++) {
    ledStripOn(i, melody[i] - '0');
  }
  NeoPixel.show();
}
void recordOff() {
  totalSteps = 0;
  NeoPixel.clear();
  NeoPixel.show();
}

// Speaker
#define SPEAKER_PIN  6
#define RED_SOUND     NOTE_C4
#define ORANGE_SOUND  NOTE_G4
#define YELLOW_SOUND  NOTE_D4
#define GREEN_SOUND   NOTE_A4
#define BLUE_SOUND    NOTE_B4
#define PURPLE_SOUND  NOTE_CS4
#define PINK_SOUND    NOTE_F4
#define WHITE_SOUND   NOTE_E4

const int sounds[] = {
  RED_SOUND, ORANGE_SOUND, YELLOW_SOUND, GREEN_SOUND,
  BLUE_SOUND, PURPLE_SOUND, PINK_SOUND, WHITE_SOUND
};
int currentNote = 0;

void soundOn() {
  int stripIdx = totalSteps / (STEPPER_TOTAL_STEPS / STRIP_NUM);
  int colorIdx = currMelody[stripIdx % STRIP_NUM];
  if(colorIdx <= 7) {
    currentNote = sounds[colorIdx];
  } else {
    currentNote = 0;
  }
}
void soundOff() {
  currentNote = 0;
  noTone(SPEAKER_PIN);
}

void setup() {
  //  Bluetooth 
  Serial.begin(BAUDRATE);
  SerialBt.begin(BAUDRATE);

  // Stepper Motor
  myStepper.setSpeed(STEPPER_SPEED);

  // LED
  NeoPixel.begin();
  recordOff();
  soundOff();
}

void loop() {
    char btCommand[COMMAND_LENGTH];
    if (SerialBt.available()) {
        int numberOfBytesReceived = SerialBt.readBytesUntil('\n', btCommand, COMMAND_LENGTH - 1);
        btCommand[numberOfBytesReceived] = NULL;

        if(&btCommand[0] == strstr(btCommand, "PLAY ")) {
          play = true;
          char melodyCharArr[] = "";
          strcpy(melodyCharArr, &btCommand[strlen("PLAY ")]);
          String melodyString(melodyCharArr);
          recordOn(melodyString);
        } else if(&btCommand[0] == strstr(btCommand, "PAUSE")) {
          play = false;
        } else if(&btCommand[0] == strstr(btCommand, "STOP")) {
          play = false;
          recordOff();
        } 
        
        if(&btCommand[0] == strstr(btCommand, "LED ON")) {
          recordOn(melody);
        } else if(&btCommand[0] == strstr(btCommand, "LED OFF")) {
          recordOff();
        }

        if(&btCommand[0] == strstr(btCommand, "MELODY ")) {
          char melodyCharArr[] = "";
          strcpy(melodyCharArr, &btCommand[strlen("MELODY ")]);
          String melodyString(melodyCharArr);
          recordOn(melodyString);
        }
        Serial.write(btCommand);
    }

    char command[COMMAND_LENGTH];
    if (Serial.available()) {
        int numberOfBytesReceived = SerialBt.readBytesUntil('\n', command, 9);
        command[numberOfBytesReceived] = NULL;
        SerialBt.write(command);
    }

    if(play) {
      stepperRotate(1);
      soundOn();
    } else {
      soundOff();
    }

    if(currentNote != 0) {
      tone(SPEAKER_PIN, currentNote);
    }
}