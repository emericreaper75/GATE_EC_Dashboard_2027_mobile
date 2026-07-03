gate-ec-dashboard-mobile $ eas build --platform android --local
The field "cli.appVersionSource" is not set, but it will be required in the future. Learn more
Resolved "production" environment for the build. Learn more
No environment variables with visibility "Plain text" and "Sensitive" found for the "production" environment on EAS.

Specified value for "android.package" in app.json is ignored because an android directory was detected in the project.
EAS Build will use the value found in the native code.
The field "cli.appVersionSource" is not set, but it will be required in the future. Learn more
✔ Using remote Android credentials (Expo server)
✔ Using Keystore from configuration: Build Credentials WLkqyRI7E2 (default)
✔ Compressed project files 1s (2.4 MB)
ANDROID_NDK_HOME environment variable was not specified, continuing build without NDK
[SETUP_WORKINGDIR] Preparing workingdir /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493
[START_BUILD] Starting build
  "job": {
    "type": "generic",
    "platform": "android",
    "projectRootDirectory": ".",
    "projectArchive": {
      "type": "PATH",
      "path": "/tmp/manoj-amavasya/eas-cli-nodejs/88fc780f-3da4-4069-be75-3ff8f7e271d4.tar.gz"
    },
    "builderEnvironment": {
      "env": {}
    },
    "cache": {
      "disabled": false,
      "paths": [],
      "clear": false
    },
    "updates": {},
    "buildType": "app-bundle",
    "username": "emericreaper",
    "experimental": {},
    "mode": "build",
    "triggeredBy": "EAS_CLI",
    "appId": "98b62500-3c29-4267-97a9-83702f993859",
    "initiatingUserId": "5533c8e6-4619-4741-8f79-1c5df2a06259"
  }
Local build, skipping project archive refresh
[READ_EAS_JSON] Using eas.json:
[READ_EAS_JSON] {
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  },
  "submit": {
    "production": {
      "android": {
        "track": "internal"
      }
    }
  }
}

[READ_PACKAGE_JSON] Using package.json:
[READ_PACKAGE_JSON] {
  "name": "gate-ec-dashboard-mobile",
  "version": "1.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo run:android",
    "ios": "expo run:ios",
    "build:android": "npx eas-cli build --platform android",
    "build:apk": "npx eas-cli build --platform android --profile preview"
  },
  "dependencies": {
    "@expo/metro-runtime": "~3.1.3",
    "@react-native-async-storage/async-storage": "1.21.0",
    "@react-navigation/bottom-tabs": "^6.5.20",
    "@react-navigation/native": "^6.1.17",
    "@react-navigation/native-stack": "^6.9.26",
    "date-fns": "^3.6.0",
    "expo": "~50.0.21",
    "expo-camera": "~14.0.6",
    "expo-file-system": "~16.0.9",
    "expo-sharing": "~11.10.0",
    "expo-status-bar": "~1.11.1",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-native": "0.73.6",
    "react-native-qrcode-svg": "^6.2.0",
    "react-native-safe-area-context": "4.8.2",
    "react-native-screens": "~3.29.0",
    "react-native-svg": "14.1.0",
    "react-native-web": "~0.19.6",
    "zustand": "^4.5.2"
  },
  "devDependencies": {
    "@babel/core": "^7.24.0"
  },
  "private": true
}
[INSTALL_DEPENDENCIES] Running "npm install --include=dev" in /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build directory
[INSTALL_DEPENDENCIES] npm warn deprecated osenv@0.1.5: This package is no longer supported.
[INSTALL_DEPENDENCIES] npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
[INSTALL_DEPENDENCIES] npm warn deprecated @npmcli/move-file@1.1.2: This functionality has been moved to @npmcli/fs
[INSTALL_DEPENDENCIES] npm warn deprecated @babel/plugin-proposal-optional-catch-binding@7.18.6: This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-optional-catch-binding instead.
[INSTALL_DEPENDENCIES] npm warn deprecated @babel/plugin-proposal-numeric-separator@7.18.6: This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-numeric-separator instead.
[INSTALL_DEPENDENCIES] npm warn deprecated @babel/plugin-proposal-nullish-coalescing-operator@7.18.6: This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-nullish-coalescing-operator instead.
[INSTALL_DEPENDENCIES] npm warn deprecated @babel/plugin-proposal-class-properties@7.18.6: This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-class-properties instead.
[INSTALL_DEPENDENCIES] npm warn deprecated rimraf@2.6.3: Rimraf versions prior to v4 are no longer supported
[INSTALL_DEPENDENCIES] npm warn deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported
[INSTALL_DEPENDENCIES] npm warn deprecated @babel/plugin-proposal-optional-chaining@7.21.0: This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-optional-chaining instead.
[INSTALL_DEPENDENCIES] npm warn deprecated glob@7.2.3: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me
[INSTALL_DEPENDENCIES] npm warn deprecated sudo-prompt@9.2.1: Package no longer supported. Contact Support at https://www.npmjs.com/support for more info.
[INSTALL_DEPENDENCIES] npm warn deprecated glob@7.1.6: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me
[INSTALL_DEPENDENCIES] npm warn deprecated glob@7.1.6: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me
[INSTALL_DEPENDENCIES] npm warn deprecated glob@7.1.6: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me
[INSTALL_DEPENDENCIES] npm warn deprecated @babel/plugin-proposal-object-rest-spread@7.20.7: This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-object-rest-spread instead.
[INSTALL_DEPENDENCIES] npm warn deprecated @babel/plugin-proposal-async-generator-functions@7.20.7: This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-async-generator-functions instead.
[INSTALL_DEPENDENCIES] npm warn deprecated @xmldom/xmldom@0.7.13: this version has critical issues, please update to the latest version
[INSTALL_DEPENDENCIES] npm warn deprecated text-encoding@0.7.0: no longer maintained
[INSTALL_DEPENDENCIES] npm warn deprecated tar@6.2.1: Old versions of tar are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me
[INSTALL_DEPENDENCIES] npm warn deprecated uuid@7.0.3: uuid@10 and below is no longer supported.  For ESM codebases, update to uuid@latest.  For CommonJS codebases, use uuid@11 (but be aware this version will likely be deprecated in 2028).
[INSTALL_DEPENDENCIES] npm warn deprecated @react-navigation/routers@6.1.9: This version is no longer supported
[INSTALL_DEPENDENCIES] npm warn deprecated uuid@8.3.2: uuid@10 and below is no longer supported.  For ESM codebases, update to uuid@latest.  For CommonJS codebases, use uuid@11 (but be aware this version will likely be deprecated in 2028).
[INSTALL_DEPENDENCIES] npm warn deprecated @react-navigation/bottom-tabs@6.6.1: This version is no longer supported
[INSTALL_DEPENDENCIES] npm warn deprecated @react-navigation/native@6.1.18: This version is no longer supported
[INSTALL_DEPENDENCIES] npm warn deprecated @react-navigation/elements@1.3.31: This version is no longer supported
[INSTALL_DEPENDENCIES] npm warn deprecated @react-navigation/core@6.4.17: This version is no longer supported
[INSTALL_DEPENDENCIES] added 1170 packages, and audited 1171 packages in 20s
[INSTALL_DEPENDENCIES] 156 packages are looking for funding
[INSTALL_DEPENDENCIES]   run `npm fund` for details
[INSTALL_DEPENDENCIES] 28 vulnerabilities (1 low, 12 moderate, 15 high)
[INSTALL_DEPENDENCIES] 
[INSTALL_DEPENDENCIES] To address all issues (including breaking changes), run:
[INSTALL_DEPENDENCIES]   npm audit fix --force
[INSTALL_DEPENDENCIES] 
[INSTALL_DEPENDENCIES] Run `npm audit` for details.
The NODE_ENV environment variable is required but was not specified. Ensure the project is bundled with Expo CLI or NODE_ENV is set.
Proceeding without mode-specific .env
[READ_APP_CONFIG] Using app configuration:
[READ_APP_CONFIG] {
  "name": "GATE EC 2027",
  "slug": "gate-ec-dashboard-2027",
  "version": "1.0.0",
  "orientation": "portrait",
  "userInterfaceStyle": "dark",
  "icon": "./src/assets/icon.png",
  "assetBundlePatterns": [
    "**/*"
  ],
  "splash": {
    "image": "./src/assets/splash.png",
    "resizeMode": "contain",
    "backgroundColor": "#0D0F14"
  },
  "ios": {
    "supportsTabletMode": true,
    "bundleIdentifier": "com.recgate.dashboard"
  },
  "android": {
    "adaptiveIcon": {
      "foregroundImage": "./src/assets/adaptive-icon.png",
      "backgroundColor": "#0D0F14"
    },
    "package": "com.recgate.dashboard",
    "versionCode": 1,
    "softwareKeyboardLayoutMode": "pan",
    "permissions": [
      "android.permission.CAMERA",
      "android.permission.RECORD_AUDIO"
    ]
  },
  "web": {
    "favicon": "./src/assets/favicon.png"
  },
  "plugins": [
    [
      "expo-camera",
      {
        "cameraPermission": "Allow GATE EC Dashboard to access your camera for QR code scanning"
      }
    ]
  ],
  "extra": {
    "eas": {
      "projectId": "98b62500-3c29-4267-97a9-83702f993859"
    }
  },
  "owner": "emericreapers-team",
  "sdkVersion": "50.0.0",
  "platforms": [
    "ios",
    "android",
    "web"
  ]
}
[RUN_EXPO_DOCTOR] Running "expo doctor"
[RUN_EXPO_DOCTOR] Running 16 checks on your project...
[RUN_EXPO_DOCTOR] 12/16 checks passed. 4 checks failed. Possible issues detected:
[RUN_EXPO_DOCTOR] Use the --verbose flag to see more details about passed checks.
[RUN_EXPO_DOCTOR] 
[RUN_EXPO_DOCTOR] ✖ Check for common project setup issues
[RUN_EXPO_DOCTOR] The .expo directory is not ignored by Git. It contains machine-specific device history and development server settings and should not be committed.
[RUN_EXPO_DOCTOR] Advice:
[RUN_EXPO_DOCTOR] Add ".expo/" to your .gitignore to avoid committing local Expo state.
[RUN_EXPO_DOCTOR] 
[RUN_EXPO_DOCTOR] ✖ Check Expo config (app.json/ app.config.js) schema
[RUN_EXPO_DOCTOR] Error validating fields in /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/app.json:
[RUN_EXPO_DOCTOR]  Field: ios - should NOT have additional property 'supportsTabletMode'.
[RUN_EXPO_DOCTOR] Error validating asset fields in /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/app.json:
[RUN_EXPO_DOCTOR]  Field: Android.adaptiveIcon.foregroundImage - the file extension should match the content, but the file extension is .png while the file content at './src/assets/adaptive-icon.png' is of type jpg.
[RUN_EXPO_DOCTOR]  Field: Android.adaptiveIcon.foregroundImage - field 'Android.adaptiveIcon.foregroundImage' should point to .png image but the file at './src/assets/adaptive-icon.png' has type jpg.
[RUN_EXPO_DOCTOR]  Field: icon - the file extension should match the content, but the file extension is .png while the file content at './src/assets/icon.png' is of type jpg.
[RUN_EXPO_DOCTOR]  Field: icon - field 'icon' should point to .png image but the file at './src/assets/icon.png' has type jpg.
[RUN_EXPO_DOCTOR]  Field: Splash.image - the file extension should match the content, but the file extension is .png while the file content at './src/assets/splash.png' is of type jpg.
[RUN_EXPO_DOCTOR]  Field: Splash.image - field 'Splash.image' should point to .png image but the file at './src/assets/splash.png' has type jpg.
[RUN_EXPO_DOCTOR] Advice:
[RUN_EXPO_DOCTOR] Resolve schema errors in your app config. Learn more: https://docs.expo.dev/workflow/configuration/
[RUN_EXPO_DOCTOR] 
[RUN_EXPO_DOCTOR] ✖ Check for app config fields that may not be synced in a non-CNG project
[RUN_EXPO_DOCTOR] This project contains native project folders but also has native configuration properties in app.json, indicating it is configured to use Prebuild. When the android/ios folders are present, EAS Build will not sync the following properties: orientation, userInterfaceStyle, icon, splash, ios, android, plugins. 
[RUN_EXPO_DOCTOR] 
[RUN_EXPO_DOCTOR] Advice:
[RUN_EXPO_DOCTOR] Add '/android' to your .gitignore file if you intend to use CNG / Prebuild. Learn more: https://docs.expo.dev/workflow/prebuild/#usage-with-eas-build
[RUN_EXPO_DOCTOR] 
[RUN_EXPO_DOCTOR] ✖ Check that packages match versions required by installed Expo SDK
[RUN_EXPO_DOCTOR] The following packages should be updated for best compatibility with the installed expo version:
[RUN_EXPO_DOCTOR]   expo-camera@14.0.6 - expected version: ~14.1.3
[RUN_EXPO_DOCTOR] Your project may not work correctly until you install the correct versions of the packages.
[RUN_EXPO_DOCTOR] Found outdated dependencies
[RUN_EXPO_DOCTOR] Advice:
[RUN_EXPO_DOCTOR] Use 'npx expo install --check' to review and upgrade your dependencies.
[RUN_EXPO_DOCTOR] To ignore specific packages, add them to "expo.install.exclude" in package.json. Learn more: https://expo.fyi/dependency-validation
[RUN_EXPO_DOCTOR] 4 checks failed, indicating possible issues with the project.
[RUN_EXPO_DOCTOR] Command "expo doctor" failed.
Error: npx -y expo-doctor exited with non-zero code: 1
    at ChildProcess.completionListener (/home/manoj-amavasya/.npm/_npx/cea150089446b3cb/node_modules/@expo/spawn-async/build/spawnAsync.js:113:23)
    at Object.onceWrapper (node:events:631:26)
    at ChildProcess.emit (node:events:509:28)
    at ChildProcess.emit (node:domain:489:12)
    at maybeClose (node:internal/child_process:1124:16)
    at ChildProcess._handle.onexit (node:internal/child_process:306:5)
    ...
    at spawnAsync (/home/manoj-amavasya/.npm/_npx/cea150089446b3cb/node_modules/@expo/spawn-async/build/spawnAsync.js:9:23)
    at spawn (/home/manoj-amavasya/.npm/_npx/cea150089446b3cb/node_modules/@expo/turtle-spawn/dist/index.js:16:47)
    at runExpoDoctor (/home/manoj-amavasya/.npm/_npx/cea150089446b3cb/node_modules/@expo/build-tools/dist/common/setup.js:139:52)
    at process.processTicksAndRejections (node:internal/process/task_queues:104:5)
    at async /home/manoj-amavasya/.npm/_npx/cea150089446b3cb/node_modules/@expo/build-tools/dist/common/setup.js:118:17
    at async BuildContext.runBuildPhase (/home/manoj-amavasya/.npm/_npx/cea150089446b3cb/node_modules/@expo/build-tools/dist/context.js:126:28)
    at async setupAsync (/home/manoj-amavasya/.npm/_npx/cea150089446b3cb/node_modules/@expo/build-tools/dist/common/setup.js:116:9)
    at async buildAsync (/home/manoj-amavasya/.npm/_npx/cea150089446b3cb/node_modules/@expo/build-tools/dist/builders/android.js:44:5)
    at async runBuilderWithHooksAsync (/home/manoj-amavasya/.npm/_npx/cea150089446b3cb/node_modules/@expo/build-tools/dist/builders/common.js:12:13)
    at async Object.androidBuilder (/home/manoj-amavasya/.npm/_npx/cea150089446b3cb/node_modules/@expo/build-tools/dist/builders/android.js:31:16)
