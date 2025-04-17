.PHONY: all
all:
	cd grid4drawing && zip ../grid4drawing.xpi manifest.json \
		background.js grid4drawing.css grid4drawing.html grid4drawing.js \
		icons/grid-icon-16.png \
		icons/grid-icon-32.png
