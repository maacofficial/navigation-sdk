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

#import <Foundation/Foundation.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import <RNNavigationSdkSpec/RNNavigationSdkSpec.h>
#endif

#import <React/RCTBridgeModule.h>
#import "NavModule.h"

NS_ASSUME_NONNULL_BEGIN

@interface NavModuleTurbo : NSObject

#ifdef RCT_NEW_ARCH_ENABLED
<NativeNavModuleSpec>
#else
<RCTBridgeModule>
#endif

@end

NS_ASSUME_NONNULL_END
