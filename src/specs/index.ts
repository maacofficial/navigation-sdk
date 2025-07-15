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

export * from './NativeModules';
export * from './NativeComponents';

// Re-export specs for codegen
export type { Spec as NativeNavModuleSpec } from './NativeNavModule';
export type { Spec as NativeNavAutoModuleSpec } from './NativeNavAutoModule';
export type { Spec as NativeNavViewModuleSpec } from './NativeNavViewModule';

export type { NativeProps as RCTNavViewProps } from './RCTNavViewNativeComponent';
export type { NativeProps as RCTMapViewProps } from './RCTMapViewNativeComponent';
