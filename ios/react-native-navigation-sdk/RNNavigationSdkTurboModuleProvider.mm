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

#import "RNNavigationSdkTurboModuleProvider.h"

#ifdef RCT_NEW_ARCH_ENABLED
#import <RNNavigationSdkSpec/RNNavigationSdkSpec.h>
#import "NavModuleTurbo.h"
#import "NavAutoModuleTurbo.h"
#import "NavViewModuleTurbo.h"
#import "NavEventDispatcher.h"
#import "NavAutoEventDispatcher.h"
#endif

@implementation RNNavigationSdkTurboModuleProvider

#ifdef RCT_NEW_ARCH_ENABLED
+ (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
                                                      jsInvoker:(std::shared_ptr<facebook::react::CallInvoker>)jsInvoker
{
  if (name == "NavModule") {
    return std::make_shared<facebook::react::NativeNavModuleSpecJSI>(
      facebook::react::ObjCTurboModule::InitParams{
        .moduleName = "NavModule",
        .instance = [[NavModuleTurbo alloc] init],
        .jsInvoker = jsInvoker,
        .nativeInvoker = [RCTTurboModuleManager createTurboModuleMethodQueue]
      }
    );
  }
  
  if (name == "NavAutoModule") {
    return std::make_shared<facebook::react::NativeNavAutoModuleSpecJSI>(
      facebook::react::ObjCTurboModule::InitParams{
        .moduleName = "NavAutoModule",
        .instance = [[NavAutoModuleTurbo alloc] init],
        .jsInvoker = jsInvoker,
        .nativeInvoker = [RCTTurboModuleManager createTurboModuleMethodQueue]
      }
    );
  }
  
  if (name == "NavViewModule") {
    return std::make_shared<facebook::react::NativeNavViewModuleSpecJSI>(
      facebook::react::ObjCTurboModule::InitParams{
        .moduleName = "NavViewModule",
        .instance = [[NavViewModuleTurbo alloc] init],
        .jsInvoker = jsInvoker,
        .nativeInvoker = [RCTTurboModuleManager createTurboModuleMethodQueue]
      }
    );
  }
  
  if (name == "NavEventDispatcher") {
    return std::make_shared<facebook::react::NativeEventDispatcherSpecJSI>(
      facebook::react::ObjCTurboModule::InitParams{
        .moduleName = "NavEventDispatcher",
        .instance = [[NavEventDispatcher alloc] init],
        .jsInvoker = jsInvoker,
        .nativeInvoker = [RCTTurboModuleManager createTurboModuleMethodQueue]
      }
    );
  }
  
  if (name == "NavAutoEventDispatcher") {
    return std::make_shared<facebook::react::NativeAutoEventDispatcherSpecJSI>(
      facebook::react::ObjCTurboModule::InitParams{
        .moduleName = "NavAutoEventDispatcher",
        .instance = [[NavAutoEventDispatcher alloc] init],
        .jsInvoker = jsInvoker,
        .nativeInvoker = [RCTTurboModuleManager createTurboModuleMethodQueue]
      }
    );
  }
  
  return nullptr;
}
#endif

@end
