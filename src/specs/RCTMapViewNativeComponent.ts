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
  WithDefault
} from 'react-native/Libraries/Types/CodegenTypes';

interface CameraPosition {
  latitude: Double;
  longitude: Double;
  zoom?: WithDefault<Float, 15.0>;
  bearing?: WithDefault<Float, 0.0>;
  tilt?: WithDefault<Float, 0.0>;
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
  onMapClicked?: DirectEventHandler<{
    coordinate: MapLocation;
  }>;
  onMarkerClicked?: DirectEventHandler<{
    markerId: string;
    coordinate: MapLocation;
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
  
  // Traffic
  trafficEnabled?: WithDefault<boolean, false>;
  
  // Styling
  mapStyle?: string;
}

export default codegenNativeComponent<NativeProps>('RCTMapView');
