/*
Source:
van Creij, Maurice (2018). "positions.js: A library of useful functions to ease working with screen positions.", http://www.woollymittens.nl/.

License:
This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

// establish the class
var positions = {

	// find the dimensions of the window
	window: function (parent) {
		// define a position object
		var dimensions = {x: 0, y: 0};
		// if an alternative was given to use as a window
		if (parent && parent !== window && parent !== document) {
			// find the current dimensions of surrogate window
			dimensions.x = parent.offsetWidth;
			dimensions.y = parent.offsetHeight;
		} else {
			// find the current dimensions of the window
			dimensions.x = window.innerWidth || document.body.clientWidth;
			dimensions.y = window.innerHeight || document.body.clientHeight;
		}
		// return the object
		return dimensions;
	},

	// find the scroll position of an element
	document: function (parent) {
		// define a position object
		var position = {x: 0, y: 0};
		// find the current position in the document
		if (parent && parent !== window && parent !== document) {
			position.x = parent.scrollLeft;
			position.y = parent.scrollTop;
		} else {
			position.x = (window.pageXOffset) ?
			window.pageXOffset :
			(document.documentElement) ?
			document.documentElement.scrollLeft :
			document.body.scrollLeft;
			position.y = (window.pageYOffset) ?
			window.pageYOffset :
			(document.documentElement) ?
			document.documentElement.scrollTop :
			document.body.scrollTop;
		}
		// return the object
		return position;
	},

	// finds the position of the element, relative to the document
	object: function (node) {
		// define a position object
		var position = {x: 0, y: 0};
		// if offsetparent exists
		if (node.offsetParent) {
			// add every parent's offset
			while (node.offsetParent) {
				position.x += node.offsetLeft;
				position.y += node.offsetTop;
				node = node.offsetParent;
			}
		}
		// return the object
		return position;
	},

	// find the position of the mouse cursor relative to an element
	cursor: function (evt, parent) {
		// define a position object
		var position = {x: 0, y: 0};
		// find the current position on the document
		if (evt.touches && evt.touches[0]) {
			position.x = evt.touches[0].pageX;
			position.y = evt.touches[0].pageY;
		} else if (evt.pageX !== undefined) {
			position.x = evt.pageX;
			position.y = evt.pageY;
		} else {
			position.x = evt.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
			position.y = evt.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
		}
		// if a parent was given
		if (parent) {
			// retrieve the position of the parent
			var offsets = this.object(parent);
			// adjust the coordinates to fit the parent
			position.x -= offsets.x;
			position.y -= offsets.y;
		}
		// return the object
		return position;
	}

};

// return as a require.js module
if (typeof module !== 'undefined') {
	exports = module.exports = positions;
}

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
if (typeof module !== 'undefined') {
	exports = module.exports = Parallax;
}
