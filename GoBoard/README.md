**Project Statement**
I made this project to experiment with three things:
* Pixi.js, a javascript graphics library for front-end applications.
* Typescript, a sophisticated way of writing Javascript.
* ES6 modules, a modern code architecting feature of Javascript.

Somewhat uncharacteristically, this project involves no use of image assets -- all visual elements are drawn from elementary geometries. The grid-drawing code I wrote ensures a perfect grid is drawn, taking total size and line-width into account as arbitrary parameters. (There is currently no user interface to change these parameters.)

I tried two approaches to render the stones on the board:
1. creating a Sprite from a pre-generated image, and placing it at the grid intersection clicked by the user; 
2. representing the stone layout in code, and using elementary drawing functions to re-render the layout each time it changed.

I chose the second approach, since it allowed me to avoid the use of image assets altogether, and because an abstract representation of game state is more amenable to implementing game rules.
