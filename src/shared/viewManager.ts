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
let componentLoadingStrategy = 'unknown';

// Function to check if a view manager is already registered
const isViewManagerRegistered = (name: string): boolean => {
  if (isNewArchitectureAvailable()) {
    // In New Architecture, Fabric components are registered differently
    // We can't rely on UIManager.getViewManagerConfig for Fabric components
    console.log(`🔍 Checking Fabric component availability for ${name}`);
    return true; // Assume available if we're in New Architecture
  } else {
    // Legacy Bridge architecture
    try {
      const config = UIManager.getViewManagerConfig(name);
      return config != null;
    } catch {
      return false;
    }
  }
};

// Function to check if we're in New Architecture mode
const isNewArchitectureAvailable = (): boolean => {
  try {
    const TurboModuleRegistry = require('react-native/Libraries/TurboModule/TurboModuleRegistry');
    return TurboModuleRegistry != null;
  } catch {
    return false;
  }
};

// Global component registry to prevent dual registration
const componentRegistry = new Map<string, any>();

try {
  // Check architecture mode first
  const isNewArchitectureMode = isNewArchitectureAvailable();

  // In New Architecture, Fabric components don't register with UIManager
  // So we need different detection logic
  let registeredManagers;

  if (isNewArchitectureMode) {
    // In New Architecture, we assume Fabric components are available if specs exist
    registeredManagers = {
      RCTNavView: false, // Fabric components don't show up in UIManager
      RCTNavViewManager: false,
      NavViewManager: false,
      NewArchitecture: true,
      FabricComponentsAvailable: true, // We'll verify this through successful imports
    };
  } else {
    // Legacy architecture - check actual UIManager registrations
    registeredManagers = {
      RCTNavView: isViewManagerRegistered('RCTNavView'),
      RCTNavViewManager: isViewManagerRegistered('RCTNavViewManager'),
      NavViewManager: isViewManagerRegistered('NavViewManager'),
      NewArchitecture: false,
      FabricComponentsAvailable: false,
    };
  }

  console.log('📋 Registered view managers:', registeredManagers);

  // Check if we already have this component cached
  if (componentRegistry.has('RCTNavView')) {
    RCTNavView = componentRegistry.get('RCTNavView');
    componentLoadingStrategy = 'cached-component';
    console.log('✅ Using cached RCTNavView component');
  } else {
    // Use the architecture detection we already did
    isNewArchitecture = isNewArchitectureMode;

    console.log(
      '🏗️ Architecture mode:',
      isNewArchitecture ? 'New Architecture' : 'Legacy Bridge'
    );

    if (isNewArchitecture) {
      // For New Architecture, we need to be very careful about dual registration
      // First, try to get the codegen component directly without causing registration
      try {
        const {
          default: RCTNavViewCodegen,
        } = require('../specs/RCTNavViewNativeComponent');

        // Check if the codegen component is valid
        if (typeof RCTNavViewCodegen === 'function') {
          RCTNavView = RCTNavViewCodegen;
          componentLoadingStrategy = 'new-architecture-codegen';
          console.log('✅ Using New Architecture codegen component');
          componentRegistry.set('RCTNavView', RCTNavView);
        } else if (typeof RCTNavViewCodegen === 'string') {
          // If it's a string, it might be a component name reference
          // This can happen with some codegen configurations
          console.log(`🔍 Codegen returned string: ${RCTNavViewCodegen}`);

          // Try to get the actual component using the string reference
          try {
            // In New Architecture, components might be referenced by string initially
            // We can try to resolve this through React Native's component registry
            const NativeComponentRegistry = require('react-native/Libraries/NativeComponent/NativeComponentRegistry');

            // Try to get existing registration or create a minimal one
            RCTNavView = NativeComponentRegistry.get(RCTNavViewCodegen, () => ({
              uiViewClassName: RCTNavViewCodegen,
              validAttributes: {
                // Add minimal required attributes for navigation component
                flex: true,
                style: true,
              },
              directEventTypes: {},
              bubblingEventTypes: {},
            }));

            if (typeof RCTNavView === 'function') {
              componentLoadingStrategy = 'new-architecture-registry';
              console.log('✅ Using New Architecture component via registry');
              componentRegistry.set('RCTNavView', RCTNavView);
            } else {
              throw new Error('Registry returned non-function component');
            }
          } catch (registryError) {
            console.log('❌ Registry approach failed:', String(registryError));
            throw registryError;
          }
        } else {
          throw new Error(
            `Unexpected codegen type: ${typeof RCTNavViewCodegen}`
          );
        }
      } catch (codegenError) {
        console.log('❌ Codegen approach failed:', String(codegenError));

        // If codegen fails, check if the component might already be registered
        try {
          // Check React Native's internal component registry first
          const NativeComponentRegistry = require('react-native/Libraries/NativeComponent/NativeComponentRegistry');

          // Try to get an existing registration
          const existingComponent = NativeComponentRegistry.get(
            'RCTNavView',
            () => null
          );

          if (existingComponent && typeof existingComponent === 'function') {
            RCTNavView = existingComponent;
            componentLoadingStrategy = 'new-architecture-existing';
            console.log(
              '✅ Using existing New Architecture component registration'
            );
            componentRegistry.set('RCTNavView', RCTNavView);
          } else {
            throw new Error('No existing component found');
          }
        } catch (existingError) {
          console.log(
            '❌ Existing component check failed:',
            String(existingError)
          );
          isNewArchitecture = false;
        }
      }
    }

    // If New Architecture failed or not available, use legacy approach
    if (!isNewArchitecture) {
      // For Legacy Bridge, we need to be careful about dual registration too
      // First check if the component might already be registered
      try {
        // Try to get existing component from React Native's registry
        const NativeComponentRegistry = require('react-native/Libraries/NativeComponent/NativeComponentRegistry');

        // Check if component already exists
        const existingComponent = NativeComponentRegistry.get(
          'RCTNavView',
          () => null
        );

        if (existingComponent && typeof existingComponent === 'function') {
          RCTNavView = existingComponent;
          componentLoadingStrategy = 'legacy-existing';
          console.log('✅ Using existing legacy component registration');
          componentRegistry.set('RCTNavView', RCTNavView);
        } else {
          // No existing component, safe to register new one
          try {
            RCTNavView = requireNativeComponent('RCTNavView');
            componentLoadingStrategy = 'legacy-bridge';
            console.log('✅ Registered new legacy RCTNavView component');
            componentRegistry.set('RCTNavView', RCTNavView);
          } catch (legacyError) {
            console.log(
              '❌ Legacy requireNativeComponent failed:',
              String(legacyError)
            );

            // If requireNativeComponent fails, try to create a safe registry entry
            try {
              RCTNavView = NativeComponentRegistry.get('RCTNavView', () => ({
                uiViewClassName: 'RCTNavView',
                validAttributes: {
                  flex: true,
                  style: true,
                },
                directEventTypes: {},
                bubblingEventTypes: {},
              }));
              componentLoadingStrategy = 'legacy-registry-fallback';
              console.log('✅ Using legacy registry fallback');
              componentRegistry.set('RCTNavView', RCTNavView);
            } catch (fallbackError) {
              console.error(
                '❌ All legacy approaches failed:',
                String(fallbackError)
              );
              // Last resort: create a dummy component
              RCTNavView = () => null;
              componentLoadingStrategy = 'fallback-dummy';
              componentRegistry.set('RCTNavView', RCTNavView);
            }
          }
        }
      } catch (registryError) {
        console.log('❌ Registry check failed:', String(registryError));
        // If registry check fails, try direct requireNativeComponent
        try {
          RCTNavView = requireNativeComponent('RCTNavView');
          componentLoadingStrategy = 'legacy-direct';
          console.log('✅ Using direct legacy component registration');
          componentRegistry.set('RCTNavView', RCTNavView);
        } catch (directError) {
          console.error(
            '❌ Direct legacy registration failed:',
            String(directError)
          );
          // Final fallback
          RCTNavView = () => null;
          componentLoadingStrategy = 'fallback-dummy';
          componentRegistry.set('RCTNavView', RCTNavView);
        }
      }
    }
  }
} catch (error) {
  console.error('❌ Critical error in component loading:', error);
  isNewArchitecture = false;
  componentLoadingStrategy = 'error-fallback';

  // Last resort fallback
  RCTNavView = () => null;
  componentRegistry.set('RCTNavView', RCTNavView);
}

