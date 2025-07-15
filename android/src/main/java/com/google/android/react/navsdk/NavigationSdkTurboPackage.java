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

package com.google.android.react.navsdk;

import androidx.annotation.NonNull;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;
import com.facebook.react.TurboReactPackage;
import com.facebook.react.ViewManagerOnDemandReactPackage;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class NavigationSdkTurboPackage extends TurboReactPackage implements ViewManagerOnDemandReactPackage {

  @Override
  public NativeModule getModule(String name, ReactApplicationContext reactContext) {
    switch (name) {
      case "NavModule":
        return new NavModule(reactContext);
      case "NavAutoModule":
        return new NavAutoModule(reactContext);
      case "NavViewModule":
        return new NavViewModule(reactContext);
      case "NavEventDispatcher":
        return new NavEventDispatcher(reactContext);
      case "NavAutoEventDispatcher":
        return new NavAutoEventDispatcher(reactContext);
      default:
        return null;
    }
  }

  @Override
  public ReactModuleInfoProvider getReactModuleInfoProvider() {
    return () -> {
      final Map<String, ReactModuleInfo> moduleInfos = new HashMap<>();
      boolean isTurboModule = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
      
      moduleInfos.put(
          "NavModule",
          new ReactModuleInfo(
              "NavModule",
              "NavModule",
              false, // canOverrideExistingModule
              false, // needsEagerInit
              true, // hasConstants
              false, // isCxxModule
              isTurboModule // isTurboModule
          ));
      
      moduleInfos.put(
          "NavAutoModule",
          new ReactModuleInfo(
              "NavAutoModule",
              "NavAutoModule",
              false, // canOverrideExistingModule
              false, // needsEagerInit
              true, // hasConstants
              false, // isCxxModule
              isTurboModule // isTurboModule
          ));
      
      moduleInfos.put(
          "NavViewModule",
          new ReactModuleInfo(
              "NavViewModule",
              "NavViewModule",
              false, // canOverrideExistingModule
              false, // needsEagerInit
              true, // hasConstants
              false, // isCxxModule
              isTurboModule // isTurboModule
          ));
      
      moduleInfos.put(
          "NavEventDispatcher",
          new ReactModuleInfo(
              "NavEventDispatcher",
              "NavEventDispatcher",
              false, // canOverrideExistingModule
              false, // needsEagerInit
              true, // hasConstants
              false, // isCxxModule
              isTurboModule // isTurboModule
          ));
      
      moduleInfos.put(
          "NavAutoEventDispatcher",
          new ReactModuleInfo(
              "NavAutoEventDispatcher",
              "NavAutoEventDispatcher",
              false, // canOverrideExistingModule
              false, // needsEagerInit
              true, // hasConstants
              false, // isCxxModule
              isTurboModule // isTurboModule
          ));
      
      return moduleInfos;
    };
  }

  @Override
  @NonNull
  protected List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
    return Arrays.<ViewManager>asList(new RCTNavViewManager());
  }

  @Override
  public List<String> getViewManagerNames(ReactApplicationContext reactContext) {
    return Arrays.asList("RCTNavView", "RCTMapView");
  }

  @Override
  protected ViewManager createViewManager(
      ReactApplicationContext reactContext, String viewManagerName) {
    switch (viewManagerName) {
      case "RCTNavView":
        return new RCTNavViewManager();
      case "RCTMapView": 
        return new RCTMapViewManager();
      default:
        throw new IllegalArgumentException("Unknown view manager: " + viewManagerName);
    }
  }
}
