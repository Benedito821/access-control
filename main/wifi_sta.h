#ifndef WIFI_STA_H_
#define WIFI_STA_H_

#include "esp_netif.h"
#include "esp_wifi_types.h"
#include "freertos/FreeRTOS.h"
#include "blue_led.h"

//wi-fi application settings
#define EXAMPLE_ESP_WIFI_SSID      "TP-Link_DD08"
#define EXAMPLE_ESP_WIFI_PASS      "99349790"
#define EXAMPLE_ESP_MAXIMUM_RETRY  20U


/* The event group allows multiple bits for each event, but we only care about two events:
 * - we are connected to the AP with an IP
 * - we failed to connect after the maximum amount of retries */
#define WIFI_CONNECTED_BIT BIT0
#define WIFI_FAIL_BIT      BIT1

void wifi_init_sta(void);

#endif