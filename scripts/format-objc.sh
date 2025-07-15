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

# Script to format or check formatting for Objective-C files in /ios and /example/ios

# Check if clang-format is available
if ! command -v clang-format > /dev/null 2>&1; then
    echo "clang-format not found, skipping Objective-C formatting"
    echo "Install with: brew install clang-format"
    exit 0
fi

# Only search in directories that exist
SEARCH_DIRS=""
if [ -d "ios" ]; then
    SEARCH_DIRS="$SEARCH_DIRS ios"
fi
if [ -d "example/ios/SampleApp" ]; then
    SEARCH_DIRS="$SEARCH_DIRS example/ios/SampleApp"
fi

if [ -z "$SEARCH_DIRS" ]; then
    echo "No Objective-C directories found, skipping formatting"
    exit 0
fi

if [ "$1" = "--check" ]; then
    find $SEARCH_DIRS -name "*.m" -o -name "*.h" | xargs clang-format -style=Google --dry-run -Werror
else
    find $SEARCH_DIRS -name "*.m" -o -name "*.h" | xargs clang-format -style=Google -i
fi
