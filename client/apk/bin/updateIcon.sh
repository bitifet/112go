#!/bin/bash

srcFile=res/icon.png

for targetFile in $(find platforms/ -iname icon.png); do

	echo "Replacing ${targetFile}..."
	geom=$(identify $targetFile | awk '{print $3}')

	convert $srcFile -resize $geom\! $targetFile

done;

