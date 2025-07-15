/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { requireNativeComponent } from 'react-native';
import type { ViewStyle } from 'react-native';
import type { NativeProps } from './RCTNavViewNativeComponent';

// This is a direct native component import for New Architecture
// It bypasses the codegen when that doesn't work properly
export interface RCTNavViewProps extends NativeProps {
  style?: ViewStyle;
}

export default requireNativeComponent<RCTNavViewProps>('RCTNavView');
