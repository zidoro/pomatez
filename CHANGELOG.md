# Changelog

## [1.7.2](https://github.com/zidoro/pomatez/compare/v1.7.1...v1.7.2) (2024-08-30)


### Bug Fixes 🐛

* react warning that was blocking the previous release ([#666](https://github.com/zidoro/pomatez/issues/666)) ([c2f0861](https://github.com/zidoro/pomatez/commit/c2f0861f3400f028fe6c767b1af6d33da60edd92))

## [1.7.1](https://github.com/zidoro/pomatez/compare/v1.7.0...v1.7.1) (2024-08-30)


### Bug Fixes 🐛

* add extra logic to keep track of time accurately when in the background ([#664](https://github.com/zidoro/pomatez/issues/664)) ([5276215](https://github.com/zidoro/pomatez/commit/52762152aa5b4a5eee0b679342966df14b04339f)), closes [#608](https://github.com/zidoro/pomatez/issues/608)

## [1.7.0](https://github.com/zidoro/pomatez/compare/v1.6.4...v1.7.0) (2024-07-25)


### Features ✨

* allow user to input shortcuts in the Shortcut component (requires backend changes) ([#523](https://github.com/zidoro/pomatez/issues/523)) ([47ecece](https://github.com/zidoro/pomatez/commit/47ececea7ae9c929215e064272ef4e57004d615e))
* hide preview button when the text in not being edited ([#657](https://github.com/zidoro/pomatez/issues/657)) ([b1ed5af](https://github.com/zidoro/pomatez/commit/b1ed5af1ec9012a3b14a762bcc1658d7d9dee0f4))


### Bug Fixes 🐛

* add word wrapping for card titles ([#637](https://github.com/zidoro/pomatez/issues/637)) ([a63a21e](https://github.com/zidoro/pomatez/commit/a63a21ec3e98f433ad8e18e1425f731cd922fc0d))
* typo with "stay focused" ([9c5cbd6](https://github.com/zidoro/pomatez/commit/9c5cbd616d4e6a063ae293acaec951da7e6d09f2))


### Reverts ⏪️

* remove google analytics in the app ([#610](https://github.com/zidoro/pomatez/issues/610)) ([95dae58](https://github.com/zidoro/pomatez/commit/95dae58e67f449a161dbd5e86daffe447ef3883d)), closes [#609](https://github.com/zidoro/pomatez/issues/609)

## [1.6.4](https://github.com/zidoro/pomatez/compare/v1.6.3...v1.6.4) (2023-12-16)

### Bug Fixes 🐛

- electron and tauri signing (release 1.6.3 was skipped) ([6442717](https://github.com/zidoro/pomatez/commit/64427172d5721f9384d0d7f5ebf26c8130938812))

## [1.6.3](https://github.com/zidoro/pomatez/compare/v1.6.2...v1.6.3) (2023-12-16)

### Bug Fixes 🐛

- mac signing for electron and tauri ([2c542fe](https://github.com/zidoro/pomatez/commit/2c542feec3f243847dd685913d093f2a48395b00))

## [1.6.2](https://github.com/zidoro/pomatez/compare/v1.6.1...v1.6.2) (2023-12-12)

### Bug Fixes 🐛

- winget release fix ([8759751](https://github.com/zidoro/pomatez/commit/875975112d282572f08d848047fe577a12db0401))

## [1.6.1](https://github.com/zidoro/pomatez/compare/v1.6.0...v1.6.1) (2023-11-23)

### Bug Fixes 🐛

- release issue (didn't release to homebrew or winget) ([fe854b0](https://github.com/zidoro/pomatez/commit/fe854b040446afa169478359413b4937ffdc75ae))

## [1.6.0](https://github.com/zidoro/pomatez/compare/v1.5.0...v1.6.0) (2023-11-23)

### Features ✨

- shortcuts for adding new cards with `Enter` & `Ctrl+Enter` ([a73fca7](https://github.com/zidoro/pomatez/commit/a73fca70847836bf7b96bdef54e67023813bda29))

### Bug Fixes 🐛

- electron open at login notification showed up on every start up ([654c4db](https://github.com/zidoro/pomatez/commit/654c4dbbeaaa07c69bade454855ab96259d17516))
- **tauri:** avoid setting open at login if already set ([1e836ee](https://github.com/zidoro/pomatez/commit/1e836ee7f8d4670208e276912faf5c7d1fc1ad0f))
- **website:** wrong download link for macOS apple silicon installer ([476b232](https://github.com/zidoro/pomatez/commit/476b232615b257e04c9f9065e435b26860b2995a))

## [1.5.0](https://github.com/zidoro/pomatez/compare/v1.4.2...v1.5.0) (2023-11-17)

### Features ✨

- add a link to our community discord ([8b2802f](https://github.com/zidoro/pomatez/commit/8b2802f61f7e8004260a27090ad4c768a0a4185f))

### Bug Fixes 🐛

- **tauri:** check autostart status to prevent error with `@tauri-apps/plugin-autostart` on Windows ([de4f8b9](https://github.com/zidoro/pomatez/commit/de4f8b9441b7a8e9d8f1225285e43fd0cb3c8e62))
- **tauri:** github link opens in app ([09e5ae3](https://github.com/zidoro/pomatez/commit/09e5ae39436ffe95b032df12e6c6752cfa704ab1))
- **tauri:** high dpi screen scaling ([a9ff671](https://github.com/zidoro/pomatez/commit/a9ff6713054ac00692844c6f264c35ca896a80a7))

## [1.4.2](https://github.com/zidoro/pomatez/compare/v1.4.1...v1.4.2) (2023-11-12)

### Bug Fixes 🐛

- **tauri:** mac ipc added to connect-src CSP ([b535250](https://github.com/zidoro/pomatez/commit/b535250f5ae720cc75ad50badee381ee7d5a4c47))

## [1.4.1](https://github.com/zidoro/pomatez/compare/v1.4.0...v1.4.1) (2023-11-12)

### Bug Fixes 🐛

- **tauri:** links now open in the default browser ([901b824](https://github.com/zidoro/pomatez/commit/901b82481eab8da6e5aade01a97874e52a1905c4))

## [1.4.0](https://github.com/zidoro/pomatez/compare/v1.3.1...v1.4.0) (2023-11-12)

### Features ✨

- add base tauri app ([8b91a3f](https://github.com/zidoro/pomatez/commit/8b91a3f898efa8f1775eb83b937f379a56d9c4da))
- make tauri version draggable ([6202477](https://github.com/zidoro/pomatez/commit/620247715b3fb0e21c0a68b4fd77470f30f60391))
- restructure connector in a way that allows easy switching out for platforms ([ce368dd](https://github.com/zidoro/pomatez/commit/ce368dd03b7edf3129acedbae1acabad059c2d67))
- **tauri:** add base connector with placeholders for logging ([a989379](https://github.com/zidoro/pomatez/commit/a989379a57c66078409169d325c61860b109c8fe))
- **tauri:** add closing logic ([5b7c749](https://github.com/zidoro/pomatez/commit/5b7c74958b216424ccb922a5e7c49df271d0f912))
- **tauri:** add easy command interface for frontend -&gt; backend ([4483005](https://github.com/zidoro/pomatez/commit/44830057ee8a4a70c68677becab8a467c742d102))
- **tauri:** add global show and hide shortcuts as well as block reload ([ef17d00](https://github.com/zidoro/pomatez/commit/ef17d00c5ee5fc46fef7c409734b6524edc7acdb))
- **tauri:** add tray icon updating and a number of other commands ([61d3e2c](https://github.com/zidoro/pomatez/commit/61d3e2c00fb6c9e1a617802c7f6f283eb5793163))
- **tauri:** added connection hooks for all of the base tauri commands ([9ad7edc](https://github.com/zidoro/pomatez/commit/9ad7edcd3d6c3e212c4273e26d6ce2df8843a0dc))
- **tauri:** always on top command ([702f419](https://github.com/zidoro/pomatez/commit/702f4198548b0a2ba21cf1418f5849c969ff6cfb))
- **tauri:** auto updater ([02c6d00](https://github.com/zidoro/pomatez/commit/02c6d00e38c2eeb6ce3883709ae1b97b426ebf4d))
- **tauri:** compact mode resizing ([dc63f31](https://github.com/zidoro/pomatez/commit/dc63f31a3402aaa9b8ded51f6f804bf3607a8ae2))
- **tauri:** debug menu in dev mode ([c5289b9](https://github.com/zidoro/pomatez/commit/c5289b9c905e40e4d6dea9912d8f9f666fba977c))
- **tauri:** full screen mode ([d59ca69](https://github.com/zidoro/pomatez/commit/d59ca6946057360cb49427aba3584775c2c69e18))
- **tauri:** improve installer ([f9c8eb2](https://github.com/zidoro/pomatez/commit/f9c8eb283020f269928d4b65e72a39aa80ff0d4c))
- **tauri:** pass the data from the frontend into the commands ([58553d8](https://github.com/zidoro/pomatez/commit/58553d8d9072de3e6d461942799b322b4bbbb3ce))
- **tauri:** updater window ([2dfc795](https://github.com/zidoro/pomatez/commit/2dfc7952a1b46ff970a9020217e1211a6c210b2e))

### Bug Fixes 🐛

- changing time configuration with keyboard did not work - [#402](https://github.com/zidoro/pomatez/issues/402) ([#489](https://github.com/zidoro/pomatez/issues/489)) ([b9b5248](https://github.com/zidoro/pomatez/commit/b9b524863d50905a756bbb1428fd87ed7f7c73e7))
- **tauri:** allow context menu on list titles ([a2ae285](https://github.com/zidoro/pomatez/commit/a2ae28569ea11074bc3413bda3f0085b39f7b369))
- **tauri:** catch audio playing errors gracefully ([f4f3274](https://github.com/zidoro/pomatez/commit/f4f3274881d1bbd40eea38bff72466dd25dbb18e))
- **tauri:** fullscreen break being resizeable ([aec8c3a](https://github.com/zidoro/pomatez/commit/aec8c3a73cf260192d1d4a33dc4071d7b592ba59))
- **tauri:** update to tauri v2 (fixes audio) ([231a379](https://github.com/zidoro/pomatez/commit/231a37903c7ff36b15025be98eaad7db1782446d))

## [1.3.1](https://github.com/zidoro/pomatez/compare/v1.3.0...v1.3.1) (2023-10-19)

### Bug Fixes 🐛

- javascript error on launch ([#414](https://github.com/zidoro/pomatez/issues/414)) ([c6c18fb](https://github.com/zidoro/pomatez/commit/c6c18fb47b424be62a9b91ed64c7c95e8eaa41a3))
- **lang:** Switch "released notes" with "release notes" ([#439](https://github.com/zidoro/pomatez/issues/439)) ([d9a3afa](https://github.com/zidoro/pomatez/commit/d9a3afa11f828084483c1d1e3693ff9b0dc1c8e1))
- toast notification ([#382](https://github.com/zidoro/pomatez/issues/382)) ([25403d7](https://github.com/zidoro/pomatez/commit/25403d742d83d0d3654418a43bc5efe8316dc019))

## [1.3.0](https://github.com/zidoro/pomatez/compare/v1.2.3...v1.3.0) (2023-09-26)

### Features ✨

- add support for open at login in the settings tab ([f57e133](https://github.com/zidoro/pomatez/commit/f57e1335d59938d95c6de4455b96aafcc8a878a2))
- increase maximum focus time to 2 hours ([#383](https://github.com/zidoro/pomatez/issues/383)) ([3fc1493](https://github.com/zidoro/pomatez/commit/3fc14937ee4b08e74390fbd36eb115278f55f179))

### Bug Fixes 🐛

- compact mode layout broke with 120 minutes max timer config ([#393](https://github.com/zidoro/pomatez/issues/393)) ([c8c3c66](https://github.com/zidoro/pomatez/commit/c8c3c66460116aefe8a172b4237fa08b52583ffc))
- disable dragging for navigation links ([#387](https://github.com/zidoro/pomatez/issues/387)) ([a5b147f](https://github.com/zidoro/pomatez/commit/a5b147fbac812b2be6e92ce218841bfebe29d790))
- fix security issues ([bcbd65f](https://github.com/zidoro/pomatez/commit/bcbd65fa18d5f5531b20ab2ee0462b03ec766b5c)), closes [#407](https://github.com/zidoro/pomatez/issues/407)
- notification type selection issue in settings ([04ddca1](https://github.com/zidoro/pomatez/commit/04ddca16023bfea1b6496d41769ee7715700354d))

## [1.2.3](https://github.com/zidoro/pomatez/compare/v1.2.2...v1.2.3) (2023-05-03)

### Bug Fixes 🐛

- **app/renderer:** fix linter warnings that causes CI test build failing ([26edd59](https://github.com/zidoro/pomatez/commit/26edd59b26155954208fafc0dc3d933501c11bc9))
- Set Application Menu to Fix Mac Shortcuts ([0e6d47f](https://github.com/zidoro/pomatez/commit/0e6d47f0eb166256f914494518b4ea9e63160c06))

## [1.2.2](https://github.com/zidoro/pomatez/compare/v1.2.1...v1.2.2) (2022-12-21)

### Bug Fixes 🐛

- missing app icon ([c0617bd](https://github.com/zidoro/pomatez/commit/c0617bdee55923aad9da4fc09e1238c966f77958))

## [1.2.1](https://github.com/zidoro/pomatez/compare/v1.2.1...v1.2.1) (2022-12-20)

### Changes to Existing Features 🔧

- increase max rounds to 10 ([#241](https://github.com/zidoro/pomatez/issues/241)) ([270701d](https://github.com/zidoro/pomatez/commit/270701db906ca314a552c8ea629f6ce083424cd8))

### Miscellaneous Chores

- this is just to try and trigger the right release version ([2f6fb49](https://github.com/zidoro/pomatez/commit/2f6fb49c77694d99cdb0e26a5765688834841cf6))

### Features ✨

- added compact mode ([#178](https://github.com/zidoro/pomatez/issues/178)) ([c057c11](https://github.com/zidoro/pomatez/commit/c057c11b88122b8bac90867738b1c4319ad7a8ae))
- allow other UI to scale to the new resizeable mode ([dee69fe](https://github.com/zidoro/pomatez/commit/dee69fe70020913f407fd8ae0c06698afa81649d))
- allow the window to be resized and app to scale ([9bd0128](https://github.com/zidoro/pomatez/commit/9bd0128120fccd8e9c6810a50434700f14a4cc17))
- **compact mode:** prevent user from resizing the window ([dd69232](https://github.com/zidoro/pomatez/commit/dd69232cee804ced9a51566512b196a902453bb4))
- **website:** update downloadable installer version ([cd1b1cd](https://github.com/zidoro/pomatez/commit/cd1b1cdaccf0ff8d17a1dcff4cd6d2f8f3536bcc))

### Bug Fixes 🐛

- app icon on mac ([ce12ace](https://github.com/zidoro/pomatez/commit/ce12ace0701f2e4bce298c5b8ae0e9533fb89afd))
- **app:** invalid .desktop category mentioned here [#127](https://github.com/zidoro/pomatez/issues/127) ([534db41](https://github.com/zidoro/pomatez/commit/534db4111b1969cec953e9545c0d3f1d724c13c6))
- **app:** try to fix issue [#106](https://github.com/zidoro/pomatez/issues/106) ([1061494](https://github.com/zidoro/pomatez/commit/1061494f96dff436564001ae49aac8153687176b))
- broken styles during compact mode ([b142a47](https://github.com/zidoro/pomatez/commit/b142a47ade65196be406bf78529ce10f723ca012))
- bump version for main package.json (was resulting in wrong release version) ([c1530ce](https://github.com/zidoro/pomatez/commit/c1530ce20b3e340237c6857a6eac4eba0aead6e9))
- center add card element creating started ([6d4ce16](https://github.com/zidoro/pomatez/commit/6d4ce16f7160dfd2240d58703c5a37d472d9e34e))
- change help links cursor to pointer ([930e79a](https://github.com/zidoro/pomatez/commit/930e79aad7fa2fec154a8565c8570499f7b51cf4)), closes [#167](https://github.com/zidoro/pomatez/issues/167)
- don't close cards when clicking as its easy to lose info ([8394249](https://github.com/zidoro/pomatez/commit/839424935bdb74446d11c0c11fabba399146b41f))
- drag logic for logo on title bar ([460090b](https://github.com/zidoro/pomatez/commit/460090b8f015c696fe6cffa6823fffd322ae9a5a))
- exiting fullscreen error on linux ([a08ec7a](https://github.com/zidoro/pomatez/commit/a08ec7abca7eaba3ed7eeb1bf3e1f5d9ebb5c47a))
- explicitly define security policy to stop electron complaining ([d19fead](https://github.com/zidoro/pomatez/commit/d19fead0fde4a778afcbb62e92f38544ff01b175))
- flag extra files for version bumps ([a9b2a31](https://github.com/zidoro/pomatez/commit/a9b2a319f20563b15325a734e3fa167faab81dc2))
- fullscreen break escape key issue ([b4affbb](https://github.com/zidoro/pomatez/commit/b4affbb3d70421be5383669afd9337c44d763a72))
- lower electron version as bumping causes release build failures ([dff7116](https://github.com/zidoro/pomatez/commit/dff7116286907b0d80e397661c907856a78ff897))
- lower uuid version to fix lib export issue ([fd30315](https://github.com/zidoro/pomatez/commit/fd303150b853964e2a4bd425f0104804dc4b5866))
- mac fullscreen break ([42dd82d](https://github.com/zidoro/pomatez/commit/42dd82d3d37cd71e6e4ff63aafaea39427a6fe1a))
- make tasks not edit when clicking contained links ([7b4de89](https://github.com/zidoro/pomatez/commit/7b4de89bab6421561bba63fa146dcfd3fdc2a49f))
- make the settings menu vertically resize ([eec4ef0](https://github.com/zidoro/pomatez/commit/eec4ef0372e1979a856832ce3c0333dbb2c5bc1b))
- min size not respected when coming out of compact mode ([1d3171f](https://github.com/zidoro/pomatez/commit/1d3171f24b216892fe08da3b266f96948dc5588a))
- range slider visual bug on window resized ([365fda3](https://github.com/zidoro/pomatez/commit/365fda3e8d116a22c301142dabbd48e6e5ffed26))
- re-enable resizeable as it may be causing issues on ubuntu ([e7befeb](https://github.com/zidoro/pomatez/commit/e7befeb933119ae616d7a93de22267f98f645d31))
- styling issues with compact mode + fullscreen ([3cb1725](https://github.com/zidoro/pomatez/commit/3cb1725f201f38fd0b37fe10fed75d5c1e829a92))
- task links not opening in new windows ([a32807f](https://github.com/zidoro/pomatez/commit/a32807f757315606b3c2c2048f3d85f8a794ad8b))
- timer task preview size ([5ed1275](https://github.com/zidoro/pomatez/commit/5ed12752f8de3a30694582ea6a24d138b1e721d5))
- update to electron 18 to avoid gpu issues on certain linux distros ([bcd4755](https://github.com/zidoro/pomatez/commit/bcd475596c689b7d13fd179a54373a1ca3c5ae24))
- **website:** force render on client-side ([#206](https://github.com/zidoro/pomatez/issues/206)) ([fb9f111](https://github.com/zidoro/pomatez/commit/fb9f111b65737fc5d6f317704618df819d8cc7f3))
- **website:** remove canonical link as because it's unnecessary ([a4cd6ba](https://github.com/zidoro/pomatez/commit/a4cd6babcc9ece0854a60423857f1155ba500c0b))
- **website:** remove the clean script on predeploy ([065a0a6](https://github.com/zidoro/pomatez/commit/065a0a695f6641da731ded84c45dfcb39a54bb5e))
- **website:** scrolling issues ([0649dcf](https://github.com/zidoro/pomatez/commit/0649dcf92cda2f27d948e7755d9dc01925b54ca6))
- window randomly vanishing on mac after minimise ([fbfaca9](https://github.com/zidoro/pomatez/commit/fbfaca95a2788a3e4dc02e5d04fe6b18fe572679))
- windows full screen mode issues ([55344a2](https://github.com/zidoro/pomatez/commit/55344a2c97c7ab064a565cc7973663469aff5ff1))

### [1.2.1](https://github.com/zidoro/pomatez/compare/root-v1.2.0...root-v1.2.1) (2022-04-14)

### Features ✨

- added compact mode ([#178](https://github.com/zidoro/pomatez/issues/178)) ([c057c11](https://github.com/zidoro/pomatez/commit/c057c11b88122b8bac90867738b1c4319ad7a8ae))
- **website:** update downloadable installer version ([cd1b1cd](https://github.com/zidoro/pomatez/commit/cd1b1cdaccf0ff8d17a1dcff4cd6d2f8f3536bcc))

### Changes to Existing Features 🔧

- increase max rounds to 10 ([#241](https://github.com/zidoro/pomatez/issues/241)) ([270701d](https://github.com/zidoro/pomatez/commit/270701db906ca314a552c8ea629f6ce083424cd8))

### Bug Fixes 🐛

- **app:** invalid .desktop category mentioned here [#127](https://github.com/zidoro/pomatez/issues/127) ([534db41](https://github.com/zidoro/pomatez/commit/534db4111b1969cec953e9545c0d3f1d724c13c6))
- **app:** try to fix issue [#106](https://github.com/zidoro/pomatez/issues/106) ([1061494](https://github.com/zidoro/pomatez/commit/1061494f96dff436564001ae49aac8153687176b))
- bump version for main package.json (was resulting in wrong release version) ([c1530ce](https://github.com/zidoro/pomatez/commit/c1530ce20b3e340237c6857a6eac4eba0aead6e9))
- change help links cursor to pointer ([930e79a](https://github.com/zidoro/pomatez/commit/930e79aad7fa2fec154a8565c8570499f7b51cf4)), closes [#167](https://github.com/zidoro/pomatez/issues/167)
- flag extra files for version bumps ([a9b2a31](https://github.com/zidoro/pomatez/commit/a9b2a319f20563b15325a734e3fa167faab81dc2))
- lower electron version as bumping causes release build failures ([dff7116](https://github.com/zidoro/pomatez/commit/dff7116286907b0d80e397661c907856a78ff897))
- **website:** force render on client-side ([#206](https://github.com/zidoro/pomatez/issues/206)) ([fb9f111](https://github.com/zidoro/pomatez/commit/fb9f111b65737fc5d6f317704618df819d8cc7f3))
- **website:** remove canonical link as because it's unnecessary ([a4cd6ba](https://github.com/zidoro/pomatez/commit/a4cd6babcc9ece0854a60423857f1155ba500c0b))
- **website:** remove the clean script on predeploy ([065a0a6](https://github.com/zidoro/pomatez/commit/065a0a695f6641da731ded84c45dfcb39a54bb5e))
- **website:** scrolling issues ([0649dcf](https://github.com/zidoro/pomatez/commit/0649dcf92cda2f27d948e7755d9dc01925b54ca6))

### Miscellaneous Chores

- this is just to try and trigger the right release version ([2f6fb49](https://github.com/zidoro/pomatez/commit/2f6fb49c77694d99cdb0e26a5765688834841cf6))

## [1.2.0](https://github.com/zidoro/pomatez/compare/root-v1.1.0...root-v1.2.0) (2022-04-11)

### Features ✨

- added compact mode ([#178](https://github.com/zidoro/pomatez/issues/178)) ([c057c11](https://github.com/zidoro/pomatez/commit/c057c11b88122b8bac90867738b1c4319ad7a8ae))
- **website:** update downloadable installer version ([cd1b1cd](https://github.com/zidoro/pomatez/commit/cd1b1cdaccf0ff8d17a1dcff4cd6d2f8f3536bcc))

### Bug Fixes 🐛

- **app:** invalid .desktop category mentioned here [#127](https://github.com/zidoro/pomatez/issues/127) ([534db41](https://github.com/zidoro/pomatez/commit/534db4111b1969cec953e9545c0d3f1d724c13c6))
- **app:** try to fix issue [#106](https://github.com/zidoro/pomatez/issues/106) ([1061494](https://github.com/zidoro/pomatez/commit/1061494f96dff436564001ae49aac8153687176b))
- change help links cursor to pointer ([930e79a](https://github.com/zidoro/pomatez/commit/930e79aad7fa2fec154a8565c8570499f7b51cf4)), closes [#167](https://github.com/zidoro/pomatez/issues/167)
- **website:** force render on client-side ([#206](https://github.com/zidoro/pomatez/issues/206)) ([fb9f111](https://github.com/zidoro/pomatez/commit/fb9f111b65737fc5d6f317704618df819d8cc7f3))
- **website:** remove canonical link as because it's unnecessary ([a4cd6ba](https://github.com/zidoro/pomatez/commit/a4cd6babcc9ece0854a60423857f1155ba500c0b))
- **website:** remove the clean script on predeploy ([065a0a6](https://github.com/zidoro/pomatez/commit/065a0a695f6641da731ded84c45dfcb39a54bb5e))
- **website:** scrolling issues ([0649dcf](https://github.com/zidoro/pomatez/commit/0649dcf92cda2f27d948e7755d9dc01925b54ca6))

### Changes to Existing Features 🔧

- increase max rounds to 10 ([#241](https://github.com/zidoro/pomatez/issues/241)) ([270701d](https://github.com/zidoro/pomatez/commit/270701db906ca314a552c8ea629f6ce083424cd8))
