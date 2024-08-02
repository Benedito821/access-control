idf_component_register(SRCS "blue_led.c" 
                            "main.c"
                            "wifi_sta.c"
                            "http_client.c"
                    INCLUDE_DIRS "."
                    EMBED_TXTFILES certs/howsmyssl_com_root_cert.pem  certs/postman_root_cert.pem)