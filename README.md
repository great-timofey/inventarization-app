# Inventory


## Installation

```bash
  npm install && npm run start
```
or
```bash
  yarn install && yarn start
```

* Open with Xcode `Inventory.xcodeproj` file
* Select **Inventory** scheme
    * Select iOS simulator or real device
        * Tap on _Play_ button or use Xcode hotkey **⌘R** for build iOS


## Run scripts for 

В Xcode добавлены автоматические [скрипты](https://github.com/react-native-community/react-native-text-input-mask/issues/22#issuecomment-353659910) для избежания проблемы **ERROR ITMS-90206: "Invalid Bundle. The bundle at 'myapp.app/Frameworks/InputMask.framework' contains disallowed file 'Frameworks'."** при выкладке в iTunesConnect. Их можно найти:

* **Build Phases** проекта
    * **Work around InputMask.xcodeproj embedding an extra set of Swift libraries**


## Info.plist

Добавил описания некоторых ключей, которые требовал iTunesConnect для нормальной работы в 2019 году, но мы их не используем: **NSCalendarsUsageDescription**, **NSBluetoothPeripheralUsageDescription**, **NSAppleMusicUsageDescription**, **NSMotionUsageDescription**, **NSSpeechRecognitionUsageDescription**
