idf_component_register(SRCS "http_client.c"
                       INCLUDE_DIRS "."
                       REQUIRES common esp_event esp_netif esp_http_client mbedtls esp-tls json led
                       EMBED_TXTFILES certs/howsmyssl_com_root_cert.pem certs/postman_root_cert.pem
                       )