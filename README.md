| Keywords | ESP32 | WebSocket | NodeJS | WiFi | HTTP | SQLite | RFID | SPI |
| -------- | ----- | --------- | ------ | ---- | ---- | ------ | ---- | --- |

# Access Control
The project implements a simple system for access control using RFID cards(key cards). Upon scanning tapping the card,its serial number is checked against a database located on the server(a Linux machine in our case). If the serial number matches one of the existing ones on the database,holder data are shown on the admin webpage. The project uses ESP-IDF 5.0,VS Code and Ubuntu, but could also be replicated on Windows machines installing the respective packages. 

# Getting up and run 
 
A router(AP) is needed to connect the ESP32 and the server PC together through WiFi. All devices should be on the same network.

__On the server side:__

1. On the project root run: ``chmod +x installPackages.sh`` 
 
 then: 

2. ``./installPackages.sh``

3. If development is held on the server machine, install also VS Code with ESP-IDF v5.0 framework. Clone this repo and open the workspace file(on the repo root) on VS Code. After installing ESP-IDF extension, the required v5.0 release can be selected and clonned on the extension welcome page.

4. Open the _users.db_ on the DB Browser for SQLite GUI and fill in with your user cards data. Note that new user attributes can be added as needed.

5. Run the server on the terminal inside the project root: ``node server.js``. You should get something like: 
```
Server running on port 3000
WS connection from: 127.0.0.1
WebSocket client connected
``` 

6. On any browser enter your_machine_ip:port/admin.html or just localhost:port/admin.html. In our case port=3000,so we get something like 192.168.0.5:3000/admin.html(or localhost:3000/admin.html). 
 
__On the ESP32 side:__ 

Server endpoint address(HTTP_ENDPOINT) from 6. and WiFi credentials  should be hardcoded in http_client.h so it automatically connects to the AP upon powering. After a successfull connection the blue LED stops blinking. After that,build and flash the board. By tapping the badge/tag, if access is granted, the green LED turns on, otherwise, the red one.

# ESP32 - RC522 connections

|       ESP32        |   RC522  |
| ------------------ | -------- |
|        3v3         |    3v3   |
| HSPI_MOSI(GPIO13)  |    MOSI  |
| HSPI_MISO(GPIO12)  |    MISO  |
| HSPI_SCK(GPIO14)   |    SCK   |
|        GND         |    GND   |

# Funcional Diagram
![](https://github.com/Benedito821/access-control/blob/stable/access-control.gif)