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

#import "NavModuleTurbo.h"

#ifdef RCT_NEW_ARCH_ENABLED
#import <RNNavigationSdkSpec/RNNavigationSdkSpec.h>
#endif

#import "NavModule.h"

@implementation NavModuleTurbo {
  NavModule *_navModule;
}

#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeNavModuleSpecJSI>(params);
}
#endif

- (instancetype)init {
  if (self = [super init]) {
    _navModule = [[NavModule alloc] init];
  }
  return self;
}

+ (NSString *)moduleName {
  return @"NavModule";
}

// Forward all method calls to the existing NavModule
- (NSMethodSignature *)methodSignatureForSelector:(SEL)aSelector {
  return [_navModule methodSignatureForSelector:aSelector];
}

- (void)forwardInvocation:(NSInvocation *)anInvocation {
  [anInvocation invokeWithTarget:_navModule];
}

@end
