# The following lines of boilerplate have to be in your project's
# CMakeLists in this exact order for cmake to work correctly
cmake_minimum_required(VERSION 3.22)

if(NOT DEFINED ENV{IDF_PATH})
    set(ENV{IDF_PATH} "/home/YOUR_USER/esp/esp-idf-v5")
endif()

include($ENV{IDF_PATH}/tools/cmake/project.cmake)

idf_build_set_property(MINIMAL_BUILD ON)
set(EXTRA_COMPONENT_DIRS rc522 led wifi_sta http_client common)
project(access-control)
