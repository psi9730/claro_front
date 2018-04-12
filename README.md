# React Native Based App

## 주의사항

### 패키지 설치

패키지 업데이트 할 때 마다 

`
./node_modules/react-native-mauron85-background-geolocation/android/lib/build.gradle
`
파일을 열어서 

`
     compile 'com.android.support:support-v4:+'
`
->
`
     compile 'com.android.support:support-v4:27.1.1(supportLibVersion)'
`

맞춰주기

### iOS 빌드 실패할 때

`rm -rf ./ios/build; rm -rf ./ios/Pods; rm ./ios/Podfile.lock`
한 후 `ios 폴더로 이동하여`
`pod install`

 
