| Keywords | ESP32 | WebSocket | NodeJS | WiFi | HTTP | SQLite | RFID | SPI |
| -------- | ----- | --------- | ------ | ---- | ---- | ------ | ---- | --- |

# _Access Control_
The project implements a simple system for access control using RFID cards(key cards). Upon scanning tapping the card,its serial number is checked against a database located on the server(a Linux machine in our case). If the serial number matches one of the existing ones on the database,holder data are shown on the admin webpage. 

# _Getting up and run_


# _ESP32 - RC522 connections_

|       ESP32        |   RC522  |
| ------------------ | -------- |
|        3v3         |    3v3   |
| HSPI_MOSI(GPIO13)  |    MOSI  |
| HSPI_MISO(GPIO12)  |    MISO  |
| HSPI_SCK(GPIO14)   |    SCK   |
|        GND         |    GND   |

# _Funcional Diagram_
![](https://github.com/Benedito821/access-control/blob/stable/access-control.gif)