console.log('🎯 Final component loading strategy:', componentLoadingStrategy);

// Add specific debugging for New Architecture component issues
if (
  isNewArchitecture &&
  componentLoadingStrategy.includes('new-architecture')
) {
  console.log('🔍 New Architecture Component Debug:');
  console.log('  - RCTNavView type:', typeof RCTNavView);
  console.log(
    '  - RCTNavView constructor name:',
    RCTNavView?.constructor?.name
  );
  console.log('  - Component loaded successfully for Fabric rendering');

  // Check if the component is properly bound to the native implementation
  if (typeof RCTNavView === 'function') {
    console.log('  - ✅ Component is a valid React component function');
  } else {
    console.log(
      '  - ❌ Component is not a function, this may cause rendering issues'
    );
  }
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
  // In New Architecture (Fabric), commands work differently
  if (isNewArchitecture) {
    console.log('🔧 Using New Architecture command handling');
    // For New Architecture, we rely on the Fabric component to handle commands
    // Commands are defined in the component spec and handled by the native component view
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

  // Legacy Bridge: Try to get commands from the primary view manager name
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
export { isNewArchitecture, componentLoadingStrategy };

// Debug function to check view manager registration
export const debugViewManager = () => {
  console.log('View Manager Debug Info:');
  console.log('Platform:', Platform.OS);
  console.log(
    'Architecture:',
    isNewArchitecture ? 'New Architecture (Fabric)' : 'Legacy Bridge'
  );
  console.log('Component Loading Strategy:', componentLoadingStrategy);
  console.log('View Manager Name:', viewManagerName);
  console.log('RCTNavView Component Type:', typeof RCTNavView);

  // Check what view managers are currently registered
  const checkRegistrations = [
    'RCTNavView',
    'RCTNavViewManager',
    'NavViewManager',
  ];
  console.log('Current View Manager Registrations:');
  checkRegistrations.forEach(name => {
    try {
      const config = UIManager.getViewManagerConfig(name);
      console.log(`  ${name}: ${config ? 'REGISTERED' : 'NOT_REGISTERED'}`);
    } catch (error) {
      console.log(`  ${name}: ERROR - ${String(error)}`);
    }
  });

  try {
    const config = UIManager.getViewManagerConfig(viewManagerName);
    console.log('Primary View Manager Config:', config);

    if (config) {
      console.log('Available Commands:', config.Commands);
      console.log('Config keys:', Object.keys(config));
    } else {
      console.log('Primary View Manager Config is null/undefined');

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
