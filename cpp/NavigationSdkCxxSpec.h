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

#pragma once

#include <ReactCommon/TurboModule.h>
#include <jsi/jsi.h>

namespace facebook {
namespace react {

class JSI_EXPORT NavigationSdkCxxSpecJSI : public TurboModule {
protected:
  NavigationSdkCxxSpecJSI(std::shared_ptr<CallInvoker> jsInvoker);

public:
  // TurboModule methods
  virtual jsi::Value initializeNavigator(jsi::Runtime &rt, const jsi::Value &termsAndConditionsDialogOptions, const jsi::Value &taskRemovedBehavior) = 0;
  virtual jsi::Value cleanup(jsi::Runtime &rt) = 0;
  virtual jsi::Value setDestination(jsi::Runtime &rt, const jsi::Value &waypoint, const jsi::Value &routingOptions, const jsi::Value &displayOptions) = 0;
  virtual jsi::Value setDestinations(jsi::Runtime &rt, const jsi::Value &waypoints, const jsi::Value &routingOptions, const jsi::Value &displayOptions) = 0;
  virtual jsi::Value clearDestinations(jsi::Runtime &rt) = 0;
  virtual jsi::Value startGuidance(jsi::Runtime &rt) = 0;
  virtual jsi::Value stopGuidance(jsi::Runtime &rt) = 0;
  virtual jsi::Value startNavigation(jsi::Runtime &rt) = 0;
  virtual jsi::Value stopNavigation(jsi::Runtime &rt) = 0;
  virtual jsi::Value getContinueToWaypoint(jsi::Runtime &rt) = 0;
  virtual jsi::Value getCurrentTimeAndDistance(jsi::Runtime &rt) = 0;
  virtual jsi::Value getRouteSegments(jsi::Runtime &rt) = 0;
  virtual jsi::Value getTraveledPath(jsi::Runtime &rt) = 0;
  virtual jsi::Value getCurrentRouteSegment(jsi::Runtime &rt) = 0;
  virtual jsi::Value enableTurnByTurnUpdatesForAndroidAuto(jsi::Runtime &rt) = 0;
  virtual jsi::Value disableTurnByTurnUpdatesForAndroidAuto(jsi::Runtime &rt) = 0;
  virtual jsi::Value pauseNavigation(jsi::Runtime &rt) = 0;
  virtual jsi::Value resumeNavigation(jsi::Runtime &rt) = 0;
  virtual jsi::Value setTaskRemovedBehavior(jsi::Runtime &rt, const jsi::Value &behavior) = 0;
  virtual jsi::Value setAudioGuidance(jsi::Runtime &rt, const jsi::Value &audioGuidance) = 0;
  virtual jsi::Value setSpeedAlertOptions(jsi::Runtime &rt, const jsi::Value &speedAlertOptions) = 0;
  virtual jsi::Value allowBackgroundLocationUpdates(jsi::Runtime &rt, const jsi::Value &allow) = 0;
  virtual jsi::Value startLocationSimulation(jsi::Runtime &rt) = 0;
  virtual jsi::Value pauseLocationSimulation(jsi::Runtime &rt) = 0;
  virtual jsi::Value resumeLocationSimulation(jsi::Runtime &rt) = 0;
  virtual jsi::Value stopLocationSimulation(jsi::Runtime &rt) = 0;
  virtual jsi::Value setUserLocation(jsi::Runtime &rt, const jsi::Value &location) = 0;
  virtual jsi::Value removeUserLocation(jsi::Runtime &rt) = 0;
  virtual jsi::Value setLocationSimulationOptions(jsi::Runtime &rt, const jsi::Value &options) = 0;
  virtual jsi::Value setLogDebugInfoToConsole(jsi::Runtime &rt, const jsi::Value &enabled) = 0;
};

} // namespace react
} // namespace facebook
