# parallax.js: Position and load backgrounds based on screen position.

Defers the loading of backgrounds until they come into view. This lowers the time it takes for the initial page to load.

## How to include the script

The stylesheet is best included in the header of the document.

```html
<link rel="stylesheet" href="css/parallax.css"/>
```

This include can be added to the header or placed inline before the script is invoked.

```html
<script src="lib/positions.js"></script>
<script src="js/parallax.js"></script>
```

Or use [Require.js](https://requirejs.org/).

```js
requirejs([
	'lib/positions.js',
	'js/parallax.js'
], function(positions, Parallax) {
	...
});
```

Or import into an MVC framework.

```js
var positions = require('lib/positions.js');
var Parallax = require('js/parallax.js');
```

## How to start the script

```javascript
var parallax = new Parallax({
	'scroller' : document.querySelector('.parallax-col'),
	'foregrounds' : document.querySelectorAll('.parallax-col .parallax-row'),
	'backgrounds' : document.querySelectorAll('.parallax-col .parallax-row .parallax-bg'),
	'displacement' : -25,
	'offset' : 0,
	'exponential' : 1,
	'treshold' : 100
});
```

**scroller : {DOM Element}** - This is the page element with the scrollbar. By default this is "window".

**foregrounds : {DOM Elements}** - A collection of elements that are scrolled in

**backgrounds : {DOM Elements}** - Optional list of elements that will be translated in a parallax manner.

**displacement : {float}** - The maximum amount of translation to apply during parallax motions in %.

**offset : {float}** - A small offset to fine-tune the parallax motion in %.

**exponential : {integer}** - Apply an exponential curve to the parallax motion.

**treshold : {integer}** - How far outside the viewport the backgrounds should preload in pixels.

## How to build the script

This project uses node.js from http://nodejs.org/

This project uses gulp.js from http://gulpjs.com/

The following commands are available for development:
+ `npm install` - Installs the prerequisites.
+ `gulp import` - Re-imports libraries from supporting projects to `./src/libs/` if available under the same folder tree.
+ `gulp dev` - Builds the project for development purposes.
+ `gulp dist` - Builds the project for deployment purposes.
+ `gulp watch` - Continuously recompiles updated files during development sessions.
+ `gulp serve` - Serves the project on a temporary web server at http://localhost:8500/.
+ `gulp php` - Serves the project on a temporary php server at http://localhost:8500/.

## License

This work is licensed under a [MIT License](https://opensource.org/licenses/MIT). The latest version of this and other scripts by the same author can be found on [Github](https://github.com/WoollyMittens) and at [WoollyMittens.nl](https://www.woollymittens.nl/).
