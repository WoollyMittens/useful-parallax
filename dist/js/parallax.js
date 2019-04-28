/*
	Source:
	van Creij, Maurice (2018). "parallax.js: Position and load backgrounds based on screen position.", http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

// establish the class
var Parallax = function (config) {

	// PROPERTIES

	this.scroller = config.scroller || window;
	this.foregrounds = config.foregrounds;
	this.backgrounds = config.backgrounds;

	this.config = {
		'vertical': 1,
		'offset': 0,
		'exponential': 1,
		'treshhold': 100,
		'parallax': false,
		'always': false
	};

	for (var key in config) {
		this.config[key] = config[key];
	}

	// METHODS

	this.update = function () {
		var objectPos, objectSize, relativePosition, className,
			replace = new RegExp(' off-stage| on-stage|off-stage|on-stage', 'i'),
			relativeOffset = this.config.offset / 100,
			relativeDisplacement = this.config.displacement / 100;
		// get the scroll position
		var scrollSize = positions.window(this.scroller);
		var scrollPos = positions.document(this.scroller);
		// if we can measure the scroller
		if (scrollSize.y !== 0) {
			// for every watched element
			for (var a = 0, b = this.foregrounds.length, c = this.backgrounds.length; a < b; a += 1) {
				className = this.foregrounds[a].className;
				// get the object position / dimensions
				objectPos = { x : this.foregrounds[a].offsetLeft, y : this.foregrounds[a].offsetTop };
				objectSize = { x : this.foregrounds[a].offsetWidth, y : this.foregrounds[a].offsetHeight };
				// if the object is in the viewport
				if (objectPos.y + objectSize.y >= scrollPos.y - this.config.offset && objectPos.y < scrollPos.y + this.config.treshold + scrollSize.y) {
					// if required position the parallax
					if (b === c) {
						relativePosition = (objectPos.y - scrollPos.y + objectSize.y) / (scrollSize.y + objectSize.y);
						relativePosition = Math.min(Math.max(relativePosition, 0), 1);
						relativePosition = Math.pow((relativePosition - 0.5) * 2, this.config.exponential);
						relativePosition = relativePosition * relativeDisplacement + relativeOffset;
						this.backgrounds[a].style.transform = 'translateY(' + (relativePosition * 100) + '%)';
						this.backgrounds[a].style.webkitTransform = 'translateY(' + (relativePosition * 100) + '%)';
						this.backgrounds[a].style.msTransform = 'translateY(' + (relativePosition * 100) + '%)';
					}
					// mark its visibility
					this.foregrounds[a].className = className.replace(replace, '') + ' on-stage';
				} else {
					// mark the object is outside the viewport
					this.foregrounds[a].className = className.replace(replace, '') + ' off-stage';
				}
			}
		}
	};

	// EVENTS

	this.scroller.addEventListener('scroll', this.update.bind(this), true);
	this.update();

};

// return as a require.js module
if (typeof define != 'undefined') define([], function () { return Parallax });
if (typeof module != 'undefined') module.exports = Parallax;
