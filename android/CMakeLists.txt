# Copyright 2024 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

cmake_minimum_required(VERSION 3.13)
set(CMAKE_VERBOSE_MAKEFILE on)

add_compile_options(
  -fexceptions
  -frtti
  -std=c++17
  -Wall
  -Wpedantic
  -Wno-gnu-zero-variadic-macro-arguments
)

file(GLOB_RECURSE SOURCES_COMMON CONFIGURE_DEPENDS
  "*.cpp"
)

# Build the react-native-navigation-sdk library
add_library(
  react-native-navigation-sdk
  SHARED
  ${SOURCES_COMMON}
)

# Includes
target_include_directories(
  react-native-navigation-sdk
  PRIVATE
  ../cpp
)

# find fbjni package
find_package(fbjni REQUIRED CONFIG)

# find ReactAndroid package
find_package(ReactAndroid REQUIRED CONFIG)

# link to shared libraries
target_link_libraries(
  react-native-navigation-sdk
  ReactAndroid::jsi
  ReactAndroid::reactnativejni
  ReactAndroid::react_nativemodule_core
  ReactAndroid::turbomodulejsijni
  fbjni::fbjni
  android
  log
)
