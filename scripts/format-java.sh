#!/bin/sh
# Copyright 2024 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Script to format or check formatting for Java files in /android and /example/android

# Check if google-java-format is available
if ! command -v google-java-format > /dev/null 2>&1; then
    echo "google-java-format not found, skipping Java formatting"
    echo "Install with: brew install google-java-format"
    exit 0
fi

# Only search in directories that exist
SEARCH_DIRS=""
if [ -d "android/src" ]; then
    SEARCH_DIRS="$SEARCH_DIRS android/src"
fi
if [ -d "example/android/app/src" ]; then
    SEARCH_DIRS="$SEARCH_DIRS example/android/app/src"
fi

if [ -z "$SEARCH_DIRS" ]; then
    echo "No Java directories found, skipping formatting"
    exit 0
fi

if [ "$1" = "--check" ]; then
    find $SEARCH_DIRS -name "*.java" | xargs google-java-format --dry-run --set-exit-if-changed
else
    find $SEARCH_DIRS -name "*.java" | xargs google-java-format -i
fi
