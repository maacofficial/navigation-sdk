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

#import "RNNavigationSdkComponentsProvider.h"

#ifdef RCT_NEW_ARCH_ENABLED
#import "RCTNavViewComponentView.h"
#import <React/RCTComponentViewFactory.h>
#endif

@implementation RNNavigationSdkComponentsProvider

#ifdef RCT_NEW_ARCH_ENABLED
+ (NSDictionary<NSString *, Class<RCTComponentViewProtocol>> *)thirdPartyFabricComponents
{
  return @{
    @"RCTNavView": RCTNavViewComponentView.class,
    @"RCTMapView": RCTNavViewComponentView.class, // Using the same component for now
  };
}

// Register components with React Native
+ (void)load
{
  [RCTComponentViewFactory.currentComponentViewFactory registerComponentViewClass:RCTNavViewComponentView.class forName:@"RCTNavView"];
}
#endif

@end
