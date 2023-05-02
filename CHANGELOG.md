# Changelog

## [1.2.1](https://github.com/roldanjr/pomatez/compare/v1.2.2...v1.2.1) (2023-05-02)


### ⚠ BREAKING CHANGES

* **lock_settings:** Removed Lock Settings from app's features.
* **notification:** Notification changed to Notification Property.

### Code Refactoring

* **lock_settings:** removed lock settings feature realizing it is useless on some points ([203c0e1](https://github.com/roldanjr/pomatez/commit/203c0e1532aad35a225d25cebe7d0e728a8aa11e))


### Performance Improvements ⚡️

* decreased cpu usage on break while keeping the screen awake using use-stay-awake hook" ([b491204](https://github.com/roldanjr/pomatez/commit/b49120425ae42e873f1525ed4db7e98c16d06e0a))
* improved timer accuracy and overall app performance ([42747c5](https://github.com/roldanjr/pomatez/commit/42747c5f640b2346dabbaf7eb4f066ac71337cdc))


### Reverts ⏪️

* electron version back to v8.2.5 due to installation error building for snap ([4d2b015](https://github.com/roldanjr/pomatez/commit/4d2b01534ac81c7f98b9f047da3908c6617dfe3a))
* lerna versioning from unified to independent ([66adcb3](https://github.com/roldanjr/pomatez/commit/66adcb329bf880d9220c8457e506ec09420d577e))
* **task_list:** remove Done List option mention here [#63](https://github.com/roldanjr/pomatez/issues/63) ([279a34e](https://github.com/roldanjr/pomatez/commit/279a34e75ee16e645cd6c98587f6ec7a7244bda5))


### Changes to Existing Features 🔧

* increase max rounds to 10 ([#241](https://github.com/roldanjr/pomatez/issues/241)) ([70f3a8b](https://github.com/roldanjr/pomatez/commit/70f3a8bed84f3740a9c57e9038127d0b4a2a9c3f))


### Miscellaneous Chores

* this is just to try and trigger the right release version ([0356e5c](https://github.com/roldanjr/pomatez/commit/0356e5c863ce23a9391bb5f4fdb96ad4a80369aa))


### Features ✨

* added analytics that will only track number of users ([022245d](https://github.com/roldanjr/pomatez/commit/022245da52ec23d1e6195ae06b74eb2700f7fed1))
* added Auto-Start Work Time, Minimize To Tray and Close To Tray options to the app settings ([560eea9](https://github.com/roldanjr/pomatez/commit/560eea9869b87e79a4f2be3697e2116f61431633))
* added checkbox on card detail section enable to mark the card as DONE and UNDONE ([65b9e53](https://github.com/roldanjr/pomatez/commit/65b9e53e7cfa8b83c9c2fa5df4439ebc5d2219b9))
* added compact mode ([#178](https://github.com/roldanjr/pomatez/issues/178)) ([75147e5](https://github.com/roldanjr/pomatez/commit/75147e54716328ce02a26ec2eab6534fc7f9f65c))
* added context menu on fields that are editable by default ([eb59e25](https://github.com/roldanjr/pomatez/commit/eb59e259ad7fab0cfb47323edf26c9c3c1c84c2e))
* added custom notifications for auto-updates feature ([8d8bb1c](https://github.com/roldanjr/pomatez/commit/8d8bb1c191db44c9c0801f12bdbd9b0922ce5926))
* added progress on tray feature ([3f6f6af](https://github.com/roldanjr/pomatez/commit/3f6f6af54e3ddcc9907ca41b612d2f23e7fba062))
* added undo && redu feature with shorcut keys while still inside on task list ([2b626ca](https://github.com/roldanjr/pomatez/commit/2b626caee6c94394dd6c59fc4e29b0b6f3228c83))
* allow other UI to scale to the new resizeable mode ([f539abb](https://github.com/roldanjr/pomatez/commit/f539abb6b11687e04c7bf368abaf021bc5b32167))
* allow the window to be resized and app to scale ([d597e26](https://github.com/roldanjr/pomatez/commit/d597e269615a662b0ce4ddb551f91df4995c048e))
* **app:** add support for Windows portable version ([ccee4b7](https://github.com/roldanjr/pomatez/commit/ccee4b7cd31cdf3b09302fe71b313fbf505b273c))
* **app:** update electron from v9.2.0 to v10.1.2 ([64d40f6](https://github.com/roldanjr/pomatez/commit/64d40f6e7c8162679b9884ff222986da7f562c0f))
* changed project folder architecture ([576d317](https://github.com/roldanjr/pomatez/commit/576d317c1ef2b2285ff1ed9b466c084e2cc42d85))
* **compact mode:** prevent user from resizing the window ([5381baa](https://github.com/roldanjr/pomatez/commit/5381baac7e322281e0ca124e1f251a93c1bb8674))
* develop feature that enable to toggle default custom titlebar to a native one ([aace053](https://github.com/roldanjr/pomatez/commit/aace0535a4b74ca69de37aaca5e42ba44aee3dfe))
* **links:** added new links inside the settings route ([c6476b7](https://github.com/roldanjr/pomatez/commit/c6476b738fe77547ce4509fa7934b74a8d88fddb))
* **notification:** modify notification setting and add new options to choose from ([dea0f4c](https://github.com/roldanjr/pomatez/commit/dea0f4cb88dffb815d0ab61612600593ea50f46b))
* prevent computer from going to sleep mode every breaks. Mention here [#84](https://github.com/roldanjr/pomatez/issues/84) ([4297e0f](https://github.com/roldanjr/pomatez/commit/4297e0fe8d2a08c135f80fe03c366cc7ed79637a))
* set initial useNativeTitlebar value depending on user's Operating System ([870e3a5](https://github.com/roldanjr/pomatez/commit/870e3a5d2a8db9ecac3beaa0b36d68f5176d08e0))
* show the app on every timer ends if hidden ([2858737](https://github.com/roldanjr/pomatez/commit/28587378c56acf5033fec63e0c7dc938815f1b20))
* **special_break:** improve user experience setting a special break time schedule ([660c230](https://github.com/roldanjr/pomatez/commit/660c230a9da5f4568eea5c38121698f2eabc8764))
* **timer:** add option to disable timer animation to reduce cpu usage ([5da514a](https://github.com/roldanjr/pomatez/commit/5da514a0ca80b28983a785cfd7f4f74463f0d8cd))
* trigger animation if the section is visible in viewport ([104d4c7](https://github.com/roldanjr/pomatez/commit/104d4c76b1a77d966130040ee76ac4972741c5c7))
* update electron to the latest version released ([465f72a](https://github.com/roldanjr/pomatez/commit/465f72a116752d649ed13e4ba0dafbe094387507))
* **website:** added minimal animation for the hero section ([7a2aa36](https://github.com/roldanjr/pomatez/commit/7a2aa3662f478df1a9e2683bfd76bead7a3082be))
* **website:** prevent body scroll when sidebar is open ([f9b49db](https://github.com/roldanjr/pomatez/commit/f9b49db18e0523bdfd5692046d2f2438632529f7))
* **website:** update downloadable installer version ([e8551a2](https://github.com/roldanjr/pomatez/commit/e8551a21d3c06b21e5bd6994cae4f95e349ba49a))


### Bug Fixes 🐛

* Add edit and app menu only for Mac ([aea9bd4](https://github.com/roldanjr/pomatez/commit/aea9bd43252b4352cf658a933bdc78c35ff322fc))
* app icon on mac ([4c4f71e](https://github.com/roldanjr/pomatez/commit/4c4f71e4ba1232565d7afb806f2d8d6d608da11a))
* **app/renderer:** fix linter warnings that causes CI test build failing ([26edd59](https://github.com/roldanjr/pomatez/commit/26edd59b26155954208fafc0dc3d933501c11bc9))
* **app:** invalid .desktop category mentioned here [#127](https://github.com/roldanjr/pomatez/issues/127) ([ea58f5c](https://github.com/roldanjr/pomatez/commit/ea58f5c771001a15f20a47dba665423bc54d9afc))
* **app:** issue [#119](https://github.com/roldanjr/pomatez/issues/119) - Full screen break doesn't do anything on Ubuntu Linux ([b307eec](https://github.com/roldanjr/pomatez/commit/b307eec614e8ad6afa5d78caed51d5ee38c90167))
* **app:** try to fix issue [#106](https://github.com/roldanjr/pomatez/issues/106) ([38c9666](https://github.com/roldanjr/pomatez/commit/38c966672791c860945284e8f668384f8eb36c99))
* broken styles during compact mode ([5a7330a](https://github.com/roldanjr/pomatez/commit/5a7330a8ed3086e68c49a55d6817be74c2eab958))
* bump version for main package.json (was resulting in wrong release version) ([0de3f8e](https://github.com/roldanjr/pomatez/commit/0de3f8e996f46810f9b2cf7888150462099fbe06))
* center add card element creating started ([0fefcdc](https://github.com/roldanjr/pomatez/commit/0fefcdcb56399673a3b5b10c31db530d9c723673))
* change help links cursor to pointer ([61aeaeb](https://github.com/roldanjr/pomatez/commit/61aeaeb270366b3533da55ee6b8875976d83d666)), closes [#167](https://github.com/roldanjr/pomatez/issues/167)
* disable/enable voice assistance in settings tab [#108](https://github.com/roldanjr/pomatez/issues/108) ([86aea7c](https://github.com/roldanjr/pomatez/commit/86aea7cc3bd216347e2a352f51ea340ca13c75d2))
* don't close cards when clicking as its easy to lose info ([3efcd11](https://github.com/roldanjr/pomatez/commit/3efcd11eadedfe4ccf6a2872aeb3dc67f2021747))
* drag logic for logo on title bar ([9bad3a5](https://github.com/roldanjr/pomatez/commit/9bad3a547de83ac21321f428a37d92b569c9d117))
* exiting fullscreen error on linux ([00b2997](https://github.com/roldanjr/pomatez/commit/00b29973af6f6640c9dbae2e2df69662284ba721))
* explicitly define security policy to stop electron complaining ([9081047](https://github.com/roldanjr/pomatez/commit/9081047cd030c2e0d809d5a04f9417da5b02b370))
* fixed switching titlebar bug in linux operating system ([ccb76be](https://github.com/roldanjr/pomatez/commit/ccb76bed6987822f7cd2d6addc77ce34c82798d7))
* flag extra files for version bumps ([08746fa](https://github.com/roldanjr/pomatez/commit/08746fa3aa2ea284831a397d650ccce569bafa50))
* fullscreen break escape key issue ([ed65f43](https://github.com/roldanjr/pomatez/commit/ed65f43292dcfe0271b4534e5827af8ce779a4a3))
* lower electron version as bumping causes release build failures ([47ad9f5](https://github.com/roldanjr/pomatez/commit/47ad9f5dff4ca18dde8af447b9ebfcd76cf8b801))
* lower uuid version to fix lib export issue ([d8bb58e](https://github.com/roldanjr/pomatez/commit/d8bb58ed1cd7467acd89dfc921f815ae792f7d44))
* mac fullscreen break ([8fd653e](https://github.com/roldanjr/pomatez/commit/8fd653edc76ff868cded0b17e114abedf2344b9d))
* **mac:** error when running on mac os ([b953234](https://github.com/roldanjr/pomatez/commit/b953234b053c62dac965bf1d28fa55b407b1f090))
* **mac:** try to fix error when launching on Mac Operating System ([1e3fcdd](https://github.com/roldanjr/pomatez/commit/1e3fcddd3ebef8de45fbb171d28204f1c131d4bb))
* make tasks not edit when clicking contained links ([846e6f3](https://github.com/roldanjr/pomatez/commit/846e6f34634258bbac7ce081c95ec8e05b5e0243))
* make the settings menu vertically resize ([f44e655](https://github.com/roldanjr/pomatez/commit/f44e655772298f57d8118e410dc073d0088e4d3f))
* min size not respected when coming out of compact mode ([e7da15c](https://github.com/roldanjr/pomatez/commit/e7da15c794a7e15c440a6dcc99ca9f5334c80d0c))
* missing app icon ([d4b32f3](https://github.com/roldanjr/pomatez/commit/d4b32f3f60b711ead2a3dee7f6234e90215292e4))
* multiple tray icon after clicking close multiple times in Manjaro Linux ([d5eb685](https://github.com/roldanjr/pomatez/commit/d5eb6855572d960052ad981a2f1f3f3ece13579c))
* **narration:** fixed duplicate narration on every break ([c82fec3](https://github.com/roldanjr/pomatez/commit/c82fec363c6d1a0e944cc194a31caf91216f9364))
* range slider visual bug on window resized ([3439ab3](https://github.com/roldanjr/pomatez/commit/3439ab3d26e91db770f3f4c760ad917c0fbeeb62))
* re-enable resizeable as it may be causing issues on ubuntu ([15ddfab](https://github.com/roldanjr/pomatez/commit/15ddfab173313ee5dcfbbfdf7e13565f421cd4bd))
* some website styles including sticky images ([79bea20](https://github.com/roldanjr/pomatez/commit/79bea20754e1c345c007c4d08736bdbb2462b901))
* special break failures ([eaa41bf](https://github.com/roldanjr/pomatez/commit/eaa41bf278d44eb8632e5f36d3d13865ba5602b6))
* styling issues with compact mode + fullscreen ([e651b7c](https://github.com/roldanjr/pomatez/commit/e651b7cce79d62241d093be670e857e03491048b))
* task links not opening in new windows ([7d17ec1](https://github.com/roldanjr/pomatez/commit/7d17ec184f559c1cefa8d7ea59cb9006f8207e5c))
* timer task preview size ([5065f76](https://github.com/roldanjr/pomatez/commit/5065f764a0f2d40307bb8833d916ca72056096c4))
* **timer:** issue about incorrect timer when the app is hidden ([da913eb](https://github.com/roldanjr/pomatez/commit/da913ebf53e27d25e570c95830ff9f5778d67d5a))
* titlebar doesn't switch on Manjaro Linux ([e41801c](https://github.com/roldanjr/pomatez/commit/e41801c85a8ccf38748e8bd4553a28f2ecaf8fe0))
* travis build error due to incorrect @pomatez/shareables version ([9a70329](https://github.com/roldanjr/pomatez/commit/9a703292f81f7bca605ebb0d674775232a4b5ef2))
* update to electron 18 to avoid gpu issues on certain linux distros ([543ff9a](https://github.com/roldanjr/pomatez/commit/543ff9af41b77d72d650e8c1456a182753032aa2))
* website build error ([8a7b293](https://github.com/roldanjr/pomatez/commit/8a7b293144859f47da0785f44f0bd5fe5e09ab98))
* **website:** force render on client-side ([#206](https://github.com/roldanjr/pomatez/issues/206)) ([9d6bf18](https://github.com/roldanjr/pomatez/commit/9d6bf187791697c880633277f3cbf089d5f22f80))
* **website:** landing button link to download section ([7a141b3](https://github.com/roldanjr/pomatez/commit/7a141b33acd3b1b9c7e1871d2b1d1dffbcc7b6f4))
* **website:** remove canonical link as because it's unnecessary ([0e04c2f](https://github.com/roldanjr/pomatez/commit/0e04c2f73ad3a0ed3db456f39105a6cf1164595f))
* **website:** remove the clean script on predeploy ([0551202](https://github.com/roldanjr/pomatez/commit/05512027ad4ce0ffbebcd2dfc120665665606627))
* **website:** scrolling issues ([82da7b1](https://github.com/roldanjr/pomatez/commit/82da7b1b4fabe934b7192da8271c263a605f0962))
* **website:** sEO including social preview image link and website url in page head ([fe3c036](https://github.com/roldanjr/pomatez/commit/fe3c03639f1567f9f7e30c5485ba056d7e8b7cb4))
* window randomly vanishing on mac after minimise ([d1e0e42](https://github.com/roldanjr/pomatez/commit/d1e0e422419664c4a6ab3d5cc6bcc358a29175a1))
* windows full screen mode issues ([7e1ba3e](https://github.com/roldanjr/pomatez/commit/7e1ba3ecd214eb88a3fc51ea4d1634ae79c10696))

## [1.2.2](https://github.com/roldanjr/pomatez/compare/v1.2.1...v1.2.2) (2022-12-21)

### Bug Fixes 🐛

- missing app icon ([c0617bd](https://github.com/roldanjr/pomatez/commit/c0617bdee55923aad9da4fc09e1238c966f77958))

## [1.2.1](https://github.com/roldanjr/pomatez/compare/v1.2.1...v1.2.1) (2022-12-20)

### Changes to Existing Features 🔧

- increase max rounds to 10 ([#241](https://github.com/roldanjr/pomatez/issues/241)) ([270701d](https://github.com/roldanjr/pomatez/commit/270701db906ca314a552c8ea629f6ce083424cd8))

### Miscellaneous Chores

- this is just to try and trigger the right release version ([2f6fb49](https://github.com/roldanjr/pomatez/commit/2f6fb49c77694d99cdb0e26a5765688834841cf6))

### Features ✨

- added compact mode ([#178](https://github.com/roldanjr/pomatez/issues/178)) ([c057c11](https://github.com/roldanjr/pomatez/commit/c057c11b88122b8bac90867738b1c4319ad7a8ae))
- allow other UI to scale to the new resizeable mode ([dee69fe](https://github.com/roldanjr/pomatez/commit/dee69fe70020913f407fd8ae0c06698afa81649d))
- allow the window to be resized and app to scale ([9bd0128](https://github.com/roldanjr/pomatez/commit/9bd0128120fccd8e9c6810a50434700f14a4cc17))
- **compact mode:** prevent user from resizing the window ([dd69232](https://github.com/roldanjr/pomatez/commit/dd69232cee804ced9a51566512b196a902453bb4))
- **website:** update downloadable installer version ([cd1b1cd](https://github.com/roldanjr/pomatez/commit/cd1b1cdaccf0ff8d17a1dcff4cd6d2f8f3536bcc))

### Bug Fixes 🐛

- app icon on mac ([ce12ace](https://github.com/roldanjr/pomatez/commit/ce12ace0701f2e4bce298c5b8ae0e9533fb89afd))
- **app:** invalid .desktop category mentioned here [#127](https://github.com/roldanjr/pomatez/issues/127) ([534db41](https://github.com/roldanjr/pomatez/commit/534db4111b1969cec953e9545c0d3f1d724c13c6))
- **app:** try to fix issue [#106](https://github.com/roldanjr/pomatez/issues/106) ([1061494](https://github.com/roldanjr/pomatez/commit/1061494f96dff436564001ae49aac8153687176b))
- broken styles during compact mode ([b142a47](https://github.com/roldanjr/pomatez/commit/b142a47ade65196be406bf78529ce10f723ca012))
- bump version for main package.json (was resulting in wrong release version) ([c1530ce](https://github.com/roldanjr/pomatez/commit/c1530ce20b3e340237c6857a6eac4eba0aead6e9))
- center add card element creating started ([6d4ce16](https://github.com/roldanjr/pomatez/commit/6d4ce16f7160dfd2240d58703c5a37d472d9e34e))
- change help links cursor to pointer ([930e79a](https://github.com/roldanjr/pomatez/commit/930e79aad7fa2fec154a8565c8570499f7b51cf4)), closes [#167](https://github.com/roldanjr/pomatez/issues/167)
- don't close cards when clicking as its easy to lose info ([8394249](https://github.com/roldanjr/pomatez/commit/839424935bdb74446d11c0c11fabba399146b41f))
- drag logic for logo on title bar ([460090b](https://github.com/roldanjr/pomatez/commit/460090b8f015c696fe6cffa6823fffd322ae9a5a))
- exiting fullscreen error on linux ([a08ec7a](https://github.com/roldanjr/pomatez/commit/a08ec7abca7eaba3ed7eeb1bf3e1f5d9ebb5c47a))
- explicitly define security policy to stop electron complaining ([d19fead](https://github.com/roldanjr/pomatez/commit/d19fead0fde4a778afcbb62e92f38544ff01b175))
- flag extra files for version bumps ([a9b2a31](https://github.com/roldanjr/pomatez/commit/a9b2a319f20563b15325a734e3fa167faab81dc2))
- fullscreen break escape key issue ([b4affbb](https://github.com/roldanjr/pomatez/commit/b4affbb3d70421be5383669afd9337c44d763a72))
- lower electron version as bumping causes release build failures ([dff7116](https://github.com/roldanjr/pomatez/commit/dff7116286907b0d80e397661c907856a78ff897))
- lower uuid version to fix lib export issue ([fd30315](https://github.com/roldanjr/pomatez/commit/fd303150b853964e2a4bd425f0104804dc4b5866))
- mac fullscreen break ([42dd82d](https://github.com/roldanjr/pomatez/commit/42dd82d3d37cd71e6e4ff63aafaea39427a6fe1a))
- make tasks not edit when clicking contained links ([7b4de89](https://github.com/roldanjr/pomatez/commit/7b4de89bab6421561bba63fa146dcfd3fdc2a49f))
- make the settings menu vertically resize ([eec4ef0](https://github.com/roldanjr/pomatez/commit/eec4ef0372e1979a856832ce3c0333dbb2c5bc1b))
- min size not respected when coming out of compact mode ([1d3171f](https://github.com/roldanjr/pomatez/commit/1d3171f24b216892fe08da3b266f96948dc5588a))
- range slider visual bug on window resized ([365fda3](https://github.com/roldanjr/pomatez/commit/365fda3e8d116a22c301142dabbd48e6e5ffed26))
- re-enable resizeable as it may be causing issues on ubuntu ([e7befeb](https://github.com/roldanjr/pomatez/commit/e7befeb933119ae616d7a93de22267f98f645d31))
- styling issues with compact mode + fullscreen ([3cb1725](https://github.com/roldanjr/pomatez/commit/3cb1725f201f38fd0b37fe10fed75d5c1e829a92))
- task links not opening in new windows ([a32807f](https://github.com/roldanjr/pomatez/commit/a32807f757315606b3c2c2048f3d85f8a794ad8b))
- timer task preview size ([5ed1275](https://github.com/roldanjr/pomatez/commit/5ed12752f8de3a30694582ea6a24d138b1e721d5))
- update to electron 18 to avoid gpu issues on certain linux distros ([bcd4755](https://github.com/roldanjr/pomatez/commit/bcd475596c689b7d13fd179a54373a1ca3c5ae24))
- **website:** force render on client-side ([#206](https://github.com/roldanjr/pomatez/issues/206)) ([fb9f111](https://github.com/roldanjr/pomatez/commit/fb9f111b65737fc5d6f317704618df819d8cc7f3))
- **website:** remove canonical link as because it's unnecessary ([a4cd6ba](https://github.com/roldanjr/pomatez/commit/a4cd6babcc9ece0854a60423857f1155ba500c0b))
- **website:** remove the clean script on predeploy ([065a0a6](https://github.com/roldanjr/pomatez/commit/065a0a695f6641da731ded84c45dfcb39a54bb5e))
- **website:** scrolling issues ([0649dcf](https://github.com/roldanjr/pomatez/commit/0649dcf92cda2f27d948e7755d9dc01925b54ca6))
- window randomly vanishing on mac after minimise ([fbfaca9](https://github.com/roldanjr/pomatez/commit/fbfaca95a2788a3e4dc02e5d04fe6b18fe572679))
- windows full screen mode issues ([55344a2](https://github.com/roldanjr/pomatez/commit/55344a2c97c7ab064a565cc7973663469aff5ff1))

### [1.2.1](https://github.com/roldanjr/pomatez/compare/root-v1.2.0...root-v1.2.1) (2022-04-14)

### Features ✨

- added compact mode ([#178](https://github.com/roldanjr/pomatez/issues/178)) ([c057c11](https://github.com/roldanjr/pomatez/commit/c057c11b88122b8bac90867738b1c4319ad7a8ae))
- **website:** update downloadable installer version ([cd1b1cd](https://github.com/roldanjr/pomatez/commit/cd1b1cdaccf0ff8d17a1dcff4cd6d2f8f3536bcc))

### Changes to Existing Features 🔧

- increase max rounds to 10 ([#241](https://github.com/roldanjr/pomatez/issues/241)) ([270701d](https://github.com/roldanjr/pomatez/commit/270701db906ca314a552c8ea629f6ce083424cd8))

### Bug Fixes 🐛

- **app:** invalid .desktop category mentioned here [#127](https://github.com/roldanjr/pomatez/issues/127) ([534db41](https://github.com/roldanjr/pomatez/commit/534db4111b1969cec953e9545c0d3f1d724c13c6))
- **app:** try to fix issue [#106](https://github.com/roldanjr/pomatez/issues/106) ([1061494](https://github.com/roldanjr/pomatez/commit/1061494f96dff436564001ae49aac8153687176b))
- bump version for main package.json (was resulting in wrong release version) ([c1530ce](https://github.com/roldanjr/pomatez/commit/c1530ce20b3e340237c6857a6eac4eba0aead6e9))
- change help links cursor to pointer ([930e79a](https://github.com/roldanjr/pomatez/commit/930e79aad7fa2fec154a8565c8570499f7b51cf4)), closes [#167](https://github.com/roldanjr/pomatez/issues/167)
- flag extra files for version bumps ([a9b2a31](https://github.com/roldanjr/pomatez/commit/a9b2a319f20563b15325a734e3fa167faab81dc2))
- lower electron version as bumping causes release build failures ([dff7116](https://github.com/roldanjr/pomatez/commit/dff7116286907b0d80e397661c907856a78ff897))
- **website:** force render on client-side ([#206](https://github.com/roldanjr/pomatez/issues/206)) ([fb9f111](https://github.com/roldanjr/pomatez/commit/fb9f111b65737fc5d6f317704618df819d8cc7f3))
- **website:** remove canonical link as because it's unnecessary ([a4cd6ba](https://github.com/roldanjr/pomatez/commit/a4cd6babcc9ece0854a60423857f1155ba500c0b))
- **website:** remove the clean script on predeploy ([065a0a6](https://github.com/roldanjr/pomatez/commit/065a0a695f6641da731ded84c45dfcb39a54bb5e))
- **website:** scrolling issues ([0649dcf](https://github.com/roldanjr/pomatez/commit/0649dcf92cda2f27d948e7755d9dc01925b54ca6))

### Miscellaneous Chores

- this is just to try and trigger the right release version ([2f6fb49](https://github.com/roldanjr/pomatez/commit/2f6fb49c77694d99cdb0e26a5765688834841cf6))

## [1.2.0](https://github.com/roldanjr/pomatez/compare/root-v1.1.0...root-v1.2.0) (2022-04-11)

### Features ✨

- added compact mode ([#178](https://github.com/roldanjr/pomatez/issues/178)) ([c057c11](https://github.com/roldanjr/pomatez/commit/c057c11b88122b8bac90867738b1c4319ad7a8ae))
- **website:** update downloadable installer version ([cd1b1cd](https://github.com/roldanjr/pomatez/commit/cd1b1cdaccf0ff8d17a1dcff4cd6d2f8f3536bcc))

### Bug Fixes 🐛

- **app:** invalid .desktop category mentioned here [#127](https://github.com/roldanjr/pomatez/issues/127) ([534db41](https://github.com/roldanjr/pomatez/commit/534db4111b1969cec953e9545c0d3f1d724c13c6))
- **app:** try to fix issue [#106](https://github.com/roldanjr/pomatez/issues/106) ([1061494](https://github.com/roldanjr/pomatez/commit/1061494f96dff436564001ae49aac8153687176b))
- change help links cursor to pointer ([930e79a](https://github.com/roldanjr/pomatez/commit/930e79aad7fa2fec154a8565c8570499f7b51cf4)), closes [#167](https://github.com/roldanjr/pomatez/issues/167)
- **website:** force render on client-side ([#206](https://github.com/roldanjr/pomatez/issues/206)) ([fb9f111](https://github.com/roldanjr/pomatez/commit/fb9f111b65737fc5d6f317704618df819d8cc7f3))
- **website:** remove canonical link as because it's unnecessary ([a4cd6ba](https://github.com/roldanjr/pomatez/commit/a4cd6babcc9ece0854a60423857f1155ba500c0b))
- **website:** remove the clean script on predeploy ([065a0a6](https://github.com/roldanjr/pomatez/commit/065a0a695f6641da731ded84c45dfcb39a54bb5e))
- **website:** scrolling issues ([0649dcf](https://github.com/roldanjr/pomatez/commit/0649dcf92cda2f27d948e7755d9dc01925b54ca6))

### Changes to Existing Features 🔧

- increase max rounds to 10 ([#241](https://github.com/roldanjr/pomatez/issues/241)) ([270701d](https://github.com/roldanjr/pomatez/commit/270701db906ca314a552c8ea629f6ce083424cd8))
