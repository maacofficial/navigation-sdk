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

# Check if addlicense is available
if ! command -v addlicense > /dev/null 2>&1; then
    echo "addlicense not found, skipping license check"
    echo "Install with: go install github.com/google/addlicense@latest"
    exit 0
fi

addlicense -f header_template.txt $@ \
        --ignore "**/Pods/**" \
        --ignore "**/node_modules/**" \
        --ignore "**/android/**/build/**" \
        --ignore "**/android/.gradle/**" \
        --ignore "**/android/.idea/**" \
        --ignore "**/ios/build/**" \
        --ignore "example/vendor/**" \
        --ignore "lib/**" \
        --ignore "coverage/**" \
        --ignore ".yarn/**" \
        --ignore ".github/ISSUE_TEMPLATE/**" \
        .
