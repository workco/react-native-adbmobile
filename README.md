# react-native-adbmobile

Integrates
[Adobe Mobile Services SDK](https://github.com/Adobe-Marketing-Cloud/mobile-services)
as [React Native](https://facebook.github.io/react-native/) module,
enabling applications to use Analytics, Target, Campaign, and Audience
Manager.

## Getting started

`$ npm install react-native-adbmobile --save`

### Mostly automatic installation

`$ react-native link react-native-adbmobile`

### Manual installation

#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-adbmobile` and add `RNADBMobile.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNADBMobile.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)


#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import co.work.RNADBMobilePackage;` to the imports at the top of the file
  - Add `new RNADBMobilePackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-adbmobile'
  	project(':react-native-adbmobile').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-adbmobile/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-adbmobile')
  	```


## Usage
```javascript
import RNADBMobile from 'react-native-adbmobile';

// TODO: What to do with the module?
RNADBMobile;
```

# References
 - [Adobe Mobile Services Help](https://marketing.adobe.com/resources/help/en_US/mobile/)
 - [Adobe Mobile Services GitHub](https://github.com/Adobe-Marketing-Cloud/mobile-services)
 - [React Native Modules - Android](https://facebook.github.io/react-native/docs/native-modules-android.html)
 - [React Native Modules - iOS](https://facebook.github.io/react-native/docs/native-modules-ios.html)
