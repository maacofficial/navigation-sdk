module.exports = {
  name: '@googlemaps/react-native-navigation-sdk',
  codegenConfig: {
    name: 'RNNavigationSdkSpec',
    type: 'all',
    jsSrcsDir: 'src/specs',
    android: {
      javaPackageName: 'com.google.android.react.navsdk',
    },
  },
};
