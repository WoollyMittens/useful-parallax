# useful.parallax.js: Position and load backgrounds based on screen position.

Defers the loading of backgrounds until they come into view. This lowers the time it takes for the initial page to load.

Try the <a href="http://www.woollymittens.nl/useful/default.php?url=useful-parallax">demo</a>.

## How to include the script

The stylesheet is best included in the header of the document.

```html
<link rel="stylesheet" href="./css/useful-parallax.css"/>
```

This include can be added to the header or placed inline before the script is invoked.

```html
<script src="./js/useful-parallax.js"></script>
```

To enable the use of HTML5 tags in Internet Explorer 8 and lower, include *html5.js*.

```html
<!--[if lte IE 9]>
	<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
```

## How to start the script

```javascript
var scroller  = document.querySelector('.parallax-col');
var foregrounds = document.querySelectorAll('.parallax-col .parallax-row');
var backgrounds = document.querySelectorAll('.parallax-col .parallax-row .parallax-bg');
var parallax = new useful.parallax(
	scroller,
	foregrounds,
	backgrounds,
	{
		'displacement' : -0.25,
		'offset' : 0,
		'exponential' : 1,
		'treshold' : 100
	}
);
parallax.start();
```

**scroller : {DOM Element}** - This is the page element with the scrollbar. By default this is "window".

**foregrounds : {DOM Elements}** - A collection of elements that are scrolled in

**backgrounds : {DOM Elements}** - Optional list of elements that will be translated in a parallax manner.

**displacement : {float}** - The maximum amount of translation to apply during parallax motions as a %/100.

**offset : {float}** - A small offset to fine-tune the parallax motion as a %/100.

**exponential : {integer}** - Apply an exponential curve to the parallax motion.

**treshold : {integer}** - How far outside the viewport the backgrounds should preload in pixels.

## How to build the script

This project uses node.js from http://nodejs.org/

This project uses grunt.js from http://gruntjs.com/

The following commands are available for development:
+ `npm install` - Installs the prerequisites.
+ `grunt import` - Re-imports libraries from supporting projects to `./src/libs/` if available under the same folder tree.
+ `grunt dev` - Builds the project for development purposes.
+ `grunt prod` - Builds the project for deployment purposes.
+ `grunt watch` - Continuously recompiles updated files during development sessions.
+ `grunt serve` - Serves the project on a temporary web server at http://localhost:8000/ .

## License

This work is licensed under a Creative Commons Attribution 3.0 Unported License. The latest version of this and other scripts by the same author can be found at http://www.woollymittens.nl/
