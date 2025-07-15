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

#import "NavAutoEventDispatcherTurbo.h"

#ifdef RCT_NEW_ARCH_ENABLED

#import "NavAutoEventDispatcher.h"

@implementation NavAutoEventDispatcherTurbo

RCT_EXPORT_MODULE(NavAutoEventDispatcher);

+ (id)allocWithZone:(NSZone *)zone {
  static NavAutoEventDispatcherTurbo *sharedInstance = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    sharedInstance = [super allocWithZone:zone];
  });
  return sharedInstance;
}

- (void)addListener:(NSString *)eventName {
  // Forward to the legacy implementation
  NavAutoEventDispatcher *legacyDispatcher = [[NavAutoEventDispatcher alloc] init];
  // This is just for protocol compliance, actual event handling is done by legacy dispatcher
}

- (void)removeListeners:(double)count {
  // Forward to the legacy implementation
  NavAutoEventDispatcher *legacyDispatcher = [[NavAutoEventDispatcher alloc] init];
  // This is just for protocol compliance, actual event handling is done by legacy dispatcher
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeAutoEventDispatcherSpecJSI>(params);
}

@end

#endif
