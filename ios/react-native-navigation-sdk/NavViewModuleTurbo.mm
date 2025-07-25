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

#import "NavViewModuleTurbo.h"

#ifdef RCT_NEW_ARCH_ENABLED
#import <RNNavigationSdkSpec/RNNavigationSdkSpec.h>
#endif

#import "NavViewModule.h"

@implementation NavViewModuleTurbo {
  NavViewModule *_navViewModule;
}

#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeNavViewModuleSpecJSI>(params);
}
#endif

- (instancetype)init {
  if (self = [super init]) {
    _navViewModule = [[NavViewModule alloc] init];
  }
  return self;
}

+ (NSString *)moduleName {
  return @"NavViewModule";
}

// Forward all method calls to the existing NavViewModule
- (NSMethodSignature *)methodSignatureForSelector:(SEL)aSelector {
  return [_navViewModule methodSignatureForSelector:aSelector];
}

- (void)forwardInvocation:(NSInvocation *)anInvocation {
  [anInvocation invokeWithTarget:_navViewModule];
}

@end
