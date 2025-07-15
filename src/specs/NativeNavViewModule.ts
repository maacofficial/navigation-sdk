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

import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  recenter(): Promise<void>;
  
  followMyLocation(perspective: number): Promise<void>;
  
  isMyLocationEnabled(): Promise<boolean>;
  
  setMyLocationEnabled(enabled: boolean): Promise<void>;
  
  getMapType(): Promise<number>;
  
  setMapType(mapType: number): Promise<void>;
  
  moveCamera(
    latitude: number,
    longitude: number,
    zoom?: number,
    bearing?: number,
    tilt?: number
  ): Promise<void>;
  
  animateCamera(
    latitude: number,
    longitude: number,
    zoom?: number,
    bearing?: number,
    tilt?: number,
    duration?: number
  ): Promise<void>;
  
  getCameraPosition(): Promise<Object>;
  
  setMapStyle(styleJson: string): Promise<boolean>;
  
  setDestinationMarkerIcon(
    icon: Object | null,
    imagePixelRatio?: number
  ): Promise<boolean>;
  
  enableNavigationHeaderTouchEvents(enable: boolean): Promise<void>;
  
  enableNavigationFooterTouchEvents(enable: boolean): Promise<void>;
  
  enableTrafficLayer(enable: boolean): Promise<void>;
  
  isNavigationTripProgressBarEnabled(): Promise<boolean>;
  
  setNavigationTripProgressBarEnabled(enabled: boolean): Promise<void>;
  
  isNavigationHeaderEnabled(): Promise<boolean>;
  
  setNavigationHeaderEnabled(enabled: boolean): Promise<void>;
  
  isNavigationFooterEnabled(): Promise<boolean>;
  
  setNavigationFooterEnabled(enabled: boolean): Promise<void>;
  
  isRecenterButtonEnabled(): Promise<boolean>;
  
  setRecenterButtonEnabled(enabled: boolean): Promise<void>;
  
  isSpeedLimitIconEnabled(): Promise<boolean>;
  
  setSpeedLimitIconEnabled(enabled: boolean): Promise<void>;
  
  isSpeedometerEnabled(): Promise<boolean>;
  
  setSpeedometerEnabled(enabled: boolean): Promise<void>;
  
  isTrafficIncidentCardsEnabled(): Promise<boolean>;
  
  setTrafficIncidentCardsEnabled(enabled: boolean): Promise<void>;
  
  setStylingOptions(options: Object): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NavViewModule');
