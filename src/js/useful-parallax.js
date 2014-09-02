/*
	Source:
	van Creij, Maurice (2012). "useful.parallax.js: Position and load backgrounds based on screen position.", version 20120606, http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

(function (useful) {

	// invoke strict mode
	"use strict";

	// private functions
	useful.parallax = function (scroller, foregrounds, backgrounds, cfg) {
		// properties
		this.scroller = scroller || window;
		this.foregrounds = foregrounds;
		this.backgrounds = backgrounds;
		this.cfg = cfg;
		// methods
		this.start = function () {
			// set any default values if there wasn't one
			this.cfg.vertical = this.cfg.vertical || 1;
			this.cfg.offset = this.cfg.offset || 0;
			this.cfg.exponential = this.cfg.exponential || 1;
			this.cfg.treshhold = this.cfg.treshhold || 100;
			this.cfg.parallax = this.cfg.parallax || false;
			// set the default repeat behaviour
			this.cfg.always = this.cfg.always || false;
			// set the scrolling event handler
			this.scroller.addEventListener('scroll', this.onUpdate(), true);
			// perform the first redraw
			this.update();
			// disable the start function so it can't be started twice
			this.start = function () {};
		};
		this.update = function () {
			var objectPos, objectSize, relativePosition, className, replace = new RegExp(' off-scroller| on-scroller|off-scroller|on-scroller', 'i');
			// get the scroll position
			var scrollSize = useful.positions.window(this.scroller);
			var scrollPos = useful.positions.document(this.scroller);
			// if we can measure the scroller
			if (scrollSize.y !== 0) {
				// for every watched element
				for (var a = 0, b = this.foregrounds.length, c = this.backgrounds.length; a < b; a += 1) {
					className = this.foregrounds[a].className;
					// get the object position / dimensions
					objectPos = { x : this.foregrounds[a].offsetLeft, y : this.foregrounds[a].offsetTop };
					objectSize = { x : this.foregrounds[a].offsetWidth, y : this.foregrounds[a].offsetHeight };
					// if the object is in the viewport
					if (objectPos.y + objectSize.y >= scrollPos.y - this.cfg.offset && objectPos.y < scrollPos.y + this.cfg.treshold + scrollSize.y) {
						// if required position the parallax
						if (b === c) {
							relativePosition = (objectPos.y - scrollPos.y + objectSize.y) / (scrollSize.y + objectSize.y);
							relativePosition = Math.min(Math.max(relativePosition, 0), 1);
							relativePosition = Math.pow((relativePosition - 0.5) * 2, this.cfg.exponential);
							relativePosition = relativePosition * this.cfg.displacement + this.cfg.offset;
							this.backgrounds[a].style.transform = 'translateY(' + (relativePosition * 100) + '%)';
							this.backgrounds[a].style.webkitTransform = 'translateY(' + (relativePosition * 100) + '%)';
						}
						// mark its visibility
						this.foregrounds[a].className = className.replace(replace, '') + ' on-scroller';
					} else {
						// mark the object is outside the viewport
						this.foregrounds[a].className = className.replace(replace, '') + ' off-scroller';
					}
				}
			}
		};
		// events
		this.onUpdate = function () {
			var _this = this;
			return function () { _this.update(); };
		};
		// go
		this.start();
	};

}(window.useful = window.useful || {}));
