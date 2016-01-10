#!/bin/sh

runfonts() {
	if [[ "${1}" == "-f" || "${1}" == "--font" ]]; then
        ./webify ${2}
        exit
    elif [[ "${1}" == "-c" || "${1}" == "--clean" ]]; then
    	find . -type f -regex ".*\.\(woff\|svg\|eot\)" -exec rm {} \;
    else
        find . -name "*.ttf" -exec ./webify {} \;
    fi
}

runfonts $*
