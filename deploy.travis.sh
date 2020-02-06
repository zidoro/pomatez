#! /bin/bash
if [ "$TRAVIS_OS_NAME" == osx ]; then
    # deploy on mac and windows
    yarn release --mac --win
else
    # deploy on linux
    GH_TOKEN yarn release
fi