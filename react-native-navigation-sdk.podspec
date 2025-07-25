=begin
 Copyright 2023 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
=end

require "json"



package = JSON.parse(File.read(File.join(__dir__, "package.json")))
folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -Wno-comma -Wno-shorten-64-to-32'

Pod::Spec.new do |s|
  s.name         = "react-native-navigation-sdk"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "15.0" }
  s.source       = { :git => "https://github.com/googlemaps/react-native-navigation-sdk.git", :tag => "#{s.version}" }

  s.source_files = "ios/react-native-navigation-sdk/*.{h,m,mm}", "cpp/*.{h,cpp}"
  s.dependency "GoogleNavigation", "9.3.0"

  # Don't install the dependencies when we run `pod install` in the old architecture.
  if ENV['RCT_NEW_ARCH_ENABLED'] == '1' then
    s.compiler_flags = folly_compiler_flags + " -DRCT_NEW_ARCH_ENABLED=1"
    s.pod_target_xcconfig    = {
      "HEADER_SEARCH_PATHS" => [
        '$(PODS_TARGET_SRCROOT)/build/generated/ios',
        '$(PODS_ROOT)/Headers/Public/React-Codegen',
        '$(PODS_ROOT)/Headers/Private/React-Codegen',
        '$(PODS_ROOT)/Headers/Public/ReactCommon',
        '$(PODS_ROOT)/Headers/Public/React-Core',
        '$(PODS_ROOT)/Headers/Private/React-Core',
        '$(PODS_ROOT)/Headers/Public/React-Fabric',
        '$(PODS_ROOT)/Headers/Public/React-jsi',
        '$(PODS_ROOT)/Headers/Public/React-rncore',
        '$(PODS_ROOT)/Headers/Public/RCT-Folly',
        '$(PODS_ROOT)/Headers/Public/React-Codegen',
        '$(PODS_ROOT)/ReactCommon',
        '$(PODS_ROOT)/React-Core',
        '$(PODS_ROOT)/React-Fabric',
        '$(PODS_ROOT)/React-jsi',
        '$(PODS_ROOT)/React-rncore',
        '$(PODS_ROOT)/RCT-Folly',
        '$(PODS_ROOT)/boost',
        '$(PODS_ROOT)/DoubleConversion',
        '$(PODS_ROOT)/glog',
        '$(PODS_ROOT)/fmt',
        '$(PODS_ROOT)/React-Codegen',
        '$(PODS_TARGET_SRCROOT)/build/generated/ios/React-Codegen',
        '$(PODS_TARGET_SRCROOT)/build/generated/ios',
        '$(PODS_TARGET_SRCROOT)/build/generated/ios/ReactNativeNavigationSdkSpec',
      ].map { |p| '"' + p + '"' }.join(' '),
      "CLANG_CXX_LANGUAGE_STANDARD" => "c++17"
    }
    s.dependency "React-Core"
    s.dependency "React-Codegen"
    s.dependency "ReactCommon/turbomodule/core"
    s.dependency "glog"
    s.dependency "React-jsi"
    s.dependency "React-rncore"
    s.dependency "RCT-Folly"
    s.dependency "React-Fabric"
  else
    s.dependency "React-Core"
  end
end
