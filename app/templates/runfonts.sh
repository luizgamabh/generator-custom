#!/bin/sh

runfonts() {
	if [[ "${1}" == "-f" || "${1}" == "--font" ]]; then
        /f/ambiente/webify/webify.exe ./resources/fonts/${2}
        exit
    elif [[ "${1}" == "-c" || "${1}" == "--clean" ]]; then
    	find ./resources/fonts/ -type f -regex ".*\.\(woff\|svg\|eot\)" -exec rm {} \;
    else
#        find ./resources/fonts/ -name "*.ttf" -exec /f/ambiente/webify/webify.exe {} \;
        find ./resources/fonts/ -type f -regex ".*\.\(ttf\|otf\)" -exec /f/ambiente/webify/webify.exe {} \;
    fi
}

runfonts $*
