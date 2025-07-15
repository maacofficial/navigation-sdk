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

// Global component registry to prevent dual registration
const componentRegistryNativeComponents = new Map<string, any>();

// Function to check if a view manager is already registered
const isViewManagerRegistered = (name: string): boolean => {
  try {
    const config = UIManager.getViewManagerConfig(name);
    return config != null;
  } catch {
    return false;
  }
};

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

// Bridge components (legacy) with dual registration prevention
let RCTNavViewBridge: any;
let RCTMapViewBridge: any;

// Only attempt bridge registration if Fabric components are not available
if (!RCTNavViewFabric) {
  // Safe component registration for RCTNavView
  if (componentRegistryNativeComponents.has('RCTNavView')) {
    RCTNavViewBridge = componentRegistryNativeComponents.get('RCTNavView');
    console.log('🔄 Using cached RCTNavView from NativeComponents');
  } else if (isViewManagerRegistered('RCTNavView')) {
    console.log(
      '⚠️ RCTNavView already registered elsewhere, skipping duplicate registration in NativeComponents'
    );
    // Create a minimal fallback that won't conflict
    RCTNavViewBridge = () => null;
    componentRegistryNativeComponents.set('RCTNavView', RCTNavViewBridge);
  } else {
    try {
      RCTNavViewBridge = requireNativeComponent('RCTNavView');
      componentRegistryNativeComponents.set('RCTNavView', RCTNavViewBridge);
      console.log('✅ Registered RCTNavView from NativeComponents');
    } catch (error) {
      console.log(
        '❌ Failed to register RCTNavView in NativeComponents:',
        String(error)
      );
      RCTNavViewBridge = () => null;
      componentRegistryNativeComponents.set('RCTNavView', RCTNavViewBridge);
    }
  }
} else {
  console.log(
    '✅ Fabric RCTNavView available, skipping bridge registration in NativeComponents'
  );
  RCTNavViewBridge = () => null; // Dummy fallback
}

// Only attempt bridge registration if Fabric components are not available
if (!RCTMapViewFabric) {
  // Safe component registration for RCTMapView
  if (componentRegistryNativeComponents.has('RCTMapView')) {
    RCTMapViewBridge = componentRegistryNativeComponents.get('RCTMapView');
  } else if (isViewManagerRegistered('RCTMapView')) {
    console.log(
      '⚠️ RCTMapView already registered elsewhere, skipping duplicate registration in NativeComponents'
    );
    RCTMapViewBridge = () => null;
    componentRegistryNativeComponents.set('RCTMapView', RCTMapViewBridge);
  } else {
    try {
      RCTMapViewBridge = requireNativeComponent('RCTMapView');
      componentRegistryNativeComponents.set('RCTMapView', RCTMapViewBridge);
      console.log('✅ Registered RCTMapView from NativeComponents');
    } catch (error) {
      console.log(
        '❌ Failed to register RCTMapView in NativeComponents:',
        String(error)
      );
      RCTMapViewBridge = () => null;
      componentRegistryNativeComponents.set('RCTMapView', RCTMapViewBridge);
    }
  }
} else {
  console.log(
    '✅ Fabric RCTMapView available, skipping bridge registration in NativeComponents'
  );
  RCTMapViewBridge = () => null; // Dummy fallback
}

// Export the appropriate component based on architecture
export const RCTNavView = RCTNavViewFabric ?? RCTNavViewBridge;
export const RCTMapView = RCTMapViewFabric ?? RCTMapViewBridge;

// UIManager commands for legacy architecture
export const NavViewManagerCommands =
  UIManager.getViewManagerConfig('RCTNavView')?.Commands;
export const MapViewManagerCommands =
  UIManager.getViewManagerConfig('RCTMapView')?.Commands;
