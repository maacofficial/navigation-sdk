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

import { UIManager, requireNativeComponent } from 'react-native';

// Fabric component imports - these will only work when New Architecture is enabled
let RCTNavViewFabric: any;
let RCTMapViewFabric: any;

try {
  RCTNavViewFabric = require('../specs/RCTNavViewNativeComponent').default;
} catch (e) {
  // Gracefully fall back to bridge component
  RCTNavViewFabric = null;
}

try {
  RCTMapViewFabric = require('../specs/RCTMapViewNativeComponent').default;
} catch (e) {
  RCTMapViewFabric = null;
}

// Bridge components (legacy)
const RCTNavViewBridge = requireNativeComponent('RCTNavView');
const RCTMapViewBridge = requireNativeComponent('RCTMapView');

// Export the appropriate component based on architecture
export const RCTNavView = RCTNavViewFabric ?? RCTNavViewBridge;
export const RCTMapView = RCTMapViewFabric ?? RCTMapViewBridge;

// UIManager commands for legacy architecture
export const NavViewManagerCommands = UIManager.getViewManagerConfig('RCTNavView')?.Commands;
export const MapViewManagerCommands = UIManager.getViewManagerConfig('RCTMapView')?.Commands;
