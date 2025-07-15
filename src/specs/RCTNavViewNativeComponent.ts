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

import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { ViewProps } from 'react-native';
import type {
  DirectEventHandler,
  Double,
  Float,
  Int32,
  WithDefault,
} from 'react-native/Libraries/Types/CodegenTypes';

interface CameraPosition {
  latitude: Double;
  longitude: Double;
  zoom?: WithDefault<Float, 15.0>;
  bearing?: WithDefault<Float, 0.0>;
  tilt?: WithDefault<Float, 0.0>;
}

interface StylingOptions {
  primaryDayModeThemeColor?: string;
  secondaryDayModeThemeColor?: string;
  primaryNightModeThemeColor?: string;
  secondaryNightModeThemeColor?: string;
  headerDistanceRemainingTextColor?: string;
  headerTimeRemainingTextColor?: string;
  headerNextStepTextColor?: string;
  headerGuidanceRecommendationsTextColor?: string;
  headerInstructionsFirstRowTextColor?: string;
  headerInstructionsSecondRowTextColor?: string;
}

interface MapLocation {
  latitude: Double;
  longitude: Double;
}

interface MapViewCallbacks {
  onMapReady?: DirectEventHandler<{}>;
  onLocationChanged?: DirectEventHandler<{
    location: MapLocation;
    heading: Float;
  }>;
  onLocationButtonClicked?: DirectEventHandler<{}>;
  onRecenterButtonClicked?: DirectEventHandler<{}>;
  onMapClicked?: DirectEventHandler<{
    coordinate: MapLocation;
  }>;
  onMarkerClicked?: DirectEventHandler<{
    markerId: string;
    coordinate: MapLocation;
  }>;
  onPolylineClicked?: DirectEventHandler<{
    polylineId: string;
  }>;
  onPolygonClicked?: DirectEventHandler<{
    polygonId: string;
  }>;
  onCircleClicked?: DirectEventHandler<{
    circleId: string;
  }>;
  onMarkerDragStart?: DirectEventHandler<{
    markerId: string;
    coordinate: MapLocation;
  }>;
  onMarkerDrag?: DirectEventHandler<{
    markerId: string;
    coordinate: MapLocation;
  }>;
  onMarkerDragEnd?: DirectEventHandler<{
    markerId: string;
    coordinate: MapLocation;
  }>;
  onInfoWindowClicked?: DirectEventHandler<{
    markerId: string;
  }>;
  onInfoWindowLongClicked?: DirectEventHandler<{
    markerId: string;
  }>;
  onInfoWindowClosed?: DirectEventHandler<{
    markerId: string;
  }>;
  onCameraMoveStarted?: DirectEventHandler<{
    isGesture: boolean;
  }>;
  onCameraMove?: DirectEventHandler<{
    camera: CameraPosition;
  }>;
  onCameraIdle?: DirectEventHandler<{
    camera: CameraPosition;
  }>;
  onNavigationHeaderTouchEvent?: DirectEventHandler<{}>;
  onNavigationFooterTouchEvent?: DirectEventHandler<{}>;
}

export interface NativeProps extends ViewProps, MapViewCallbacks {
  // Camera properties
  initialCamera?: CameraPosition;

  // Map properties
  mapType?: WithDefault<Int32, 1>; // 1 = NORMAL, 2 = SATELLITE, 3 = TERRAIN, 4 = HYBRID
  myLocationEnabled?: WithDefault<boolean, false>;
  myLocationButtonEnabled?: WithDefault<boolean, true>;
  zoomControlsEnabled?: WithDefault<boolean, true>;
  zoomGesturesEnabled?: WithDefault<boolean, true>;
  scrollGesturesEnabled?: WithDefault<boolean, true>;
  tiltGesturesEnabled?: WithDefault<boolean, true>;
  rotateGesturesEnabled?: WithDefault<boolean, true>;
  scrollGesturesDuringRotateOrZoomEnabled?: WithDefault<boolean, true>;

  // Navigation UI properties
  navigationTripProgressBarEnabled?: WithDefault<boolean, true>;
  navigationHeaderEnabled?: WithDefault<boolean, true>;
  navigationFooterEnabled?: WithDefault<boolean, true>;
  recenterButtonEnabled?: WithDefault<boolean, true>;
  speedLimitIconEnabled?: WithDefault<boolean, true>;
  speedometerEnabled?: WithDefault<boolean, true>;
  trafficIncidentCardsEnabled?: WithDefault<boolean, true>;

  // Traffic
  trafficEnabled?: WithDefault<boolean, false>;

  // Styling
  stylingOptions?: StylingOptions;
  mapStyle?: string;

  // Header/Footer touch events
  navigationHeaderTouchEventsEnabled?: WithDefault<boolean, false>;
  navigationFooterTouchEventsEnabled?: WithDefault<boolean, false>;
}

// Export the component with error handling for dual registration
let RCTNavViewComponent: any;

try {
  RCTNavViewComponent = codegenNativeComponent<NativeProps>('RCTNavView');
} catch (error) {
  console.warn(
    'RCTNavView codegen registration issue (likely already registered):',
    String(error)
  );
  // In case of dual registration, export the component name as string
  // This will be handled by the viewManager.ts
  RCTNavViewComponent = 'RCTNavView';
}

export default RCTNavViewComponent;