[PREBUILD] Skipped running "expo prebuild" because the "android" directory already exists. Learn more about the build process: https://docs.expo.dev/build-reference/android-builds/
[RESTORE_CACHE] Local builds do not support restoring cache
[PREPARE_CREDENTIALS] Writing secrets to the project's directory
[PREPARE_CREDENTIALS] Injecting signing config into build.gradle
[PREPARE_CREDENTIALS] Signing config injected
[RUN_GRADLEW] Running 'gradlew :app:bundleRelease' in /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/android
[RUN_GRADLEW] Starting a Gradle Daemon, 1 busy and 1 incompatible Daemons could not be reused, use --status for details
[RUN_GRADLEW] > Task :gradle-plugin:pluginDescriptors
[RUN_GRADLEW] > Task :gradle-plugin:processResources
[RUN_GRADLEW] > Task :gradle-plugin:compileKotlin
[RUN_GRADLEW] > Task :gradle-plugin:compileJava NO-SOURCE
[RUN_GRADLEW] > Task :gradle-plugin:classes
[RUN_GRADLEW] > Task :gradle-plugin:jar
[RUN_GRADLEW] > Task :gradle-plugin:inspectClassesForKotlinIC
[RUN_GRADLEW] > Configure project :expo
[RUN_GRADLEW] Using expo modules
[RUN_GRADLEW] - expo-camera (14.0.6)
[RUN_GRADLEW]   - expo-constants (15.4.6)
[RUN_GRADLEW]   - expo-file-system (16.0.9)
[RUN_GRADLEW]   - expo-font (11.10.3)
[RUN_GRADLEW]   - expo-keep-awake (12.8.2)
[RUN_GRADLEW]   - expo-modules-core (1.11.14)
[RUN_GRADLEW]   - expo-modules-core$android-annotation (1.11.14)
[RUN_GRADLEW]   - expo-modules-core$android-annotation-processor (1.11.14)
[RUN_GRADLEW]   - expo-sharing (11.10.0)
[RUN_GRADLEW] > Task :app:createBundleReleaseJsAndAssets
[RUN_GRADLEW] Writing bundle output to: /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle
[RUN_GRADLEW] Writing sourcemap output to: /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/android/app/build/intermediates/sourcemaps/react/release/index.android.bundle.packager.map
[RUN_GRADLEW] Copying 25 asset files
[RUN_GRADLEW] Done writing bundle output
[RUN_GRADLEW] Done writing sourcemap output
[RUN_GRADLEW] /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:3423:16: warning: the variable "SharedArrayBuffer" was not declared in function "from"
[RUN_GRADLEW] if (typeof SharedArrayBuffer !== 'undefined' && (isInstance(value, Shared...
[RUN_GRADLEW]                ^~~~~~~~~~~~~~~~~
[RUN_GRADLEW] /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:8166:18: warning: the variable "DebuggerInternal" was not declared in function "__shouldPauseOnThrow"
[RUN_GRADLEW]           typeof DebuggerInternal !== 'undefined' &&
[RUN_GRADLEW]                  ^~~~~~~~~~~~~~~~
[RUN_GRADLEW] /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:18917:7: warning: the variable "setTimeout" was not declared in function "logCapturedError"
[RUN_GRADLEW] setTimeout(function () {
[RUN_GRADLEW]       ^~~~~~~~~~
[RUN_GRADLEW] /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:16877:108: warning: the variable "nativeFabricUIManager" was not declared in function "onChange"
[RUN_GRADLEW] ...lInstanceHandle ? (from && nativeFabricUIManager.setIsJSResponder(from.sta...
[RUN_GRADLEW]                               ^~~~~~~~~~~~~~~~~~~~~
[RUN_GRADLEW] /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:17498:21: warning: the variable "clearTimeout" was not declared in anonymous function " 349#"
[RUN_GRADLEW]     cancelTimeout = clearTimeout;
[RUN_GRADLEW]                     ^~~~~~~~~~~~
[RUN_GRADLEW] /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:21248:30: warning: the variable "__REACT_DEVTOOLS_GLOBAL_HOOK__" was not declared in anonymous function " 349#"
[RUN_GRADLEW]   if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
[RUN_GRADLEW]                              ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
[RUN_GRADLEW] /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:22778:5: warning: the variable "setImmediate" was not declared in function "handleResolved"
[RUN_GRADLEW]     setImmediate(function () {
[RUN_GRADLEW]     ^~~~~~~~~~~~
[RUN_GRADLEW] /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:26779:5: warning: the variable "fetch" was not declared in anonymous function " 565#"
[RUN_GRADLEW]     fetch,
[RUN_GRADLEW]     ^~~~~
[RUN_GRADLEW] /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:26780:5: warning: the variable "Headers" was not declared in anonymous function " 565#"
[RUN_GRADLEW]     Headers,
[RUN_GRADLEW]     ^~~~~~~
[RUN_GRADLEW] /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:26781:5: warning: the variable "Request" was not declared in anonymous function " 565#"
[RUN_GRADLEW]     Request,
[RUN_GRADLEW]     ^~~~~~~
[RUN_GRADLEW] /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:26782:5: warning: the variable "Response" was not declared in anonymous function " 565#"
[RUN_GRADLEW]     Response
[RUN_GRADLEW]     ^~~~~~~~
[RUN_GRADLEW] /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:26939:24: warning: the variable "FileReader" was not declared in function "readBlobAsArrayBuffer"
[RUN_GRADLEW]       var reader = new FileReader();
[RUN_GRADLEW]                        ^~~~~~~~~~
[RUN_GRADLEW] /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:26990:36: warning: the variable "Blob" was not declared in anonymous function " 576#"
[RUN_GRADLEW]         } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
[RUN_GRADLEW]                                    ^~~~
[RUN_GRADLEW] /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:26992:40: warning: the variable "FormData" was not declared in anonymous function " 576#"
[RUN_GRADLEW]         } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
[RUN_GRADLEW]                                        ^~~~~~~~
[RUN_GRADLEW] /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:26994:44: warning: the variable "URLSearchParams" was not declared in anonymous function " 576#"
[RUN_GRADLEW] ...e if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body...
[RUN_GRADLEW]                                  ^~~~~~~~~~~~~~~
[RUN_GRADLEW] /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:27113:26: warning: the variable "AbortController" was not declared in anonymous function " 582#"
[RUN_GRADLEW]           var ctrl = new AbortController();
[RUN_GRADLEW]                          ^~~~~~~~~~~~~~~
[RUN_GRADLEW] /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:27247:23: warning: the variable "XMLHttpRequest" was not declared in anonymous function " 586#"
[RUN_GRADLEW]         var xhr = new XMLHttpRequest();
[RUN_GRADLEW] ^~~~~~~~~~~~~~
[RUN_GRADLEW] /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:26792:71: warning: the variable "self" was not declared in anonymous function " 568#"
[RUN_GRADLEW] ...undefined' && globalThis || typeof self !== 'undefined' && self ||
[RUN_GRADLEW]                                       ^~~~
[RUN_GRADLEW] /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:31442:27: warning: the variable "performance" was not declared in anonymous function " 760#"
[RUN_GRADLEW]   if ("object" === typeof performance && "function" === typeof performance.no...
[RUN_GRADLEW]                           ^~~~~~~~~~~
[RUN_GRADLEW] /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:31465:26: warning: the variable "navigator" was not declared in anonymous function " 760#"
[RUN_GRADLEW]   "undefined" !== typeof navigator && undefined !== navigator.scheduling && u...
[RUN_GRADLEW]                          ^~~~~~~~~
[RUN_GRADLEW] /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:31575:37: warning: the variable "MessageChannel" was not declared in anonymous function " 760#"
[RUN_GRADLEW]   };else if ("undefined" !== typeof MessageChannel) {
[RUN_GRADLEW]                                     ^~~~~~~~~~~~~~
[RUN_GRADLEW] /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:31590:34: warning: the variable "nativeRuntimeScheduler" was not declared in anonymous function " 760#"
[RUN_GRADLEW] ... = "undefined" !== typeof nativeRuntimeScheduler ? nativeRuntimeScheduler....
[RUN_GRADLEW]                              ^~~~~~~~~~~~~~~~~~~~~~
[RUN_GRADLEW] /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:43538:34: warning: the variable "requestAnimationFrame" was not declared in function "start 9#"
[RUN_GRADLEW] ...    this._animationFrame = requestAnimationFrame(this.onUpdate.bind(this));
[RUN_GRADLEW]                               ^~~~~~~~~~~~~~~~~~~~~
[RUN_GRADLEW] /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:67967:38: warning: the variable "document" was not declared in anonymous function " 1818#"
[RUN_GRADLEW] ...r useClientLayoutEffect = typeof document !== 'undefined' || typeof naviga...
[RUN_GRADLEW]                                     ^~~~~~~~
[RUN_GRADLEW] /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle:101685:18: warning: the variable "localStorage" was not declared in function "getStorage"
[RUN_GRADLEW] return localStorage;
[RUN_GRADLEW]                  ^~~~~~~~~~~~
[RUN_GRADLEW] > Task :app:generateCodegenSchemaFromJavaScript SKIPPED
[RUN_GRADLEW] > Task :app:generateCodegenArtifactsFromSchema SKIPPED
[RUN_GRADLEW] > Task :app:generatePackageList
[RUN_GRADLEW] > Task :app:preBuild
[RUN_GRADLEW] > Task :app:preReleaseBuild
[RUN_GRADLEW] > Task :app:generateReleaseResValues
[RUN_GRADLEW] > Task :expo:generateExpoModulesPackageList
[RUN_GRADLEW] > Task :expo:preBuild
[RUN_GRADLEW] > Task :expo:preReleaseBuild
[RUN_GRADLEW] > Task :expo:generateReleaseResValues
[RUN_GRADLEW] > Task :expo:generateReleaseResources
[RUN_GRADLEW] > Task :expo:packageReleaseResources
[RUN_GRADLEW] > Task :expo-camera:preBuild UP-TO-DATE
[RUN_GRADLEW] > Task :expo-camera:preReleaseBuild UP-TO-DATE
[RUN_GRADLEW] > Task :expo-camera:generateReleaseResValues
[RUN_GRADLEW] > Task :expo-camera:generateReleaseResources
[RUN_GRADLEW] > Task :expo-camera:packageReleaseResources
[RUN_GRADLEW] > Task :expo-constants:createExpoConfig
[RUN_GRADLEW] > Task :expo-constants:preBuild
[RUN_GRADLEW] > Task :expo-constants:preReleaseBuild
[RUN_GRADLEW] > Task :expo-constants:generateReleaseResValues
[RUN_GRADLEW] > Task :expo-constants:generateReleaseResources
[RUN_GRADLEW] > Task :expo-constants:packageReleaseResources
[RUN_GRADLEW] > Task :expo-file-system:preBuild UP-TO-DATE
[RUN_GRADLEW] > Task :expo-file-system:preReleaseBuild UP-TO-DATE
[RUN_GRADLEW] > Task :expo-file-system:generateReleaseResValues
[RUN_GRADLEW] > Task :expo-file-system:generateReleaseResources
[RUN_GRADLEW] > Task :expo-file-system:packageReleaseResources
[RUN_GRADLEW] > Task :expo-font:preBuild UP-TO-DATE
[RUN_GRADLEW] > Task :expo-font:preReleaseBuild UP-TO-DATE
[RUN_GRADLEW] > Task :expo-font:generateReleaseResValues
[RUN_GRADLEW] > Task :expo-font:generateReleaseResources
[RUN_GRADLEW] > Task :expo-font:packageReleaseResources
[RUN_GRADLEW] > Task :expo-keep-awake:preBuild UP-TO-DATE
[RUN_GRADLEW] > Task :expo-keep-awake:preReleaseBuild UP-TO-DATE
[RUN_GRADLEW] > Task :expo-keep-awake:generateReleaseResValues
[RUN_GRADLEW] > Task :expo-keep-awake:generateReleaseResources
[RUN_GRADLEW] > Task :expo-keep-awake:packageReleaseResources
[RUN_GRADLEW] > Task :expo-modules-core:preBuild UP-TO-DATE
[RUN_GRADLEW] > Task :expo-modules-core:preReleaseBuild UP-TO-DATE
[RUN_GRADLEW] > Task :expo-modules-core:generateReleaseResValues
[RUN_GRADLEW] > Task :expo-modules-core:generateReleaseResources
[RUN_GRADLEW] > Task :expo-modules-core:packageReleaseResources
[RUN_GRADLEW] > Task :expo-sharing:preBuild UP-TO-DATE
[RUN_GRADLEW] > Task :expo-sharing:preReleaseBuild UP-TO-DATE
[RUN_GRADLEW] > Task :expo-sharing:generateReleaseResValues
[RUN_GRADLEW] > Task :expo-sharing:generateReleaseResources
[RUN_GRADLEW] > Task :expo-sharing:packageReleaseResources
[RUN_GRADLEW] > Task :react-native-async-storage_async-storage:preBuild UP-TO-DATE
[RUN_GRADLEW] > Task :react-native-async-storage_async-storage:preReleaseBuild UP-TO-DATE
[RUN_GRADLEW] > Task :react-native-async-storage_async-storage:generateReleaseResValues
[RUN_GRADLEW] > Task :react-native-async-storage_async-storage:generateReleaseResources
[RUN_GRADLEW] > Task :react-native-async-storage_async-storage:packageReleaseResources
[RUN_GRADLEW] > Task :react-native-safe-area-context:preBuild UP-TO-DATE
[RUN_GRADLEW] > Task :react-native-safe-area-context:preReleaseBuild UP-TO-DATE
[RUN_GRADLEW] > Task :react-native-safe-area-context:generateReleaseResValues
[RUN_GRADLEW] > Task :react-native-safe-area-context:generateReleaseResources
[RUN_GRADLEW] > Task :react-native-safe-area-context:packageReleaseResources
[RUN_GRADLEW] > Task :react-native-screens:preBuild UP-TO-DATE
[RUN_GRADLEW] > Task :react-native-screens:preReleaseBuild UP-TO-DATE
[RUN_GRADLEW] > Task :react-native-screens:generateReleaseResValues
[RUN_GRADLEW] > Task :react-native-screens:generateReleaseResources
[RUN_GRADLEW] > Task :react-native-screens:packageReleaseResources
[RUN_GRADLEW] > Task :react-native-svg:preBuild UP-TO-DATE
[RUN_GRADLEW] > Task :react-native-svg:preReleaseBuild UP-TO-DATE
[RUN_GRADLEW] > Task :react-native-svg:generateReleaseResValues
[RUN_GRADLEW] > Task :react-native-svg:generateReleaseResources
[RUN_GRADLEW] > Task :react-native-svg:packageReleaseResources
[RUN_GRADLEW] > Task :app:mapReleaseSourceSetPaths
[RUN_GRADLEW] > Task :app:generateReleaseResources
[RUN_GRADLEW] > Task :app:createReleaseCompatibleScreenManifests
[RUN_GRADLEW] > Task :app:extractDeepLinksRelease
[RUN_GRADLEW] > Task :expo:extractDeepLinksRelease
[RUN_GRADLEW] > Task :expo-camera:extractDeepLinksRelease
[RUN_GRADLEW] > Task :expo-constants:extractDeepLinksRelease
[RUN_GRADLEW] > Task :expo-file-system:extractDeepLinksRelease
[RUN_GRADLEW] > Task :expo-font:extractDeepLinksRelease
[RUN_GRADLEW] > Task :expo-keep-awake:extractDeepLinksRelease
[RUN_GRADLEW] > Task :expo-modules-core:extractDeepLinksRelease
[RUN_GRADLEW] > Task :expo-file-system:processReleaseManifest
[RUN_GRADLEW] /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-file-system/android/src/main/AndroidManifest.xml:6:9-8:20 Warning:
[RUN_GRADLEW] 	provider#expo.modules.filesystem.FileSystemFileProvider@android:authorities was tagged at AndroidManifest.xml:6 to replace other declarations but no other declaration present
[RUN_GRADLEW] > Task :expo:processReleaseManifest
[RUN_GRADLEW] > Task :expo-camera:processReleaseManifest
[RUN_GRADLEW] > Task :expo-modules-core:processReleaseManifest
[RUN_GRADLEW] /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-modules-core/android/src/main/AndroidManifest.xml:8:9-11:45 Warning:
[RUN_GRADLEW] 	meta-data#com.facebook.soloader.enabled@android:value was tagged at AndroidManifest.xml:8 to replace other declarations but no other declaration present
[RUN_GRADLEW] > Task :expo-font:processReleaseManifest
[RUN_GRADLEW] > Task :expo-keep-awake:processReleaseManifest
[RUN_GRADLEW] > Task :expo-constants:processReleaseManifest
[RUN_GRADLEW] > Task :expo-sharing:extractDeepLinksRelease
[RUN_GRADLEW] > Task :react-native-async-storage_async-storage:extractDeepLinksRelease
[RUN_GRADLEW] > Task :expo-sharing:processReleaseManifest
[RUN_GRADLEW] > Task :react-native-safe-area-context:extractDeepLinksRelease
[RUN_GRADLEW] > Task :react-native-async-storage_async-storage:processReleaseManifest
[RUN_GRADLEW] package="com.reactnativecommunity.asyncstorage" found in source AndroidManifest.xml: /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/@react-native-async-storage/async-storage/android/src/main/AndroidManifest.xml.
[RUN_GRADLEW] Setting the namespace via the package attribute in the source AndroidManifest.xml is no longer supported, and the value is ignored.
[RUN_GRADLEW] Recommendation: remove package="com.reactnativecommunity.asyncstorage" from the source AndroidManifest.xml: /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/@react-native-async-storage/async-storage/android/src/main/AndroidManifest.xml.
[RUN_GRADLEW] > Task :react-native-screens:extractDeepLinksRelease
[RUN_GRADLEW] > Task :react-native-safe-area-context:processReleaseManifest
[RUN_GRADLEW] package="com.th3rdwave.safeareacontext" found in source AndroidManifest.xml: /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-safe-area-context/android/src/main/AndroidManifest.xml.
[RUN_GRADLEW] Setting the namespace via the package attribute in the source AndroidManifest.xml is no longer supported, and the value is ignored.
[RUN_GRADLEW] Recommendation: remove package="com.th3rdwave.safeareacontext" from the source AndroidManifest.xml: /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-safe-area-context/android/src/main/AndroidManifest.xml.
[RUN_GRADLEW] > Task :react-native-svg:extractDeepLinksRelease
[RUN_GRADLEW] > Task :react-native-screens:processReleaseManifest
[RUN_GRADLEW] package="com.swmansion.rnscreens" found in source AndroidManifest.xml: /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-screens/android/src/main/AndroidManifest.xml.
[RUN_GRADLEW] Setting the namespace via the package attribute in the source AndroidManifest.xml is no longer supported, and the value is ignored.
[RUN_GRADLEW] Recommendation: remove package="com.swmansion.rnscreens" from the source AndroidManifest.xml: /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-screens/android/src/main/AndroidManifest.xml.
[RUN_GRADLEW] > Task :react-native-svg:processReleaseManifest
[RUN_GRADLEW] package="com.horcrux.svg" found in source AndroidManifest.xml: /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-svg/android/src/main/AndroidManifest.xml.
[RUN_GRADLEW] Setting the namespace via the package attribute in the source AndroidManifest.xml is no longer supported, and the value is ignored.
[RUN_GRADLEW] Recommendation: remove package="com.horcrux.svg" from the source AndroidManifest.xml: /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-svg/android/src/main/AndroidManifest.xml.
[RUN_GRADLEW] > Task :expo:compileReleaseLibraryResources
[RUN_GRADLEW] > Task :app:mergeReleaseResources
[RUN_GRADLEW] > Task :app:processReleaseMainManifest
[RUN_GRADLEW] /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/android/app/src/main/AndroidManifest.xml Warning:
[RUN_GRADLEW] 	provider#expo.modules.filesystem.FileSystemFileProvider@android:authorities was tagged at AndroidManifest.xml:0 to replace other declarations but no other declaration present
[RUN_GRADLEW] > Task :app:processReleaseManifest
[RUN_GRADLEW] > Task :app:processApplicationManifestReleaseForBundle
[RUN_GRADLEW] > Task :expo-camera:compileReleaseLibraryResources
[RUN_GRADLEW] > Task :expo-constants:compileReleaseLibraryResources
[RUN_GRADLEW] > Task :expo-font:compileReleaseLibraryResources
[RUN_GRADLEW] > Task :expo-file-system:compileReleaseLibraryResources
[RUN_GRADLEW] > Task :expo-keep-awake:compileReleaseLibraryResources
[RUN_GRADLEW] > Task :expo-modules-core:compileReleaseLibraryResources
[RUN_GRADLEW] > Task :expo-sharing:compileReleaseLibraryResources
[RUN_GRADLEW] > Task :react-native-async-storage_async-storage:compileReleaseLibraryResources
[RUN_GRADLEW] > Task :react-native-safe-area-context:compileReleaseLibraryResources
[RUN_GRADLEW] > Task :react-native-svg:compileReleaseLibraryResources
[RUN_GRADLEW] > Task :react-native-screens:compileReleaseLibraryResources
[RUN_GRADLEW] > Task :react-native-async-storage_async-storage:generateReleaseBuildConfig
[RUN_GRADLEW] > Task :react-native-async-storage_async-storage:javaPreCompileRelease
[RUN_GRADLEW] > Task :react-native-async-storage_async-storage:parseReleaseLocalResources
[RUN_GRADLEW] > Task :expo-modules-core$android-annotation:processResources NO-SOURCE
[RUN_GRADLEW] > Task :expo-modules-core$android-annotation-processor:processResources
[RUN_GRADLEW] > Task :expo:generateReleaseBuildConfig
[RUN_GRADLEW] > Task :expo-camera:generateReleaseBuildConfig
[RUN_GRADLEW] > Task :expo:parseReleaseLocalResources
[RUN_GRADLEW] > Task :expo-camera:parseReleaseLocalResources
[RUN_GRADLEW] > Task :expo-modules-core:generateReleaseBuildConfig
[RUN_GRADLEW] > Task :react-native-async-storage_async-storage:generateReleaseRFile
[RUN_GRADLEW] > Task :expo:generateReleaseRFile
[RUN_GRADLEW] > Task :app:bundleReleaseResources
[RUN_GRADLEW] > Task :expo-modules-core$android-annotation:compileKotlin
[RUN_GRADLEW] > Task :react-native-async-storage_async-storage:compileReleaseJavaWithJavac
[RUN_GRADLEW] Note: Some input files use or override a deprecated API.
[RUN_GRADLEW] Note: Recompile with -Xlint:deprecation for details.
[RUN_GRADLEW] Note: /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/@react-native-async-storage/async-storage/android/src/javaPackage/java/com/reactnativecommunity/asyncstorage/AsyncStoragePackage.java uses unchecked or unsafe operations.
[RUN_GRADLEW] Note: Recompile with -Xlint:unchecked for details.
[RUN_GRADLEW] > Task :expo-modules-core$android-annotation:compileJava NO-SOURCE
[RUN_GRADLEW] > Task :expo-modules-core$android-annotation:classes UP-TO-DATE
[RUN_GRADLEW] > Task :expo-modules-core$android-annotation:jar
[RUN_GRADLEW] > Task :expo-modules-core$android-annotation:inspectClassesForKotlinIC
[RUN_GRADLEW] > Task :react-native-async-storage_async-storage:bundleLibRuntimeToJarRelease
[RUN_GRADLEW] > Task :expo-camera:generateReleaseRFile
[RUN_GRADLEW] > Task :expo-modules-core:parseReleaseLocalResources
[RUN_GRADLEW] > Task :expo-modules-core:javaPreCompileRelease
[RUN_GRADLEW] > Task :expo-modules-core:generateReleaseRFile
[RUN_GRADLEW] > Task :expo-camera:javaPreCompileRelease
[RUN_GRADLEW] > Task :expo-constants:generateReleaseBuildConfig
[RUN_GRADLEW] > Task :expo-constants:javaPreCompileRelease
[RUN_GRADLEW] > Task :expo-constants:parseReleaseLocalResources
[RUN_GRADLEW] > Task :expo-file-system:generateReleaseBuildConfig
[RUN_GRADLEW] > Task :expo-constants:generateReleaseRFile
[RUN_GRADLEW] > Task :expo-file-system:javaPreCompileRelease
[RUN_GRADLEW] > Task :expo-font:generateReleaseBuildConfig
[RUN_GRADLEW] > Task :expo-font:javaPreCompileRelease
[RUN_GRADLEW] > Task :expo-font:parseReleaseLocalResources
[RUN_GRADLEW] > Task :expo-keep-awake:generateReleaseBuildConfig
[RUN_GRADLEW] > Task :expo-font:generateReleaseRFile
[RUN_GRADLEW] > Task :expo-keep-awake:javaPreCompileRelease
[RUN_GRADLEW] > Task :expo-keep-awake:parseReleaseLocalResources
[RUN_GRADLEW] > Task :expo-sharing:generateReleaseBuildConfig
[RUN_GRADLEW] > Task :expo-file-system:parseReleaseLocalResources
[RUN_GRADLEW] > Task :expo-sharing:javaPreCompileRelease
[RUN_GRADLEW] > Task :expo-sharing:parseReleaseLocalResources
[RUN_GRADLEW] > Task :expo-keep-awake:generateReleaseRFile
[RUN_GRADLEW] > Task :expo:javaPreCompileRelease
[RUN_GRADLEW] > Task :expo-file-system:generateReleaseRFile
[RUN_GRADLEW] > Task :expo-sharing:generateReleaseRFile
[RUN_GRADLEW] > Task :react-native-safe-area-context:generateReleaseBuildConfig
[RUN_GRADLEW] > Task :react-native-safe-area-context:javaPreCompileRelease
[RUN_GRADLEW] > Task :react-native-safe-area-context:parseReleaseLocalResources
[RUN_GRADLEW] > Task :react-native-screens:generateReleaseBuildConfig
[RUN_GRADLEW] > Task :react-native-safe-area-context:generateReleaseRFile
[RUN_GRADLEW] > Task :react-native-screens:javaPreCompileRelease
[RUN_GRADLEW] > Task :react-native-screens:parseReleaseLocalResources
[RUN_GRADLEW] > Task :react-native-svg:generateReleaseBuildConfig
[RUN_GRADLEW] > Task :react-native-screens:generateReleaseRFile
[RUN_GRADLEW] > Task :react-native-svg:parseReleaseLocalResources
[RUN_GRADLEW] > Task :react-native-svg:javaPreCompileRelease
[RUN_GRADLEW] > Task :react-native-svg:generateReleaseRFile
[RUN_GRADLEW] > Task :app:checkReleaseDuplicateClasses
[RUN_GRADLEW] > Task :expo-modules-core$android-annotation-processor:compileKotlin
[RUN_GRADLEW] > Task :react-native-svg:compileReleaseJavaWithJavac
[RUN_GRADLEW] /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-svg/android/src/main/java/com/horcrux/svg/RNSVGRenderableManager.java:11: warning: [removal] StandardCharsets in com.facebook.react.common has been deprecated and marked for removal
[RUN_GRADLEW] import static com.facebook.react.common.StandardCharsets.UTF_8;
[RUN_GRADLEW]                                        ^
[RUN_GRADLEW] Note: Some input files use or override a deprecated API.
[RUN_GRADLEW] Note: Recompile with -Xlint:deprecation for details.
[RUN_GRADLEW] Note: Some input files use unchecked or unsafe operations.
[RUN_GRADLEW] Note: Recompile with -Xlint:unchecked for details.
[RUN_GRADLEW] 1 warning
[RUN_GRADLEW] > Task :expo-modules-core$android-annotation-processor:compileJava NO-SOURCE
[RUN_GRADLEW] > Task :expo-modules-core$android-annotation-processor:classes
[RUN_GRADLEW] > Task :expo-modules-core$android-annotation-processor:jar
[RUN_GRADLEW] > Task :expo-modules-core$android-annotation-processor:inspectClassesForKotlinIC
[RUN_GRADLEW] > Task :react-native-svg:bundleLibRuntimeToJarRelease
[RUN_GRADLEW] > Task :expo-modules-core:compileReleaseKotlin
[RUN_GRADLEW] > Task :app:buildKotlinToolingMetadata
[RUN_GRADLEW] > Task :app:generateReleaseBuildConfig
[RUN_GRADLEW] > Task :expo-constants:writeReleaseAarMetadata
[RUN_GRADLEW] > Task :expo:writeReleaseAarMetadata
[RUN_GRADLEW] > Task :expo-camera:writeReleaseAarMetadata
[RUN_GRADLEW] > Task :expo-file-system:writeReleaseAarMetadata
[RUN_GRADLEW] > Task :expo-font:writeReleaseAarMetadata
[RUN_GRADLEW] > Task :expo-keep-awake:writeReleaseAarMetadata
[RUN_GRADLEW] > Task :expo-modules-core:writeReleaseAarMetadata
[RUN_GRADLEW] > Task :expo-sharing:writeReleaseAarMetadata
[RUN_GRADLEW] > Task :react-native-async-storage_async-storage:writeReleaseAarMetadata
[RUN_GRADLEW] > Task :react-native-safe-area-context:writeReleaseAarMetadata
[RUN_GRADLEW] > Task :react-native-screens:writeReleaseAarMetadata
[RUN_GRADLEW] > Task :react-native-svg:writeReleaseAarMetadata
[RUN_GRADLEW] > Task :app:packageReleaseResources
[RUN_GRADLEW] > Task :app:checkReleaseAarMetadata
[RUN_GRADLEW] > Task :app:parseReleaseLocalResources
[RUN_GRADLEW] > Task :app:javaPreCompileRelease
[RUN_GRADLEW] > Task :react-native-async-storage_async-storage:bundleLibCompileToJarRelease
[RUN_GRADLEW] > Task :react-native-svg:bundleLibCompileToJarRelease
[RUN_GRADLEW] > Task :app:desugarReleaseFileDependencies
[RUN_GRADLEW] > Task :react-native-safe-area-context:compileReleaseKotlin
[RUN_GRADLEW] > Task :react-native-screens:compileReleaseKotlin
[RUN_GRADLEW] > Task :app:mergeReleaseShaders
[RUN_GRADLEW] > Task :app:compileReleaseShaders NO-SOURCE
[RUN_GRADLEW] > Task :app:generateReleaseAssets UP-TO-DATE
[RUN_GRADLEW] > Task :expo:mergeReleaseShaders
[RUN_GRADLEW] > Task :expo:compileReleaseShaders NO-SOURCE
[RUN_GRADLEW] > Task :expo:generateReleaseAssets UP-TO-DATE
[RUN_GRADLEW] > Task :expo:packageReleaseAssets
[RUN_GRADLEW] > Task :expo-camera:mergeReleaseShaders
[RUN_GRADLEW] > Task :expo-camera:compileReleaseShaders NO-SOURCE
[RUN_GRADLEW] > Task :expo-camera:generateReleaseAssets UP-TO-DATE
[RUN_GRADLEW] > Task :app:processReleaseManifestForPackage
[RUN_GRADLEW] > Task :expo-camera:packageReleaseAssets
[RUN_GRADLEW] > Task :expo-constants:mergeReleaseShaders
[RUN_GRADLEW] > Task :expo-constants:compileReleaseShaders NO-SOURCE
[RUN_GRADLEW] > Task :expo-constants:generateReleaseAssets UP-TO-DATE
[RUN_GRADLEW] > Task :expo-constants:packageReleaseAssets
[RUN_GRADLEW] > Task :expo-file-system:mergeReleaseShaders
[RUN_GRADLEW] > Task :expo-file-system:compileReleaseShaders NO-SOURCE
[RUN_GRADLEW] > Task :expo-file-system:generateReleaseAssets UP-TO-DATE
[RUN_GRADLEW] > Task :expo-file-system:packageReleaseAssets
[RUN_GRADLEW] > Task :expo-font:mergeReleaseShaders
[RUN_GRADLEW] > Task :expo-font:compileReleaseShaders NO-SOURCE
[RUN_GRADLEW] > Task :expo-font:generateReleaseAssets UP-TO-DATE
[RUN_GRADLEW] > Task :expo-font:packageReleaseAssets
[RUN_GRADLEW] > Task :expo-keep-awake:mergeReleaseShaders
[RUN_GRADLEW] > Task :expo-keep-awake:compileReleaseShaders NO-SOURCE
[RUN_GRADLEW] > Task :expo-keep-awake:generateReleaseAssets UP-TO-DATE
[RUN_GRADLEW] > Task :expo-keep-awake:packageReleaseAssets
[RUN_GRADLEW] > Task :expo-modules-core:mergeReleaseShaders
[RUN_GRADLEW] > Task :expo-modules-core:compileReleaseShaders NO-SOURCE
[RUN_GRADLEW] > Task :expo-modules-core:generateReleaseAssets UP-TO-DATE
[RUN_GRADLEW] > Task :expo-modules-core:packageReleaseAssets
[RUN_GRADLEW] > Task :expo-sharing:mergeReleaseShaders
[RUN_GRADLEW] > Task :expo-sharing:compileReleaseShaders NO-SOURCE
[RUN_GRADLEW] > Task :expo-sharing:generateReleaseAssets UP-TO-DATE
[RUN_GRADLEW] > Task :expo-sharing:packageReleaseAssets
[RUN_GRADLEW] > Task :react-native-async-storage_async-storage:mergeReleaseShaders
[RUN_GRADLEW] > Task :react-native-async-storage_async-storage:compileReleaseShaders NO-SOURCE
[RUN_GRADLEW] > Task :react-native-async-storage_async-storage:generateReleaseAssets UP-TO-DATE
[RUN_GRADLEW] > Task :react-native-async-storage_async-storage:packageReleaseAssets
[RUN_GRADLEW] > Task :react-native-safe-area-context:mergeReleaseShaders
[RUN_GRADLEW] > Task :react-native-safe-area-context:compileReleaseShaders NO-SOURCE
[RUN_GRADLEW] > Task :react-native-safe-area-context:generateReleaseAssets UP-TO-DATE
[RUN_GRADLEW] > Task :react-native-safe-area-context:packageReleaseAssets
[RUN_GRADLEW] > Task :react-native-screens:mergeReleaseShaders
[RUN_GRADLEW] > Task :react-native-screens:compileReleaseShaders NO-SOURCE
[RUN_GRADLEW] > Task :react-native-screens:generateReleaseAssets UP-TO-DATE
[RUN_GRADLEW] > Task :react-native-screens:packageReleaseAssets
[RUN_GRADLEW] > Task :react-native-svg:mergeReleaseShaders
[RUN_GRADLEW] > Task :react-native-svg:compileReleaseShaders NO-SOURCE
[RUN_GRADLEW] > Task :react-native-svg:generateReleaseAssets UP-TO-DATE
[RUN_GRADLEW] > Task :react-native-svg:packageReleaseAssets
[RUN_GRADLEW] > Task :app:mergeReleaseAssets
[RUN_GRADLEW] > Task :react-native-async-storage_async-storage:processReleaseJavaRes NO-SOURCE
[RUN_GRADLEW] > Task :react-native-svg:processReleaseJavaRes NO-SOURCE
[RUN_GRADLEW] > Task :app:mergeReleaseJniLibFolders
[RUN_GRADLEW] > Task :expo:mergeReleaseJniLibFolders
[RUN_GRADLEW] > Task :expo:mergeReleaseNativeLibs NO-SOURCE
[RUN_GRADLEW] > Task :expo:copyReleaseJniLibsProjectOnly
[RUN_GRADLEW] > Task :expo-camera:mergeReleaseJniLibFolders
[RUN_GRADLEW] > Task :expo-camera:mergeReleaseNativeLibs NO-SOURCE
[RUN_GRADLEW] > Task :expo-camera:copyReleaseJniLibsProjectOnly
[RUN_GRADLEW] > Task :expo-constants:mergeReleaseJniLibFolders
[RUN_GRADLEW] > Task :expo-constants:mergeReleaseNativeLibs NO-SOURCE
[RUN_GRADLEW] > Task :expo-constants:copyReleaseJniLibsProjectOnly
[RUN_GRADLEW] > Task :expo-file-system:mergeReleaseJniLibFolders
[RUN_GRADLEW] > Task :expo-file-system:mergeReleaseNativeLibs NO-SOURCE
[RUN_GRADLEW] > Task :expo-file-system:copyReleaseJniLibsProjectOnly
[RUN_GRADLEW] > Task :expo-font:mergeReleaseJniLibFolders
[RUN_GRADLEW] > Task :expo-font:mergeReleaseNativeLibs NO-SOURCE
[RUN_GRADLEW] > Task :expo-font:copyReleaseJniLibsProjectOnly
[RUN_GRADLEW] > Task :expo-keep-awake:mergeReleaseJniLibFolders
[RUN_GRADLEW] > Task :expo-keep-awake:mergeReleaseNativeLibs NO-SOURCE
[RUN_GRADLEW] > Task :expo-keep-awake:copyReleaseJniLibsProjectOnly
[RUN_GRADLEW] > Task :expo-modules-core:configureCMakeRelWithDebInfo[arm64-v8a]
[RUN_GRADLEW] [CXX5304] This version only understands SDK XML versions up to 3 but an SDK XML file of version 4 was encountered. This can happen if you use versions of Android Studio and the command-line tools that were released at different times.
[RUN_GRADLEW] [CXX5304] This version only understands SDK XML versions up to 3 but an SDK XML file of version 4 was encountered. This can happen if you use versions of Android Studio and the command-line tools that were released at different times.
[RUN_GRADLEW] > Task :react-native-safe-area-context:compileReleaseKotlin
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaContextModule.kt:7:46 'ReactModule' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaContextModule.kt:9:2 'ReactModule' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaContextPackage.kt:6:46 'ReactModule' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaContextPackage.kt:26:51 'ReactModule' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaContextPackage.kt:28:11 'constructor ReactModuleInfo(String!, String!, Boolean, Boolean, Boolean, Boolean, Boolean)' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaContextPackage.kt:34:27 'hasConstants: Boolean' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaProviderManager.kt:4:46 'ReactModule' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaProviderManager.kt:11:2 'ReactModule' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaView.kt:59:23 'getter for uiImplementation: UIImplementation!' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaViewManager.kt:4:46 'ReactModule' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaViewManager.kt:14:2 'ReactModule' is deprecated. Deprecated in Java
[RUN_GRADLEW] > Task :app:processReleaseResources
[RUN_GRADLEW] > Task :react-native-safe-area-context:compileReleaseJavaWithJavac
[RUN_GRADLEW] > Task :react-native-safe-area-context:bundleLibRuntimeToJarRelease
[RUN_GRADLEW] Note: /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-safe-area-context/android/src/paper/java/com/th3rdwave/safeareacontext/NativeSafeAreaContextSpec.java uses or overrides a deprecated API.
[RUN_GRADLEW] Note: Recompile with -Xlint:deprecation for details.
[RUN_GRADLEW] > Task :react-native-safe-area-context:bundleLibCompileToJarRelease
[RUN_GRADLEW] > Task :react-native-safe-area-context:processReleaseJavaRes
[RUN_GRADLEW] > Task :app:mergeExtDexRelease
[RUN_GRADLEW] > Task :expo-modules-core:buildCMakeRelWithDebInfo[arm64-v8a]
[RUN_GRADLEW] > Task :react-native-screens:compileReleaseKotlin
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenContainerViewManager.kt:5:46 'ReactModule' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenContainerViewManager.kt:10:2 'ReactModule' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackFragment.kt:65:28 'setter for targetElevation: Float' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackFragment.kt:128:28 'setter for targetElevation: Float' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackHeaderConfig.kt:86:34 'getter for systemWindowInsetTop: Int' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackHeaderConfig.kt:229:37 'setColorFilter(Int, PorterDuff.Mode): Unit' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackHeaderConfigViewManager.kt:7:46 'ReactModule' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackHeaderConfigViewManager.kt:18:2 'ReactModule' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackHeaderSubviewManager.kt:4:46 'ReactModule' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackHeaderSubviewManager.kt:12:2 'ReactModule' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackViewManager.kt:6:46 'ReactModule' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackViewManager.kt:15:2 'ReactModule' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenViewManager.kt:6:46 'ReactModule' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenViewManager.kt:24:2 'ReactModule' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenViewManager.kt:47:42 'setStateWrapper(StateWrapper!): Unit' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:137:47 'replaceSystemWindowInsets(Int, Int, Int, Int): WindowInsetsCompat' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:138:51 'getter for systemWindowInsetLeft: Int' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:140:51 'getter for systemWindowInsetRight: Int' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:141:51 'getter for systemWindowInsetBottom: Int' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/SearchBarManager.kt:6:46 'ReactModule' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/SearchBarManager.kt:17:2 'ReactModule' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/SearchBarManager.kt:100:22 Parameter 'view' is never used
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/SearchBarManager.kt:100:43 Parameter 'placeholder' is never used
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/SearchBarView.kt:147:43 Parameter 'flag' is never used
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/events/HeaderHeightChangeEvent.kt:5:44 'RCTEventEmitter' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/events/HeaderHeightChangeEvent.kt:10:5 'constructor Event<T : Event<(raw) Event<*>>!>(Int)' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/events/HeaderHeightChangeEvent.kt:17:44 'RCTEventEmitter' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/events/HeaderHeightChangeEvent.kt:20:25 'receiveEvent(Int, String!, WritableMap?): Unit' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-screens/android/src/paper/java/com/swmansion/rnscreens/FabricEnabledViewGroup.kt:5:37 'FabricViewStateManager' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-screens/android/src/paper/java/com/swmansion/rnscreens/FabricEnabledViewGroup.kt:9:48 'FabricViewStateManager' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-screens/android/src/paper/java/com/swmansion/rnscreens/FabricEnabledViewGroup.kt:11:42 Parameter 'width' is never used
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/react-native-screens/android/src/paper/java/com/swmansion/rnscreens/FabricEnabledViewGroup.kt:11:54 Parameter 'height' is never used
[RUN_GRADLEW] > Task :expo-modules-core:configureCMakeRelWithDebInfo[armeabi-v7a]
[RUN_GRADLEW] > Task :react-native-screens:compileReleaseJavaWithJavac
[RUN_GRADLEW] > Task :react-native-screens:bundleLibRuntimeToJarRelease
[RUN_GRADLEW] > Task :react-native-screens:processReleaseJavaRes
[RUN_GRADLEW] > Task :react-native-screens:bundleLibCompileToJarRelease
[RUN_GRADLEW] > Task :expo-modules-core:buildCMakeRelWithDebInfo[armeabi-v7a]
[RUN_GRADLEW] > Task :expo-modules-core:configureCMakeRelWithDebInfo[x86]
[RUN_GRADLEW] > Task :expo-modules-core:buildCMakeRelWithDebInfo[x86]
[RUN_GRADLEW] > Task :expo-modules-core:configureCMakeRelWithDebInfo[x86_64]
[RUN_GRADLEW] > Task :expo-modules-core:buildCMakeRelWithDebInfo[x86_64]
[RUN_GRADLEW] > Task :expo-modules-core:mergeReleaseJniLibFolders
[RUN_GRADLEW] > Task :expo-sharing:mergeReleaseJniLibFolders
[RUN_GRADLEW] > Task :expo-sharing:mergeReleaseNativeLibs NO-SOURCE
[RUN_GRADLEW] > Task :expo-sharing:copyReleaseJniLibsProjectOnly
[RUN_GRADLEW] > Task :react-native-async-storage_async-storage:mergeReleaseJniLibFolders
[RUN_GRADLEW] > Task :react-native-async-storage_async-storage:mergeReleaseNativeLibs NO-SOURCE
[RUN_GRADLEW] > Task :react-native-async-storage_async-storage:copyReleaseJniLibsProjectOnly
[RUN_GRADLEW] > Task :react-native-safe-area-context:mergeReleaseJniLibFolders
[RUN_GRADLEW] > Task :react-native-safe-area-context:mergeReleaseNativeLibs NO-SOURCE
[RUN_GRADLEW] > Task :react-native-safe-area-context:copyReleaseJniLibsProjectOnly
[RUN_GRADLEW] > Task :react-native-screens:mergeReleaseJniLibFolders
[RUN_GRADLEW] > Task :react-native-screens:mergeReleaseNativeLibs NO-SOURCE
[RUN_GRADLEW] > Task :react-native-screens:copyReleaseJniLibsProjectOnly
[RUN_GRADLEW] > Task :react-native-svg:mergeReleaseJniLibFolders
[RUN_GRADLEW] > Task :react-native-svg:mergeReleaseNativeLibs NO-SOURCE
[RUN_GRADLEW] > Task :react-native-svg:copyReleaseJniLibsProjectOnly
[RUN_GRADLEW] > Task :app:writeReleaseAppMetadata
[RUN_GRADLEW] > Task :expo:prepareReleaseArtProfile
[RUN_GRADLEW] > Task :expo-modules-core:mergeReleaseNativeLibs
[RUN_GRADLEW] > Task :expo-camera:prepareReleaseArtProfile
[RUN_GRADLEW] > Task :expo-constants:prepareReleaseArtProfile
[RUN_GRADLEW] > Task :expo-file-system:prepareReleaseArtProfile
[RUN_GRADLEW] > Task :expo-font:prepareReleaseArtProfile
[RUN_GRADLEW] > Task :expo-keep-awake:prepareReleaseArtProfile
[RUN_GRADLEW] > Task :expo-modules-core:prepareReleaseArtProfile
[RUN_GRADLEW] > Task :expo-sharing:prepareReleaseArtProfile
[RUN_GRADLEW] > Task :react-native-async-storage_async-storage:prepareReleaseArtProfile
[RUN_GRADLEW] > Task :react-native-safe-area-context:prepareReleaseArtProfile
[RUN_GRADLEW] > Task :react-native-screens:prepareReleaseArtProfile
[RUN_GRADLEW] > Task :react-native-svg:prepareReleaseArtProfile
[RUN_GRADLEW] > Task :expo-modules-core:copyReleaseJniLibsProjectOnly
[RUN_GRADLEW] > Task :app:mergeReleaseArtProfile
[RUN_GRADLEW] > Task :expo-modules-core:compileReleaseKotlin
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/core/utilities/EmulatorUtilities.kt:30:13 'SERIAL: String!' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/AppContext.kt:151:13 Variable 'catalystInstance' is never used
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/ExpoModulesHelper.kt:11:21 'newInstance(): T!' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/Promise.kt:72:18 This declaration overrides deprecated member but not marked as deprecated itself. This deprecation won't be inherited in future releases. Please add @Deprecated annotation or suppress. See https://youtrack.jetbrains.com/issue/KT-47902 for details
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/Utils.kt:8:3 Expected performance impact from inlining is insignificant. Inlining works best for functions with parameters of functional types
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/activityresult/ActivityResultsManager.kt:51:24 Parameter 'activity' is never used
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/activityresult/AppContextActivityResultRegistry.kt:119:51 'getParcelableExtra(String!): T?' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/activityresult/AppContextActivityResultRegistry.kt:186:26 'getParcelable(String?): T?' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/activityresult/AppContextActivityResultRegistry.kt:277:83 'getParcelable(String?): T?' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/activityresult/DataPersistor.kt:67:20 'getSerializable(String?): Serializable?' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/activityresult/DataPersistor.kt:85:26 'getSerializable(String?): Serializable?' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/devtools/cdp/CdpNetworkTypes.kt:186:54 Parameter 'request' is never used
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/devtools/cdp/CdpNetworkTypes.kt:210:54 Parameter 'request' is never used
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/devtools/cdp/CdpNetworkTypes.kt:230:15 Parameter 'now' is never used
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/devtools/cdp/CdpNetworkTypes.kt:230:54 Parameter 'request' is never used
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/events/KModuleEventEmitterWrapper.kt:90:7 'constructor Event<T : Event<(raw) Event<*>>!>(Int)' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/jni/JavaScriptObject.kt:90:33 Parameter 'null' is never used
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/jni/JavaScriptObject.kt:91:34 Parameter 'null' is never used
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/jni/JavaScriptObject.kt:132:5 Parameter 'null' is never used
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/sharedobjects/SharedObjectRegistry.kt:54:35 Destructured parameter 'js' is never used
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/tracing/ExpoTrace.kt:33:1 Expected performance impact from inlining is insignificant. Inlining works best for functions with parameters of functional types
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/tracing/ExpoTrace.kt:40:1 Expected performance impact from inlining is insignificant. Inlining works best for functions with parameters of functional types
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/tracing/ExpoTrace.kt:50:1 Expected performance impact from inlining is insignificant. Inlining works best for functions with parameters of functional types
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/tracing/ExpoTrace.kt:56:1 Expected performance impact from inlining is insignificant. Inlining works best for functions with parameters of functional types
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/types/Either.kt:76:12 Parameter 'type' is never used
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/types/Either.kt:79:12 Parameter 'type' is never used
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/types/Either.kt:82:11 Parameter 'type' is never used
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/types/Either.kt:85:11 Parameter 'type' is never used
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/types/Either.kt:99:12 Parameter 'type' is never used
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/types/Either.kt:102:11 Parameter 'type' is never used
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/types/Either.kt:114:12 Parameter 'type' is never used
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/types/Either.kt:117:11 Parameter 'type' is never used
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/types/JSTypeConverterHelper.kt:44:17 'get(String!): Any?' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/types/TypeConverterProvider.kt:175:46 'newInstance(): T!' is deprecated. Deprecated in Java
[RUN_GRADLEW] > Task :app:mergeReleaseNativeLibs
[RUN_GRADLEW] > Task :expo-modules-core:compileReleaseJavaWithJavac
[RUN_GRADLEW] Note: Some input files use or override a deprecated API.
[RUN_GRADLEW] Note: Recompile with -Xlint:deprecation for details.
[RUN_GRADLEW] Note: Some input files use unchecked or unsafe operations.
[RUN_GRADLEW] Note: Recompile with -Xlint:unchecked for details.
[RUN_GRADLEW] > Task :expo-modules-core:processReleaseJavaRes
[RUN_GRADLEW] > Task :expo-modules-core:bundleLibCompileToJarRelease
[RUN_GRADLEW] > Task :expo-modules-core:bundleLibRuntimeToJarRelease
[RUN_GRADLEW] > Task :app:stripReleaseDebugSymbols
[RUN_GRADLEW] > Task :app:collectReleaseDependencies
[RUN_GRADLEW] > Task :app:configureReleaseDependencies
[RUN_GRADLEW] > Task :expo-font:compileReleaseKotlin
[RUN_GRADLEW] > Task :app:extractReleaseNativeSymbolTables
[RUN_GRADLEW] > Task :expo-font:compileReleaseJavaWithJavac
[RUN_GRADLEW] > Task :expo-font:bundleLibCompileToJarRelease
[RUN_GRADLEW] > Task :expo-font:bundleLibRuntimeToJarRelease
[RUN_GRADLEW] > Task :expo-font:processReleaseJavaRes
[RUN_GRADLEW] > Task :app:parseReleaseIntegrityConfig
[RUN_GRADLEW] > Task :expo-constants:compileReleaseKotlin
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-constants/android/src/main/java/expo/modules/constants/ConstantsService.kt:127:14 'versionCode: Int' is deprecated. Deprecated in Java
[RUN_GRADLEW] > Task :app:validateSigningRelease
[RUN_GRADLEW] > Task :expo-keep-awake:compileReleaseKotlin
[RUN_GRADLEW] > Task :expo-sharing:compileReleaseKotlin
[RUN_GRADLEW] > Task :expo-constants:compileReleaseJavaWithJavac
[RUN_GRADLEW] > Task :expo-constants:bundleLibCompileToJarRelease
[RUN_GRADLEW] > Task :expo-keep-awake:compileReleaseJavaWithJavac
[RUN_GRADLEW] > Task :expo-keep-awake:bundleLibCompileToJarRelease
[RUN_GRADLEW] > Task :expo-sharing:compileReleaseJavaWithJavac
[RUN_GRADLEW] > Task :expo-sharing:bundleLibCompileToJarRelease
[RUN_GRADLEW] > Task :expo-constants:bundleLibRuntimeToJarRelease
[RUN_GRADLEW] > Task :expo-keep-awake:bundleLibRuntimeToJarRelease
[RUN_GRADLEW] > Task :expo-sharing:bundleLibRuntimeToJarRelease
[RUN_GRADLEW] > Task :expo-constants:processReleaseJavaRes
[RUN_GRADLEW] > Task :expo-keep-awake:processReleaseJavaRes
[RUN_GRADLEW] > Task :expo-sharing:processReleaseJavaRes
[RUN_GRADLEW] > Task :expo-camera:compileReleaseKotlin
[RUN_GRADLEW] > Task :expo-file-system:compileReleaseKotlin
[RUN_GRADLEW] > Task :expo-file-system:compileReleaseJavaWithJavac
[RUN_GRADLEW] > Task :expo-file-system:bundleLibCompileToJarRelease
[RUN_GRADLEW] > Task :expo-file-system:processReleaseJavaRes
[RUN_GRADLEW] > Task :expo-file-system:bundleLibRuntimeToJarRelease
[RUN_GRADLEW] > Task :expo-camera:compileReleaseKotlin
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-camera/android/src/main/java/expo/modules/camera/CameraViewHelper.kt:30:36 'get(Int, Int): CamcorderProfile!' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-camera/android/src/main/java/expo/modules/camera/CameraViewHelper.kt:32:49 'get(Int, Int): CamcorderProfile!' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-camera/android/src/main/java/expo/modules/camera/CameraViewHelper.kt:33:49 'get(Int, Int): CamcorderProfile!' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-camera/android/src/main/java/expo/modules/camera/CameraViewHelper.kt:34:48 'get(Int, Int): CamcorderProfile!' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-camera/android/src/main/java/expo/modules/camera/CameraViewHelper.kt:35:48 'get(Int, Int): CamcorderProfile!' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-camera/android/src/main/java/expo/modules/camera/CameraViewHelper.kt:37:36 'get(Int, Int): CamcorderProfile!' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-camera/android/src/main/java/expo/modules/camera/CameraViewModule.kt:81:85 'execute(vararg Void?): AsyncTask<Void?, Void?, Bundle?>!' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-camera/android/src/main/java/expo/modules/camera/ExifTags.kt:71:32 'TAG_ISO_SPEED_RATINGS: String' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-camera/android/src/main/java/expo/modules/camera/ExpoCameraView.kt:199:73 'getter for defaultDisplay: Display!' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-camera/android/src/main/java/expo/modules/camera/ExpoCameraView.kt:394:89 'execute(vararg Void?): AsyncTask<Void?, Void?, Bundle?>!' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-camera/android/src/main/java/expo/modules/camera/ExpoCameraView.kt:413:113 'execute(vararg Void?): AsyncTask<Void?, Void?, BarCodeScannerResult?>!' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-camera/android/src/main/java/expo/modules/camera/next/ExpoCameraView.kt:306:46 'getSupportedQualities(CameraInfo): (Mutable)List<Quality!>' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-camera/android/src/main/java/expo/modules/camera/next/ExpoCameraView.kt:346:73 'getter for defaultDisplay: Display!' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-camera/android/src/main/java/expo/modules/camera/next/tasks/ResolveTakenPicture.kt:129:32 Type mismatch: inferred type is String? but String was expected
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-camera/android/src/main/java/expo/modules/camera/tasks/BarCodeScannerAsyncTask.kt:3:19 'AsyncTask<Params : Any!, Progress : Any!, Result : Any!>' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-camera/android/src/main/java/expo/modules/camera/tasks/BarCodeScannerAsyncTask.kt:15:5 'AsyncTask<Params : Any!, Progress : Any!, Result : Any!>' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-camera/android/src/main/java/expo/modules/camera/tasks/BarCodeScannerAsyncTask.kt:15:5 'constructor AsyncTask<Params : Any!, Progress : Any!, Result : Any!>()' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-camera/android/src/main/java/expo/modules/camera/tasks/BarCodeScannerAsyncTask.kt:16:60 'getter for isCancelled: Boolean' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-camera/android/src/main/java/expo/modules/camera/tasks/BarCodeScannerAsyncTask.kt:23:11 'onPostExecute(Result!): Unit' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-camera/android/src/main/java/expo/modules/camera/tasks/FaceDetectorTask.kt:27:9 Parameter 'error' is never used, could be renamed to _
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-camera/android/src/main/java/expo/modules/camera/tasks/FaceDetectorTask.kt:31:9 Parameter 'skippedReason' is never used, could be renamed to _
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-camera/android/src/main/java/expo/modules/camera/tasks/ResolveTakenPictureAsyncTask.kt:8:19 'AsyncTask<Params : Any!, Progress : Any!, Result : Any!>' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-camera/android/src/main/java/expo/modules/camera/tasks/ResolveTakenPictureAsyncTask.kt:47:5 'AsyncTask<Params : Any!, Progress : Any!, Result : Any!>' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-camera/android/src/main/java/expo/modules/camera/tasks/ResolveTakenPictureAsyncTask.kt:47:5 'constructor AsyncTask<Params : Any!, Progress : Any!, Result : Any!>()' is deprecated. Deprecated in Java
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-camera/android/src/main/java/expo/modules/camera/tasks/ResolveTakenPictureAsyncTask.kt:123:32 Type mismatch: inferred type is String? but String was expected
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-camera/android/src/main/java/expo/modules/camera/tasks/ResolveTakenPictureAsyncTask.kt:155:30 Type mismatch: inferred type is String? but String was expected
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo-camera/android/src/main/java/expo/modules/camera/tasks/ResolveTakenPictureAsyncTask.kt:191:11 'onPostExecute(Result!): Unit' is deprecated. Deprecated in Java
[RUN_GRADLEW] > Task :expo-camera:compileReleaseJavaWithJavac
[RUN_GRADLEW] > Task :expo-camera:bundleLibCompileToJarRelease
[RUN_GRADLEW] > Task :expo-camera:bundleLibRuntimeToJarRelease
[RUN_GRADLEW] > Task :expo-camera:processReleaseJavaRes
[RUN_GRADLEW] > Task :expo:compileReleaseKotlin
[RUN_GRADLEW] w: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/node_modules/expo/android/src/main/java/expo/modules/ReactActivityDelegateWrapper.kt:139:50 No cast needed
[RUN_GRADLEW] > Task :expo:compileReleaseJavaWithJavac
[RUN_GRADLEW] > Task :expo:bundleLibRuntimeToJarRelease
[RUN_GRADLEW] > Task :expo:bundleLibCompileToJarRelease
[RUN_GRADLEW] > Task :expo:processReleaseJavaRes
[RUN_GRADLEW] > Task :app:compileReleaseKotlin
[RUN_GRADLEW] > Task :app:compileReleaseJavaWithJavac
[RUN_GRADLEW] > Task :app:dexBuilderRelease
[RUN_GRADLEW] > Task :app:processReleaseJavaRes
[RUN_GRADLEW] > Task :app:mergeReleaseGlobalSynthetics
[RUN_GRADLEW] > Task :app:mergeReleaseJavaResource
[RUN_GRADLEW] > Task :app:mergeDexRelease
[RUN_GRADLEW] > Task :app:buildReleasePreBundle
[RUN_GRADLEW] > Task :app:compileReleaseArtProfile
[RUN_GRADLEW] > Task :app:packageReleaseBundle
[RUN_GRADLEW] > Task :app:signReleaseBundle
[RUN_GRADLEW] > Task :app:produceReleaseBundleIdeListingFile
[RUN_GRADLEW] > Task :app:createReleaseBundleListingFileRedirect
[RUN_GRADLEW] > Task :app:bundleRelease
[RUN_GRADLEW] Deprecated Gradle features were used in this build, making it incompatible with Gradle 9.0.
[RUN_GRADLEW] You can use '--warning-mode all' to show the individual deprecation warnings and determine if they come from your own scripts or plugins.
[RUN_GRADLEW] For more on this, please refer to https://docs.gradle.org/8.3/userguide/command_line_interface.html#sec:command_line_warnings in the Gradle documentation.
[RUN_GRADLEW] BUILD SUCCESSFUL in 9m 21s
[RUN_GRADLEW] 306 actionable tasks: 306 executed
[RUN_GRADLEW] See the profiling report at: file:///tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/android/build/reports/profile/profile-2026-07-02-19-41-20.html
[RUN_GRADLEW] A fine-grained performance profile is available: use the --scan option.
[GRADLE_BUILD_PROFILE] Gradle Build — Task Execution Profile
47 tasks, total task time: 657.5s
% Time = share of total task execution time

┌────────────────────────────────────────────────────────────────┬────────────┬──────────┬────────────┬──────────────────────┐
│ Task                                                           │   Duration │   % Time │ Result     │                      │
├────────────────────────────────────────────────────────────────┼────────────┼──────────┼────────────┼──────────────────────┤
│ :                                                              │      47.9s │     7.3% │ total      │ █░░░░░░░░░░░░░░░░░░░ │
│ :expo-camera                                                   │      46.7s │     7.1% │ total      │ █░░░░░░░░░░░░░░░░░░░ │
│   └─ compileReleaseKotlin                                      │      44.4s │     6.8% │ executed   │ █░░░░░░░░░░░░░░░░░░░ │
│ :react-native-safe-area-context                                │      43.0s │     6.5% │ total      │ █░░░░░░░░░░░░░░░░░░░ │
│   ├─ compileReleaseKotlin                                      │      39.9s │     6.1% │ executed   │ █░░░░░░░░░░░░░░░░░░░ │
│   └─ compileReleaseJavaWithJavac                               │       1.9s │     0.3% │ executed   │ ░░░░░░░░░░░░░░░░░░░░ │
│ :expo-file-system                                              │      32.0s │     4.9% │ total      │ █░░░░░░░░░░░░░░░░░░░ │
│   ├─ compileReleaseKotlin                                      │      28.6s │     4.4% │ executed   │ █░░░░░░░░░░░░░░░░░░░ │
│   └─ compileReleaseJavaWithJavac                               │       1.2s │     0.2% │ executed   │ ░░░░░░░░░░░░░░░░░░░░ │
│ :react-native-svg                                              │      23.9s │     3.6% │ total      │ █░░░░░░░░░░░░░░░░░░░ │
│   └─ compileReleaseJavaWithJavac                               │      22.6s │     3.4% │ executed   │ █░░░░░░░░░░░░░░░░░░░ │
│ :expo                                                          │      13.7s │     2.1% │ total      │ ░░░░░░░░░░░░░░░░░░░░ │
│   ├─ compileReleaseKotlin                                      │       7.7s │     1.2% │ executed   │ ░░░░░░░░░░░░░░░░░░░░ │
│   └─ processReleaseManifest                                    │       2.7s │     0.4% │ executed   │ ░░░░░░░░░░░░░░░░░░░░ │
│ :expo-constants                                                │      10.9s │     1.7% │ total      │ ░░░░░░░░░░░░░░░░░░░░ │
│   └─ compileReleaseKotlin                                      │       7.9s │     1.2% │ executed   │ ░░░░░░░░░░░░░░░░░░░░ │
│ :expo-keep-awake                                               │       9.3s │     1.4% │ total      │ ░░░░░░░░░░░░░░░░░░░░ │
│   ├─ compileReleaseKotlin                                      │       6.9s │     1.0% │ executed   │ ░░░░░░░░░░░░░░░░░░░░ │
│   └─ compileReleaseJavaWithJavac                               │       1.0s │     0.2% │ executed   │ ░░░░░░░░░░░░░░░░░░░░ │
│ :expo-modules-core$android-annotation-processor                │       9.1s │     1.4% │ total      │ ░░░░░░░░░░░░░░░░░░░░ │
│   └─ compileKotlin                                             │       9.0s │     1.4% │ executed   │ ░░░░░░░░░░░░░░░░░░░░ │
│ :expo-sharing                                                  │       8.8s │     1.3% │ total      │ ░░░░░░░░░░░░░░░░░░░░ │
│   └─ compileReleaseKotlin                                      │       6.9s │     1.0% │ executed   │ ░░░░░░░░░░░░░░░░░░░░ │
│ :react-native-async-storage_async-storage                      │       8.4s │     1.3% │ total      │ ░░░░░░░░░░░░░░░░░░░░ │
│   └─ compileReleaseJavaWithJavac                               │       6.3s │     1.0% │ executed   │ ░░░░░░░░░░░░░░░░░░░░ │
│ :expo-font                                                     │       7.8s │     1.2% │ total      │ ░░░░░░░░░░░░░░░░░░░░ │
│   ├─ compileReleaseKotlin                                      │       5.3s │     0.8% │ executed   │ ░░░░░░░░░░░░░░░░░░░░ │
│   └─ compileReleaseJavaWithJavac                               │       1.2s │     0.2% │ executed   │ ░░░░░░░░░░░░░░░░░░░░ │
│ :expo-modules-core$android-annotation                          │       5.4s │     0.8% │ total      │ ░░░░░░░░░░░░░░░░░░░░ │
│   └─ compileKotlin                                             │       5.2s │     0.8% │ executed   │ ░░░░░░░░░░░░░░░░░░░░ │
│ :app:createBundleReleaseJsAndAssets                            │      58.1s │     8.8% │ executed   │ ██░░░░░░░░░░░░░░░░░░ │
│ :expo-modules-core:buildCMakeRelWithDebInfo[armeabi-v7a]       │      53.7s │     8.2% │ executed   │ ██░░░░░░░░░░░░░░░░░░ │
│ :expo-modules-core:buildCMakeRelWithDebInfo[arm64-v8a]         │      53.3s │     8.1% │ executed   │ ██░░░░░░░░░░░░░░░░░░ │
│ :app:mergeExtDexRelease                                        │      53.1s │     8.1% │ executed   │ ██░░░░░░░░░░░░░░░░░░ │
│ :compileKotlin                                                 │      47.5s │     7.2% │ executed   │ █░░░░░░░░░░░░░░░░░░░ │
│ :expo-modules-core:buildCMakeRelWithDebInfo[x86_64]            │      44.2s │     6.7% │ executed   │ █░░░░░░░░░░░░░░░░░░░ │
│ :expo-modules-core:buildCMakeRelWithDebInfo[x86]               │      43.0s │     6.5% │ executed   │ █░░░░░░░░░░░░░░░░░░░ │
│ :app:mergeReleaseResources                                     │      12.0s │     1.8% │ executed   │ ░░░░░░░░░░░░░░░░░░░░ │
│ :expo-modules-core:configureCMakeRelWithDebInfo[arm64-v8a]     │      11.6s │     1.8% │ executed   │ ░░░░░░░░░░░░░░░░░░░░ │
│ :app:mergeDexRelease                                           │       9.5s │     1.4% │ executed   │ ░░░░░░░░░░░░░░░░░░░░ │
│ :app:dexBuilderRelease                                         │       8.7s │     1.3% │ executed   │ ░░░░░░░░░░░░░░░░░░░░ │
│ :app:processReleaseResources                                   │       8.4s │     1.3% │ executed   │ ░░░░░░░░░░░░░░░░░░░░ │
│ :app:stripReleaseDebugSymbols                                  │       5.1s │     0.8% │ executed   │ ░░░░░░░░░░░░░░░░░░░░ │
│ :app:bundleReleaseResources                                    │       5.0s │     0.8% │ executed   │ ░░░░░░░░░░░░░░░░░░░░ │
│ :app:compileReleaseKotlin                                      │       4.1s │     0.6% │ executed   │ ░░░░░░░░░░░░░░░░░░░░ │
│ :expo-modules-core:configureCMakeRelWithDebInfo[armeabi-v7a]   │       4.1s │     0.6% │ executed   │ ░░░░░░░░░░░░░░░░░░░░ │
│ :app:mergeReleaseJavaResource                                  │       4.0s │     0.6% │ executed   │ ░░░░░░░░░░░░░░░░░░░░ │
│ :app:mapReleaseSourceSetPaths                                  │       3.7s │     0.6% │ executed   │ ░░░░░░░░░░░░░░░░░░░░ │
│ :app:collectReleaseDependencies                                │       3.4s │     0.5% │ executed   │ ░░░░░░░░░░░░░░░░░░░░ │
│ :expo-modules-core:compileReleaseJavaWithJavac                 │       3.3s │     0.5% │ executed   │ ░░░░░░░░░░░░░░░░░░░░ │
│ :app:processReleaseManifestForPackage                          │       3.3s │     0.5% │ executed   │ ░░░░░░░░░░░░░░░░░░░░ │
│ :app:signReleaseBundle                                         │       3.0s │     0.5% │ executed   │ ░░░░░░░░░░░░░░░░░░░░ │
│ :expo-modules-core:configureCMakeRelWithDebInfo[x86]           │       2.8s │     0.4% │ executed   │ ░░░░░░░░░░░░░░░░░░░░ │
│ :expo-modules-core:configureCMakeRelWithDebInfo[x86_64]        │       2.6s │     0.4% │ executed   │ ░░░░░░░░░░░░░░░░░░░░ │
│ :app:processReleaseMainManifest                                │       2.2s │     0.3% │ executed   │ ░░░░░░░░░░░░░░░░░░░░ │
│ :app:packageReleaseBundle                                      │       2.2s │     0.3% │ executed   │ ░░░░░░░░░░░░░░░░░░░░ │
│ :app:checkReleaseDuplicateClasses                              │       2.2s │     0.3% │ executed   │ ░░░░░░░░░░░░░░░░░░░░ │
│ :app:mergeReleaseNativeLibs                                    │       2.0s │     0.3% │ executed   │ ░░░░░░░░░░░░░░░░░░░░ │
│ :react-native-screens:compileReleaseJavaWithJavac              │       1.8s │     0.3% │ executed   │ ░░░░░░░░░░░░░░░░░░░░ │
│ :app:mergeReleaseAssets                                        │       1.1s │     0.2% │ executed   │ ░░░░░░░░░░░░░░░░░░░░ │
├────────────────────────────────────────────────────────────────┼────────────┼──────────┼────────────┼──────────────────────┤
│ TOTAL                                                          │     657.5s │   100.0% │            │                      │
└────────────────────────────────────────────────────────────────┴────────────┴──────────┴────────────┴──────────────────────┘

[UPLOAD_APPLICATION_ARCHIVE] Application archives:
[UPLOAD_APPLICATION_ARCHIVE]   - /tmp/manoj-amavasya/eas-build-local-nodejs/0e10d698-87ed-4fc2-aae4-f8d7d7b5f493/build/android/app/build/outputs/bundle/release/app-release.aab (38.5 MB)
[UPLOAD_APPLICATION_ARCHIVE] Uploading application archive...
[PREPARE_ARTIFACTS] Preparing artifacts
[PREPARE_ARTIFACTS] Writing artifacts to /home/manoj-amavasya/projects/GATE_EC_Dashboard_2027/gate-ec-dashboard-mobile/build-1783002029136.aab
[SAVE_CACHE] Local builds do not support saving cache.

Build successful
You can find the build artifacts in /home/manoj-amavasya/projects/GATE_EC_Dashboard_2027/gate-ec-dashboard-mobile/build-1783002029136.aab
gate-ec-dashboard-mobile $ 
