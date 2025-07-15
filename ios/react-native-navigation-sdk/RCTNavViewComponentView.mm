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

#import "RCTNavViewComponentView.h"

#ifdef RCT_NEW_ARCH_ENABLED

#import <react/renderer/components/RNNavigationSdkSpec/ComponentDescriptors.h>
#import <react/renderer/components/RNNavigationSdkSpec/EventEmitters.h>
#import <react/renderer/components/RNNavigationSdkSpec/Props.h>
#import <react/renderer/components/RNNavigationSdkSpec/RCTComponentViewHelpers.h>

#import <React/RCTConversions.h>
#import <React/RCTFabricComponentsPlugins.h>

using namespace facebook::react;

@interface RCTNavViewComponentView () <RCTRCTNavViewViewProtocol>

@end

@implementation RCTNavViewComponentView {
  NavView *_navView;
  NavViewController *_navViewController;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<RCTNavViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const RCTNavViewProps>();
    _props = defaultProps;
    
    _navView = [[NavView alloc] init];
    _navViewController = [[NavViewController alloc] init];
    
    self.contentView = _navView;
  }

  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
  const auto &oldViewProps = *std::static_pointer_cast<RCTNavViewProps const>(_props);
  const auto &newViewProps = *std::static_pointer_cast<RCTNavViewProps const>(props);

  // Handle prop updates here
  
  [super updateProps:props oldProps:oldProps];
}

Class<RCTComponentViewProtocol> RCTNavViewCls(void)
{
  return RCTNavViewComponentView.class;
}

@end

#endif
