module.exports = {
  name: '@googlemaps/react-native-navigation-sdk',
  codegenConfig: {
    name: 'RNNavigationSdkSpec',
    type: 'modules',
    jsSrcsDir: 'src/specs',
    android: {
      javaPackageName: 'com.google.android.react.navsdk',
    },
  },
};
