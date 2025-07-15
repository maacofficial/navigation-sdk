/**
 * Copyright 2023 Google LLC
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

import {
  Platform,
  UIManager,
  requireNativeComponent,
  type HostComponent,
  type ViewProps,
} from 'react-native';
import type { DirectEventHandler } from 'react-native/Libraries/Types/CodegenTypes';
import type { LatLng } from '.';
import type { Circle, GroundOverlay, Marker, Polygon, Polyline } from '../maps';

// Safely import New Architecture component with fallback
let RCTNavView: any;
let isNewArchitecture = false;

try {
  // Check if we're in New Architecture mode
  const TurboModuleRegistry = require('react-native/Libraries/TurboModule/TurboModuleRegistry');
  isNewArchitecture = TurboModuleRegistry != null;

  if (isNewArchitecture) {
    // Try to use New Architecture component
    try {
      const {
        RCTNavView: ImportedRCTNavView,
      } = require('../specs/NativeComponents');
      RCTNavView = ImportedRCTNavView;
      console.log('Using New Architecture RCTNavView component');
    } catch (newArchError) {
      console.log(
        'New Architecture component import failed, falling back to legacy'
      );
      isNewArchitecture = false;
    }
  }

  if (!isNewArchitecture) {
    // Use legacy component
    RCTNavView = requireNativeComponent('RCTNavView');
    console.log('Using legacy RCTNavView component');
  }
} catch (error) {
  // Final fallback to legacy
  console.log('Fallback to legacy RCTNavView component due to error:', error);
  RCTNavView = requireNativeComponent('RCTNavView');
  isNewArchitecture = false;
}

// NavViewManager is responsible for managing both the regular map fragment as well as the navigation map view fragment.
// Use different view manager names for different architectures to avoid registration conflicts
export const viewManagerName = (() => {
  if (Platform.OS === 'android') {
    return 'NavViewManager';
  } else {
    // iOS: For legacy bridge, the view manager is registered as 'RCTNavViewManager'
    // For New Architecture (Fabric), it should use the component name from specs
    return isNewArchitecture ? 'RCTNavView' : 'RCTNavViewManager';
  }
})();

// Also provide the alternative names for debugging
export const alternativeViewManagerNames = (() => {
  if (Platform.OS === 'android') {
    return ['NavViewManager'];
  } else {
    return ['RCTNavViewManager', 'RCTNavView', 'NavView'];
  }
})();

export const sendCommand = (
  viewId: number,
  command: number | undefined,
  args?: any[]
) => {
  if (command === undefined) {
    console.error(
      "Command not found, please make sure you're using the right method. Available commands:",
      Object.keys(commands)
    );
    return;
  }

  try {
    UIManager.dispatchViewManagerCommand(
      viewId,
      Platform.OS === 'android' ? command.toString() : command,
      args
    );
  } catch (exception) {
    console.error('Error dispatching view manager command:', exception);
    console.error('Command:', command, 'Args:', args, 'ViewId:', viewId);
  }
};

export const commands = (() => {
  // Try to get commands from the primary view manager name
  let config = null;
  let foundViewManagerName = viewManagerName;

  try {
    config = UIManager.getViewManagerConfig(viewManagerName);

    // If primary name doesn't work, try alternatives
    if (!config || !config.Commands) {
      for (const altName of alternativeViewManagerNames) {
        try {
          const altConfig = UIManager.getViewManagerConfig(altName);
          if (altConfig && altConfig.Commands) {
            config = altConfig;
            foundViewManagerName = altName;
            console.log(
              `Using view manager: ${altName} instead of ${viewManagerName}`
            );
            break;
          }
        } catch (altError) {
          // Continue trying other names
        }
      }
    }

    if (config && config.Commands) {
      console.log(`Successfully loaded commands from ${foundViewManagerName}`);
      return config.Commands;
    } else {
      console.warn(
        `ViewManager config not found for ${viewManagerName} or alternatives, using fallback commands`
      );
      // Fallback commands based on known command structure
      return {
        createFragment: 1,
        setCameraPosition: 2,
        animateCamera: 3,
        addMarker: 4,
        removeMarker: 5,
        addCircle: 6,
        removeCircle: 7,
        addPolyline: 8,
        removePolyline: 9,
        addPolygon: 10,
        removePolygon: 11,
        setMapType: 12,
        setTrafficEnabled: 13,
        setPadding: 14,
        getMyLocation: 15,
        getCameraPosition: 16,
        getUiSettings: 17,
        setUiSettings: 18,
        // Navigation specific commands
        followMyLocation: 19,
        setNavigationUIEnabled: 20,
        setRecenterButtonEnabled: 21,
        setSpeedometerEnabled: 22,
        setSpeedLimitIconEnabled: 23,
        setHeaderEnabled: 24,
        setFooterEnabled: 25,
        showRouteOverview: 26,
        setTripProgressBarEnabled: 27,
        setTrafficIncidentsCardEnabled: 28,
      };
    }
  } catch (error) {
    console.warn(
      `Error getting ViewManager config for ${viewManagerName}:`,
      error
    );
    // Return fallback commands
    return {
      createFragment: 1,
      setCameraPosition: 2,
      animateCamera: 3,
      addMarker: 4,
      removeMarker: 5,
      addCircle: 6,
      removeCircle: 7,
      addPolyline: 8,
      removePolyline: 9,
      addPolygon: 10,
      removePolygon: 11,
      setMapType: 12,
      setTrafficEnabled: 13,
      setPadding: 14,
      getMyLocation: 15,
      getCameraPosition: 16,
      getUiSettings: 17,
      setUiSettings: 18,
      // Navigation specific commands
      followMyLocation: 19,
      setNavigationUIEnabled: 20,
      setRecenterButtonEnabled: 21,
      setSpeedometerEnabled: 22,
      setSpeedLimitIconEnabled: 23,
      setHeaderEnabled: 24,
      setFooterEnabled: 25,
      showRouteOverview: 26,
      setTripProgressBarEnabled: 27,
      setTrafficIncidentsCardEnabled: 28,
    };
  }
})();

export interface NativeNavViewProps extends ViewProps {
  flex?: number | undefined;
  onMapReady?: DirectEventHandler<null>;
  onMapClick?: DirectEventHandler<LatLng>;
  onMarkerClick?: DirectEventHandler<Marker>;
  onPolylineClick?: DirectEventHandler<Polyline>;
  onPolygonClick?: DirectEventHandler<Polygon>;
  onCircleClick?: DirectEventHandler<Circle>;
  onGroundOverlayClick?: DirectEventHandler<GroundOverlay>;
  onMarkerInfoWindowTapped?: DirectEventHandler<Marker>;
  onRecenterButtonClick?: DirectEventHandler<null>;
}

type NativeNavViewManagerComponentType = HostComponent<NativeNavViewProps>;
export const NavViewManager = RCTNavView as NativeNavViewManagerComponentType;

// Export architecture detection for use in other modules
export { isNewArchitecture };

// Debug function to check view manager registration
export const debugViewManager = () => {
  console.log('View Manager Debug Info:');
  console.log('Platform:', Platform.OS);
  console.log(
    'Architecture:',
    isNewArchitecture ? 'New Architecture (Fabric)' : 'Legacy Bridge'
  );
  console.log('View Manager Name:', viewManagerName);
  console.log('RCTNavView Component Type:', typeof RCTNavView);

  try {
    const config = UIManager.getViewManagerConfig(viewManagerName);
    console.log('View Manager Config:', config);

    if (config) {
      console.log('Available Commands:', config.Commands);
      console.log('Config keys:', Object.keys(config));
    } else {
      console.log('View Manager Config is null/undefined');

      // Try alternative view manager names
      console.log('Trying alternative view manager names...');

      for (const altName of alternativeViewManagerNames) {
        try {
          const altConfig = UIManager.getViewManagerConfig(altName);
          if (altConfig) {
            console.log(`Found config for ${altName}:`, altConfig);
          } else {
            console.log(`No config found for ${altName}`);
          }
        } catch (altError) {
          console.log(`Error getting config for ${altName}:`, altError);
        }
      }
    }
  } catch (error) {
    console.log('Error getting view manager config:', error);
  }

  // List some UIManager properties for debugging
  console.log(
    'UIManager has getViewManagerConfig:',
    typeof UIManager.getViewManagerConfig === 'function'
  );
  console.log('UIManager properties:', Object.keys(UIManager).slice(0, 10)); // First 10 keys
};
