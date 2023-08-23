/*******************************************************
  - Codigo de estacion temp wifi que tiene un BMP180, Luxometro y DHT11
  - Este codigo envia al servidor cada x min los datos recogidos por los sensores
  
  -Conexiones del sensor BM180 y el luxometro:
  + SDA - DATA
  + SCL - CLOCK

  - Conexiones del DHT11
  - VCC - 3V
  - GND - GND
  - DATA - 12
 ********************************************************/


//  ---------- Diversas librerias para que el programa funcione  ----------
#include <SFE_BMP180.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BMP085.h>
#include "DHT.h"
#include <DHT_U.h>
#include <WiFi.h>
#include <WiFiManager.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <ESP32Time.h>
#include <BH1750.h>


// ---------- Sensores ----------
Adafruit_BMP085 bmp;

uint32_t delayMS;
BH1750 lightMeter;

// --------- Definiciones Varias ---------------
String device = "*********";
#define led 13
int contador = 0;

// ------- Configurar red Wifi ----------
const char *ssid = "***********";
const char *password = "***********";

// --------- Timer para el envio de datos ---------------
unsigned long twominutes = 120000;    // 2 Minutes
unsigned long fiveminutes = 300000;   // 5 Minutes
unsigned long oneminute = 60000;      // 1 Minute
unsigned long threeminutes = 180000;  // 3 Minutes
unsigned long tenminutes = 600000;    // 10 Minutes
unsigned long thirtyseconds = 30000;  // 30 Seconds
unsigned long fifteenminutes = 900000; // 15 Minutes 
unsigned long thirtyminutes = 1800000; // 30 Minutes

// --------- Timestamp ---------------
const char *ntpServer = "pool.ntp.org";

// Variable to hold current epoch timestamp
unsigned long Epoch_Time;

// Get_Epoch_Time() Function that gets current epoch time
unsigned long Get_Epoch_Time() {
  time_t now;
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    // Serial.println("Failed to obtain time");
    return (0);
  }
  time(&now);
  return now;
}

// ----- Envio de datos -----
void enviarDatos() {
  float lux = lightMeter.readLightLevel();
  Serial.print("Light: ");
  Serial.print(lux);
  Serial.println(" lx");

  WiFiClient client;

  // Inciamos el cliente HTTP con el cliente y el nombre del servidor que inicamos arriba
  HTTPClient http;

  http.begin("http://localhost:8000/api/miniestacion");
  http.addHeader("Content-Type", "application/json");
  int wifiRssi = WiFi.RSSI() * 240 / 4.14;

  http.addHeader("Content-Type", "application/json");
  StaticJsonDocument<200> doc;

  doc["dispositivo"] = "MiniEstacionWifi";
  doc["hora"] = Epoch_Time;
  doc["altura"] = bmp.readAltitude();
  doc["presion"] = bmp.readPressure();
  doc["temperatura"] = bmp.readTemperature();
  doc["luxes"] = lux;
  doc["wifiRsii"] = WiFi.RSSI();

  String requestBody;
  serializeJson(doc, requestBody);

  Serial.print("Datos enviados: ");
  Serial.println(requestBody);

  int httpResponseCode = http.POST(requestBody);

  if (httpResponseCode > 0) {
    Serial.print("HTTP Response Code: ");
    Serial.println(httpResponseCode);
  } else {
    Serial.print("HTTP Response Code: ");
    Serial.println(httpResponseCode);
    Serial.println("Send data again");

    delay(1000);

    contador++;

    if (contador == 5) {
      ESP.restart();
    } else {
      contador = 0;
      enviarDatos();
    }
  }
}

// --- Parpadeo LED ---
void parpadeoLed() {
  digitalWrite(led, HIGH);
  delay(1000);
  digitalWrite(led, LOW);
  delay(1000);
  digitalWrite(led, HIGH);
  delay(1000);
  digitalWrite(led, LOW);
}


void setup() {
  pinMode(led, OUTPUT);  //LED 13 como salida
  Serial.begin(115200);
  Wire.begin();

  // ------ Inicio de Sensores ---------
  lightMeter.begin();

  Serial.println(F("BH1750 Test"));

  if (!bmp.begin()) {
    Serial.println("No se ha encontrado un sensor BMP085/BMP180 válido, ¡compruebe el cableado!");
    while (1) {}
  }

  delay(1000);

  // ------- Inicio de Wifi ------
  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    configTime(0, 0, ntpServer);
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Conectado a la red wifi con la siguiente ip: ");
  Serial.println(WiFi.localIP());
  Serial.print("WifiRSSI: ");
  Serial.println(WiFi.RSSI());
  delay(1000);

  // ------------ Inicio de la hora ------------
  Epoch_Time = Get_Epoch_Time();
  Serial.print("Epoch Time: ");
  Serial.println(Epoch_Time);
  delay(1000);
}

void loop() {
  enviarDatos();
  parpadeoLed();
  delay(fifteenminutes);
}
