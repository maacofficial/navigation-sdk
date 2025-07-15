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

// Function to check if we're in New Architecture mode
const isNewArchitectureAvailable = (): boolean => {
  try {
    // Check for Fabric/TurboModules availability
    const TurboModuleRegistry = require('react-native/Libraries/TurboModule/TurboModuleRegistry');
    const RCTNewArchitectureValidation = require('react-native/Libraries/NewArchitecture/RCTNewArchitectureValidation');

    // Also check if we're in bridgeless mode (New Architecture)
    const isBridgeless = (global as any).RN$Bridgeless === true;

    console.log('🔍 Architecture Detection Debug:');
    console.log(
      '  - TurboModuleRegistry available:',
      TurboModuleRegistry != null
    );
    console.log(
      '  - RCTNewArchitectureValidation available:',
      RCTNewArchitectureValidation != null
    );
    console.log('  - Bridgeless mode:', isBridgeless);

    return (
      (TurboModuleRegistry != null && RCTNewArchitectureValidation != null) ||
      isBridgeless
    );
  } catch (error) {
    console.log('🔍 Architecture detection error:', String(error));
    return false;
  }
};

// Global component registry to prevent dual registration
const componentRegistry = new Map<string, any>();

try {
  // Check architecture mode first
  isNewArchitecture = isNewArchitectureAvailable();

  console.log(
    '🏗️ Architecture mode:',
    isNewArchitecture ? 'New Architecture' : 'Legacy Bridge'
  );

  // Check if we already have this component cached
  if (componentRegistry.has('RCTNavView')) {
    RCTNavView = componentRegistry.get('RCTNavView');
    componentLoadingStrategy = 'cached-component';
    console.log('✅ Using cached RCTNavView component');
  } else {
    if (isNewArchitecture) {
      // For New Architecture, try codegen first
      try {
        // Import the codegen component directly
        const RCTNavViewCodegen =
          require('../specs/RCTNavViewNativeComponent').default;

        console.log(`🔍 Codegen component type: ${typeof RCTNavViewCodegen}`);

        if (typeof RCTNavViewCodegen === 'function') {
          // This is the ideal case - codegen returned a proper React component
          RCTNavView = RCTNavViewCodegen;
          componentLoadingStrategy = 'new-architecture-codegen';
          console.log('✅ Using New Architecture codegen component');
          componentRegistry.set('RCTNavView', RCTNavView);
        } else {
          throw new Error(
            `Unexpected codegen type: ${typeof RCTNavViewCodegen}`
          );
        }
      } catch (codegenError) {
        console.log('❌ Codegen approach failed:', String(codegenError));

        // For Bridgeless mode, try requireNativeComponent with RCTNavView name
        try {
          console.log('🔄 Trying Bridgeless component loading with RCTNavView');
          RCTNavView = requireNativeComponent('RCTNavView');
          componentLoadingStrategy = 'bridgeless-direct';
          console.log('✅ Successfully loaded Bridgeless RCTNavView component');
          componentRegistry.set('RCTNavView', RCTNavView);
        } catch (bridgelessError) {
          console.log(
            '❌ Bridgeless approach failed:',
            String(bridgelessError)
          );
          // Fallback to legacy approach
          isNewArchitecture = false;
        }
      }
    }

    // If New Architecture failed or not available, use legacy approach
    if (!isNewArchitecture) {
      // For Legacy Bridge, try direct requireNativeComponent
      try {
        console.log('🏗️ Attempting legacy Bridge component loading');

        // iOS exports as 'RCTNavView' by default in Legacy Bridge
        const componentName =
          Platform.OS === 'ios' ? 'RCTNavView' : 'NavViewManager';
        RCTNavView = requireNativeComponent(componentName);
        componentLoadingStrategy = 'legacy-bridge';
        console.log(`✅ Successfully loaded legacy ${componentName} component`);
        componentRegistry.set('RCTNavView', RCTNavView);
      } catch (legacyError) {
        console.log(
          '❌ Legacy requireNativeComponent failed:',
          String(legacyError)
        );

        // Create fallback component
        createLegacyFallbackComponent();
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

/**
 * Helper function to create legacy fallback component
 */
function createLegacyFallbackComponent() {
  const React = require('react');
  const { View, Text } = require('react-native');

  RCTNavView = React.forwardRef((props: any, ref: any) => {
    console.warn(
      'Using fallback component - native implementation may not be available'
    );
    return React.createElement(
      View,
      {
        ...props,
        ref,
        style: [
          props.style,
          {
            backgroundColor: '#f0f0f0',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 200,
          },
        ],
      },
      React.createElement(Text, {}, 'Navigation View (Fallback)')
    );
  });

  componentLoadingStrategy = 'legacy-safe-fallback';
  console.log('✅ Using safe legacy fallback component');
  componentRegistry.set('RCTNavView', RCTNavView);
}

console.log('🎯 Final component loading strategy:', componentLoadingStrategy);

// Add startup debugging information
console.log('🔬 Navigation SDK Startup Debug Info:');
console.log('  📱 Platform:', Platform.OS);
console.log(
  '  🏗️ Architecture:',
  isNewArchitecture ? 'New Architecture (Fabric)' : 'Legacy Bridge'
);
console.log('  📦 Component Strategy:', componentLoadingStrategy);
console.log('  🎯 Component Type:', typeof RCTNavView);
console.log('  📊 Component Registry Size:', componentRegistry.size);

// Try to check if the native module is properly linked
try {
  const configName = Platform.OS === 'ios' ? 'RCTNavView' : 'NavViewManager';
  const config = UIManager.getViewManagerConfig(configName);
  if (config) {
    console.log(`  ✅ Native view config found for ${configName}`);
    console.log('  🔧 Available commands:', Object.keys(config.Commands || {}));
  } else {
    console.log(`  ⚠️ No native view config found for ${configName}`);
  }
} catch (error) {
  console.log('  ❌ Error checking native view config:', String(error));
}

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
    // iOS: In New Architecture use the actual component name, in Legacy use the manager name
    return 'RCTNavView';
  }
})();

// Also provide the alternative names for debugging
export const alternativeViewManagerNames = (() => {
  if (Platform.OS === 'android') {
    return ['NavViewManager'];
  } else {
    // iOS: Provide both names as alternatives
    return ['RCTNavViewManager', 'NavView'];
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
  const foundViewManagerName = viewManagerName;

  try {
    config = UIManager.getViewManagerConfig(viewManagerName);
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
