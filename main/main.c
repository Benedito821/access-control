#include <esp_log.h>
#include <inttypes.h>
#include "rc522.h"
#include "blue_led.h"
#include "nvs_flash.h"
#include "driver/uart.h"
#include "wifi_sta.h"

static rc522_handle_t scanner;

void app_main()
{
    rc522_config_t config = {
        .spi.host = VSPI_HOST,
        .spi.miso_gpio = 12,
        .spi.mosi_gpio = 13,
        .spi.sck_gpio = 14,
        .spi.sda_gpio = 27,
    };

    rc522_create(&config, &scanner);
    rc522_register_events(scanner, RC522_EVENT_ANY, rc522_handler, NULL);
    rc522_start(scanner);

    //initialize NVS
    esp_err_t ret = nvs_flash_init();
    if(ret == ESP_ERR_NVS_NO_FREE_PAGES || ret == ESP_ERR_NVS_NEW_VERSION_FOUND)
    {
        ESP_ERROR_CHECK(nvs_flash_erase());
        ret = nvs_flash_init();
    }
    ESP_ERROR_CHECK(ret);
    // configure the blue LED
    blue_led_pwm_init();
    //Start the Wifi
    wifi_init_sta();
}