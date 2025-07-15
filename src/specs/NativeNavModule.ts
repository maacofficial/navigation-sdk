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
  initializeNavigator(
    termsAndConditionsDialogOptions: Object,
    taskRemovedBehavior: number
  ): Promise<boolean>;
  
  cleanup(): Promise<void>;
  
  setDestination(
    waypoint: Object,
    routingOptions?: Object,
    displayOptions?: Object
  ): Promise<number>;
  
  setDestinations(
    waypoints: Array<Object>,
    routingOptions?: Object,
    displayOptions?: Object
  ): Promise<number>;
  
  clearDestinations(): Promise<void>;
  
  startGuidance(): Promise<void>;
  
  stopGuidance(): Promise<void>;
  
  startNavigation(): Promise<void>;
  
  stopNavigation(): Promise<void>;
  
  getContinueToWaypoint(): Promise<boolean>;
  
  getCurrentTimeAndDistance(): Promise<Object>;
  
  getRouteSegments(): Promise<Array<Object>>;
  
  getTraveledPath(): Promise<Array<Object>>;
  
  getCurrentRouteSegment(): Promise<Object>;
  
  enableTurnByTurnUpdatesForAndroidAuto(): Promise<void>;
  
  disableTurnByTurnUpdatesForAndroidAuto(): Promise<void>;
  
  pauseNavigation(): Promise<void>;
  
  resumeNavigation(): Promise<void>;
  
  setTaskRemovedBehavior(behavior: number): Promise<void>;
  
  setAudioGuidance(audioGuidance: Object): Promise<void>;
  
  setSpeedAlertOptions(speedAlertOptions: Object): Promise<void>;
  
  allowBackgroundLocationUpdates(allow: boolean): Promise<void>;
  
  startLocationSimulation(): Promise<void>;
  
  pauseLocationSimulation(): Promise<void>;
  
  resumeLocationSimulation(): Promise<void>;
  
  stopLocationSimulation(): Promise<void>;
  
  setUserLocation(location: Object): Promise<void>;
  
  removeUserLocation(): Promise<void>;
  
  setLocationSimulationOptions(options: Object): Promise<void>;
  
  setLogDebugInfoToConsole(enabled: boolean): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NavModule');
