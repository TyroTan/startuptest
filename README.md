# React Native App for startuptest

### System

- MacOS Big Sur 11.5.2
- Xcode 13.1
- Targets: iPhones, iPads, Android Phones, Tablets

### Before Getting Started

- Set up react native on your local machine
  - Note: we need to setup both Expo CLI and React Native CLI below because this was initially an Expo project which was ejected to use bare workflow
  - Visit https://reactnative.dev/docs/environment-setup
  - Choose `Expo CLI Quickstart`, perform setup according to instructions
  - Choose `React Native CLI Quickstart`
  - Choose your `Development OS`, and perform setup for Target OS of `Android` and `IOS` (Note: IOS set up requires Xcode, which is only available for MacOS)

### Project Setup

- Only perform the steps below if setup above has been completed
- Download repo into your local machine
  - `git clone https://`
- Navigate to repo directory and install dependencies
  - `cd to project`
  - `npm install`
- For MacOS, install CocoaPods dependencies
  - `cd ios && npx pod-install && cd ..`
- Run development server
  - `npm start`
- Start android simulator
  - `npm run android`
  - If you encounter errors, check "Common Problems and Troubleshooting" section below to see if it's been encountered before
- Start ios simulator (only for MacOS)

### Deployment

- **Common steps**

  - Update app version in multiple files
    - `app.json`
    - `package.json`
      -Sync release channels
    - `AndroidManifest.xml` - expo.modules.updates.EXPO_RELEASE_CHANNEL (value = "prod")
    - `Expo.plist` - EXUpdatesReleaseChannel (value = "prod")

- **Deploy to TestFlight for IOS**  
- **Deploy to PlayStore for Android**  
- **Generate .apk file for local installation / sharing**  
  (Note: for Android only)

  - Navigate to `project` folder,
    - Run `cd android && ./gradlew assembleRelease && cd ..`
    - Copy .apk file in `/android/app/build/outputs/apk/release/app-release.apk` to Android devices for installation

### Common Problems and Troubleshooting

### Over-the-air updates

### Navigator/Screens

### Reusable Components

### libraries
- rnfirebase.io

[by ---](http://---.com)
