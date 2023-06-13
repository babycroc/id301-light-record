#include <SoftwareSerial.h>
#include <Stepper.h>
#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
#include <avr/power.h> // Required for 16 MHz Adafruit Trinket
#endif

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
#define DELAY_PER_STEP        10

Stepper myStepper = Stepper(STEPPER_TOTAL_STEPS, STEPPER_INT1_PIN, STEPPER_INT3_PIN, STEPPER_INT2_PIN, STEPPER_INT4_PIN);
bool play = false;

void stepperRotate(int steps) {
  if(steps > 0) {
    myStepper.setSpeed(STEPPER_SPEED);
    myStepper.step(-steps);
    delay(steps * DELAY_PER_STEP);
  } else {
    myStepper.setSpeed(0);
  }
}

// LED
#define LED_PIN         13
#define NEOPIXEL_PIN    7
#define STRIP_NUM       16
#define PIXEL_NUM       8
#define BRIGHTNESS      5 / 255

Adafruit_NeoPixel NeoPixel(STRIP_NUM * PIXEL_NUM, NEOPIXEL_PIN, NEO_GRB + NEO_KHZ800);

const int colors[][3] = {
  {255, 0, 0}, 
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
//int melody[] = {0, 1, 3, 2, 5, 6, 5, 2, 3, 4, 7, 7, 6, 1, 3, 2};

void ledStripOn(int stripNum, int colorIdx) {
  Serial.print(stripNum);
  Serial.print(" ");
  Serial.println(colorIdx);
  int startPixel = stripNum * PIXEL_NUM;
  for (int pixel = startPixel; pixel < startPixel + PIXEL_NUM; pixel++) { // for each pixel
    NeoPixel.setPixelColor(pixel, NeoPixel.Color(colors[colorIdx][0]*BRIGHTNESS, colors[colorIdx][1]*BRIGHTNESS, colors[colorIdx][2]*BRIGHTNESS));
  }
}
void ledStripOff(int stripNum) {
  ledStripOn(stripNum, 8);
}
void recordOn(String melody) {
  Serial.println(melody);
  NeoPixel.clear();
  for(int i = 0; i < STRIP_NUM; i++) {
    Serial.print("melody[i] ");
    Serial.println(melody[i]);
    ledStripOn(i, melody[i] - '0');
  }
  NeoPixel.show();
}
void recordOff() {
  NeoPixel.clear();
  NeoPixel.show();
}

void setup() {
  //  Bluetooth 
  Serial.begin(BAUDRATE);
  SerialBt.begin(BAUDRATE);

  // Stepper Motor
  myStepper.setSpeed(STEPPER_SPEED);

  // LED
  pinMode(LED_PIN, OUTPUT);
  NeoPixel.begin();
  recordOff();

//  recordOn(melody);
}

void loop() {
    char btCommand[COMMAND_LENGTH];
    if (SerialBt.available()) {
        int numberOfBytesReceived = SerialBt.readBytesUntil('\n', btCommand, COMMAND_LENGTH - 1);
        btCommand[numberOfBytesReceived] = NULL;

        if(&btCommand[0] == strstr(btCommand, "PLAY")) {
          play = true;
          digitalWrite(13, HIGH);
        } else if(&btCommand[0] == strstr(btCommand, "PAUSE")) {
          play = false;
          digitalWrite(13, LOW);
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
          Serial.print("melodyCharArr ");
          Serial.println(melodyCharArr);
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
    }
}