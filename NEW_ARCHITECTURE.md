# React Native Navigation SDK - New Architecture Support

This document explains how to enable and use the New Architecture (Fabric + TurboModules) with the React Native Navigation SDK.

## What is React Native's New Architecture?

React Native's New Architecture consists of two main components:

1. **Fabric**: The new rendering system that replaces the legacy renderer
2. **TurboModules**: The new native module system that replaces the legacy bridge

## Benefits

- **Better Performance**: Direct JSI (JavaScript Interface) communication eliminates the bridge bottleneck
- **Type Safety**: Improved type safety between JavaScript and native code
- **Synchronous Communication**: Some operations can now be synchronous instead of asynchronous
- **Better Developer Experience**: Improved debugging and error handling

## Enabling New Architecture

### Prerequisites

- React Native 0.70.0 or higher
- Android API level 24 or higher
- iOS 15.0 or higher

### Android Setup

1. In your `android/gradle.properties`, set:
```properties
newArchEnabled=true
```

2. In your `android/app/src/main/java/.../MainApplication.java`, ensure you have:
```java
@Override
protected boolean isNewArchEnabled() {
  return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
}
```

### iOS Setup

1. In your `ios/Podfile`, set:
```ruby
ENV['RCT_NEW_ARCH_ENABLED'] = '1'
```

2. Clean and reinstall:
```bash
cd ios
rm -rf Pods Podfile.lock
RCT_NEW_ARCH_ENABLED=1 pod install
```

### Example App Configuration

The example app in this repository supports both architectures. To test with New Architecture:

```bash
# For Android
cd example/android
echo "newArchEnabled=true" >> gradle.properties
cd ..
npx react-native run-android

# For iOS  
cd example/ios
RCT_NEW_ARCH_ENABLED=1 pod install
cd ..
npx react-native run-ios
```

## Migration Notes

### Code Changes

The library automatically detects which architecture is being used and adapts accordingly. Your JavaScript code remains the same - the library handles the differences internally.

### Backwards Compatibility

This library maintains full backwards compatibility with the legacy architecture. You can safely upgrade without any code changes.

### Performance Considerations

- **TurboModules**: Navigation operations may execute faster due to JSI
- **Fabric Components**: Map rendering and interactions should be more responsive
- **Memory Usage**: Improved memory management in map components

## Troubleshooting

### Common Issues

1. **Build Errors**: Ensure you have the correct React Native version and New Architecture flags set
2. **Runtime Crashes**: Check that all native dependencies support New Architecture
3. **Performance Issues**: Monitor for any regressions and report them

### Debug Mode

To verify New Architecture is enabled:

```javascript
import { TurboModuleRegistry } from 'react-native';

// This will be null in legacy architecture
const isTurboModuleEnabled = TurboModuleRegistry.get('NavModule') !== null;
console.log('New Architecture enabled:', isTurboModuleEnabled);
```

## Reporting Issues

If you encounter issues with New Architecture support, please report them on our [GitHub repository](https://github.com/googlemaps/react-native-navigation-sdk/issues) with:

- React Native version
- Architecture mode (legacy vs new)
- Platform (iOS/Android)
- Detailed error logs
- Reproduction steps
