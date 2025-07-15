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

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import javax.annotation.Nullable;
import java.util.Map;

import android.view.View;

public class RCTMapViewManager extends SimpleViewManager<MapViewFragment> {

  public static final String REACT_CLASS = "RCTMapView";

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  protected MapViewFragment createViewInstance(ThemedReactContext reactContext) {
    return new MapViewFragment();
  }

  @Override
  public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
    return MapBuilder.<String, Object>builder()
        .put("onMapReady", MapBuilder.of("registrationName", "onMapReady"))
        .put("onLocationChanged", MapBuilder.of("registrationName", "onLocationChanged"))
        .put("onLocationButtonClicked", MapBuilder.of("registrationName", "onLocationButtonClicked"))
        .put("onMapClicked", MapBuilder.of("registrationName", "onMapClicked"))
        .put("onMarkerClicked", MapBuilder.of("registrationName", "onMarkerClicked"))
        .put("onCameraMoveStarted", MapBuilder.of("registrationName", "onCameraMoveStarted"))
        .put("onCameraMove", MapBuilder.of("registrationName", "onCameraMove"))
        .put("onCameraIdle", MapBuilder.of("registrationName", "onCameraIdle"))
        .build();
  }

  @ReactProp(name = "mapType", defaultInt = 1)
  public void setMapType(MapViewFragment view, int mapType) {
    view.setMapType(mapType);
  }

  @ReactProp(name = "myLocationEnabled", defaultBoolean = false)
  public void setMyLocationEnabled(MapViewFragment view, boolean enabled) {
    view.setMyLocationEnabled(enabled);
  }

  @ReactProp(name = "myLocationButtonEnabled", defaultBoolean = true)
  public void setMyLocationButtonEnabled(MapViewFragment view, boolean enabled) {
    view.setMyLocationButtonEnabled(enabled);
  }

  @ReactProp(name = "zoomControlsEnabled", defaultBoolean = true)
  public void setZoomControlsEnabled(MapViewFragment view, boolean enabled) {
    view.setZoomControlsEnabled(enabled);
  }

  @ReactProp(name = "zoomGesturesEnabled", defaultBoolean = true)
  public void setZoomGesturesEnabled(MapViewFragment view, boolean enabled) {
    view.setZoomGesturesEnabled(enabled);
  }

  @ReactProp(name = "scrollGesturesEnabled", defaultBoolean = true)
  public void setScrollGesturesEnabled(MapViewFragment view, boolean enabled) {
    view.setScrollGesturesEnabled(enabled);
  }

  @ReactProp(name = "tiltGesturesEnabled", defaultBoolean = true)
  public void setTiltGesturesEnabled(MapViewFragment view, boolean enabled) {
    view.setTiltGesturesEnabled(enabled);
  }

  @ReactProp(name = "rotateGesturesEnabled", defaultBoolean = true)
  public void setRotateGesturesEnabled(MapViewFragment view, boolean enabled) {
    view.setRotateGesturesEnabled(enabled);
  }

  @ReactProp(name = "trafficEnabled", defaultBoolean = false)
  public void setTrafficEnabled(MapViewFragment view, boolean enabled) {
    view.setTrafficEnabled(enabled);
  }

  @ReactProp(name = "mapStyle")
  public void setMapStyle(MapViewFragment view, @Nullable String mapStyle) {
    view.setMapStyle(mapStyle);
  }
}
