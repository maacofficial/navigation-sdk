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

// Function to check if we're in New Architecture mode
const isNewArchitectureAvailable = (): boolean => {
  try {
    const TurboModuleRegistry = require('react-native/Libraries/TurboModule/TurboModuleRegistry');
    return TurboModuleRegistry != null;
  } catch {
    return false;
  }
};

const isNewArchitecture = isNewArchitectureAvailable();

// TurboModule imports - these will only work when New Architecture is enabled
let NavModuleTurbo: any = null;
let NavAutoModuleTurbo: any = null;
let NavViewModuleTurbo: any = null;
let NavEventDispatcherTurbo: any = null;
let NavAutoEventDispatcherTurbo: any = null;

if (isNewArchitecture) {
  try {
    NavModuleTurbo = require('../specs/NativeNavModule').default;
  } catch (e) {
    console.log('NavModuleTurbo not available, falling back to bridge module');
  }

  try {
    NavAutoModuleTurbo = require('../specs/NativeNavAutoModule').default;
  } catch (e) {
    console.log(
      'NavAutoModuleTurbo not available, falling back to bridge module'
    );
  }

  try {
    NavViewModuleTurbo = require('../specs/NativeNavViewModule').default;
  } catch (e) {
    console.log(
      'NavViewModuleTurbo not available, falling back to bridge module'
    );
  }

  try {
    NavEventDispatcherTurbo = require('../specs/NativeEventDispatcher').default;
  } catch (e) {
    console.log(
      'NavEventDispatcherTurbo not available, falling back to bridge module'
    );
  }

  try {
    NavAutoEventDispatcherTurbo =
      require('../specs/NativeAutoEventDispatcher').default;
  } catch (e) {
    console.log(
      'NavAutoEventDispatcherTurbo not available, falling back to bridge module'
    );
  }
}

// Export the appropriate module based on architecture
export const NavModule = NavModuleTurbo ?? NativeModules.NavModule;
export const NavAutoModule = NavAutoModuleTurbo ?? NativeModules.NavAutoModule;
export const NavViewModule = NavViewModuleTurbo ?? NativeModules.NavViewModule;

// Event dispatchers with better fallback handling
export const NavEventDispatcher = (() => {
  const dispatcher =
    NavEventDispatcherTurbo ?? NativeModules.NavEventDispatcher;
  if (!dispatcher) {
    console.warn(
      'NavEventDispatcher is not available - navigation events may not work properly'
    );
  }
  return dispatcher;
})();

export const NavAutoEventDispatcher = (() => {
  const dispatcher =
    NavAutoEventDispatcherTurbo ?? NativeModules.NavAutoEventDispatcher;
  if (!dispatcher) {
    console.warn(
      'NavAutoEventDispatcher is not available - auto navigation events may not work properly'
    );
  }
  return dispatcher;
})();
