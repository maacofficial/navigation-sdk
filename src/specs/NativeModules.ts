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

import { NativeModules } from 'react-native';

// TurboModule imports - these will only work when New Architecture is enabled
let NavModuleTurbo: any;
let NavAutoModuleTurbo: any;
let NavViewModuleTurbo: any;
let NavEventDispatcherTurbo: any;
let NavAutoEventDispatcherTurbo: any;

try {
  NavModuleTurbo = require('../specs/NativeNavModule').default;
} catch (e) {
  // Gracefully fall back to bridge module
  NavModuleTurbo = null;
}

try {
  NavAutoModuleTurbo = require('../specs/NativeNavAutoModule').default;
} catch (e) {
  NavAutoModuleTurbo = null;
}

try {
  NavViewModuleTurbo = require('../specs/NativeNavViewModule').default;
} catch (e) {
  NavViewModuleTurbo = null;
}

try {
  NavEventDispatcherTurbo = require('../specs/NativeEventDispatcher').default;
} catch (e) {
  NavEventDispatcherTurbo = null;
}

try {
  NavAutoEventDispatcherTurbo =
    require('../specs/NativeAutoEventDispatcher').default;
} catch (e) {
  NavAutoEventDispatcherTurbo = null;
}

// Export the appropriate module based on architecture
export const NavModule = NavModuleTurbo ?? NativeModules.NavModule;
export const NavAutoModule = NavAutoModuleTurbo ?? NativeModules.NavAutoModule;
export const NavViewModule = NavViewModuleTurbo ?? NativeModules.NavViewModule;

// Event dispatchers with TurboModule fallback
export const NavEventDispatcher =
  NavEventDispatcherTurbo ?? NativeModules.NavEventDispatcher ?? null;
export const NavAutoEventDispatcher =
  NavAutoEventDispatcherTurbo ?? NativeModules.NavAutoEventDispatcher ?? null;

// Log warnings if event dispatchers are not available
if (!NavEventDispatcher) {
  console.warn(
    'NavEventDispatcher is not available - navigation events may not work properly'
  );
}

if (!NavAutoEventDispatcher) {
  console.warn(
    'NavAutoEventDispatcher is not available - auto navigation events may not work properly'
  );
}
