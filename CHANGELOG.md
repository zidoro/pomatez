# Changelog

## [1.2.1](https://github.com/roldanjr/pomatez/compare/v1.2.1...v1.2.1) (2022-12-20)


### Changes to Existing Features 🔧

* increase max rounds to 10 ([#241](https://github.com/roldanjr/pomatez/issues/241)) ([270701d](https://github.com/roldanjr/pomatez/commit/270701db906ca314a552c8ea629f6ce083424cd8))


### Miscellaneous Chores

* this is just to try and trigger the right release version ([2f6fb49](https://github.com/roldanjr/pomatez/commit/2f6fb49c77694d99cdb0e26a5765688834841cf6))


### Features ✨

* added compact mode ([#178](https://github.com/roldanjr/pomatez/issues/178)) ([c057c11](https://github.com/roldanjr/pomatez/commit/c057c11b88122b8bac90867738b1c4319ad7a8ae))
* allow other UI to scale to the new resizeable mode ([dee69fe](https://github.com/roldanjr/pomatez/commit/dee69fe70020913f407fd8ae0c06698afa81649d))
* allow the window to be resized and app to scale ([9bd0128](https://github.com/roldanjr/pomatez/commit/9bd0128120fccd8e9c6810a50434700f14a4cc17))
* **compact mode:** prevent user from resizing the window ([dd69232](https://github.com/roldanjr/pomatez/commit/dd69232cee804ced9a51566512b196a902453bb4))
* **website:** update downloadable installer version ([cd1b1cd](https://github.com/roldanjr/pomatez/commit/cd1b1cdaccf0ff8d17a1dcff4cd6d2f8f3536bcc))


### Bug Fixes 🐛

* app icon on mac ([ce12ace](https://github.com/roldanjr/pomatez/commit/ce12ace0701f2e4bce298c5b8ae0e9533fb89afd))
* **app:** invalid .desktop category mentioned here [#127](https://github.com/roldanjr/pomatez/issues/127) ([534db41](https://github.com/roldanjr/pomatez/commit/534db4111b1969cec953e9545c0d3f1d724c13c6))
* **app:** try to fix issue [#106](https://github.com/roldanjr/pomatez/issues/106) ([1061494](https://github.com/roldanjr/pomatez/commit/1061494f96dff436564001ae49aac8153687176b))
* broken styles during compact mode ([b142a47](https://github.com/roldanjr/pomatez/commit/b142a47ade65196be406bf78529ce10f723ca012))
* bump version for main package.json (was resulting in wrong release version) ([c1530ce](https://github.com/roldanjr/pomatez/commit/c1530ce20b3e340237c6857a6eac4eba0aead6e9))
* center add card element creating started ([6d4ce16](https://github.com/roldanjr/pomatez/commit/6d4ce16f7160dfd2240d58703c5a37d472d9e34e))
* change help links cursor to pointer ([930e79a](https://github.com/roldanjr/pomatez/commit/930e79aad7fa2fec154a8565c8570499f7b51cf4)), closes [#167](https://github.com/roldanjr/pomatez/issues/167)
* don't close cards when clicking as its easy to lose info ([8394249](https://github.com/roldanjr/pomatez/commit/839424935bdb74446d11c0c11fabba399146b41f))
* drag logic for logo on title bar ([460090b](https://github.com/roldanjr/pomatez/commit/460090b8f015c696fe6cffa6823fffd322ae9a5a))
* exiting fullscreen error on linux ([a08ec7a](https://github.com/roldanjr/pomatez/commit/a08ec7abca7eaba3ed7eeb1bf3e1f5d9ebb5c47a))
* explicitly define security policy to stop electron complaining ([d19fead](https://github.com/roldanjr/pomatez/commit/d19fead0fde4a778afcbb62e92f38544ff01b175))
* flag extra files for version bumps ([a9b2a31](https://github.com/roldanjr/pomatez/commit/a9b2a319f20563b15325a734e3fa167faab81dc2))
* fullscreen break escape key issue ([b4affbb](https://github.com/roldanjr/pomatez/commit/b4affbb3d70421be5383669afd9337c44d763a72))
* lower electron version as bumping causes release build failures ([dff7116](https://github.com/roldanjr/pomatez/commit/dff7116286907b0d80e397661c907856a78ff897))
* lower uuid version to fix lib export issue ([fd30315](https://github.com/roldanjr/pomatez/commit/fd303150b853964e2a4bd425f0104804dc4b5866))
* mac fullscreen break ([42dd82d](https://github.com/roldanjr/pomatez/commit/42dd82d3d37cd71e6e4ff63aafaea39427a6fe1a))
* make tasks not edit when clicking contained links ([7b4de89](https://github.com/roldanjr/pomatez/commit/7b4de89bab6421561bba63fa146dcfd3fdc2a49f))
* make the settings menu vertically resize ([eec4ef0](https://github.com/roldanjr/pomatez/commit/eec4ef0372e1979a856832ce3c0333dbb2c5bc1b))
* min size not respected when coming out of compact mode ([1d3171f](https://github.com/roldanjr/pomatez/commit/1d3171f24b216892fe08da3b266f96948dc5588a))
* range slider visual bug on window resized ([365fda3](https://github.com/roldanjr/pomatez/commit/365fda3e8d116a22c301142dabbd48e6e5ffed26))
* re-enable resizeable as it may be causing issues on ubuntu ([e7befeb](https://github.com/roldanjr/pomatez/commit/e7befeb933119ae616d7a93de22267f98f645d31))
* styling issues with compact mode + fullscreen ([3cb1725](https://github.com/roldanjr/pomatez/commit/3cb1725f201f38fd0b37fe10fed75d5c1e829a92))
* task links not opening in new windows ([a32807f](https://github.com/roldanjr/pomatez/commit/a32807f757315606b3c2c2048f3d85f8a794ad8b))
* timer task preview size ([5ed1275](https://github.com/roldanjr/pomatez/commit/5ed12752f8de3a30694582ea6a24d138b1e721d5))
* update to electron 18 to avoid gpu issues on certain linux distros ([bcd4755](https://github.com/roldanjr/pomatez/commit/bcd475596c689b7d13fd179a54373a1ca3c5ae24))
* **website:** force render on client-side ([#206](https://github.com/roldanjr/pomatez/issues/206)) ([fb9f111](https://github.com/roldanjr/pomatez/commit/fb9f111b65737fc5d6f317704618df819d8cc7f3))
* **website:** remove canonical link as because it's unnecessary ([a4cd6ba](https://github.com/roldanjr/pomatez/commit/a4cd6babcc9ece0854a60423857f1155ba500c0b))
* **website:** remove the clean script on predeploy ([065a0a6](https://github.com/roldanjr/pomatez/commit/065a0a695f6641da731ded84c45dfcb39a54bb5e))
* **website:** scrolling issues ([0649dcf](https://github.com/roldanjr/pomatez/commit/0649dcf92cda2f27d948e7755d9dc01925b54ca6))
* window randomly vanishing on mac after minimise ([fbfaca9](https://github.com/roldanjr/pomatez/commit/fbfaca95a2788a3e4dc02e5d04fe6b18fe572679))
* windows full screen mode issues ([55344a2](https://github.com/roldanjr/pomatez/commit/55344a2c97c7ab064a565cc7973663469aff5ff1))

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
