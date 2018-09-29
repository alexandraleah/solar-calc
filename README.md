# Solar Calculator

A prototype of a web app that calculates nominal power of a user defined hypothetical solar installation. This is a prototype/demo: please don't use it to make decisions about solar installations.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

1. Clone and download the project to your local machine
2. run 'npm install' to download all the necessary dependencies.
3. run 'npm start' to start the development server. The app will launch in your default browser at port 8080

## What I built with and why

- [Mapbox](https://www.mapbox.com/) I chose Mapbox for
  1. It's clear documentation
  2. Clear examples and documentation on how to allow the user to draw a polygon and how to calculate the area
  3. Ability to allow the user to search for an address and clear documentation on how to implement this
- [Turf](http://turfjs.org/) Turf is a javascript library that provides geospatial analysis. I used the area module to calculate the area of the polygon.
- [Bootstrap](http://getbootstrap.com/) Used Bootstrap for grid layout, ease of styling and a few jquery features. If I intended to put this app into production I would consider removing Bootstrap as I use only a few features and it places a fairly large dependency. Otherwise I would bundle only the modules I need.
- [Webpack](https://webpack.js.org/) Webpack bundles modules, allowing for modular code and ease of use of libraries installed via NPM.
- [Babel](https://babeljs.io/) Transpiles next generation javacript for use on browsers that cannot support it.

_Note_: I chose not to use React or Redux because this app is fairly small, does not have much state, has few components and does not make very many changes to the DOM. Therefore I decided I could handle the DOM manipulation with vanilla javascript and some jquery (which is built into some of the features of Bootstrap). If I were to expand the app, I would use a framework, possibly React, to allow me to more efficiently update the DOM and create reusable components. I would also consider using Redux to manage state.

## Sources

1. [Energy Sage](https://news.energysage.com/what-is-the-power-output-of-a-solar-panel/): "What is the Power Output of a Solar Panel"
2. [Wikipedia](https://en.wikipedia.org/wiki/Nominal_power_%28photovoltaic%29): "Nominal Power"
3. [The Grid](https://thegrid.rexel.com/en-us/forums/renewable-and-energy-efficiency/f/forum/350/how-is-the-nominal-power-of-a-solar-pv-module-defined): How is the Nominal Power of a Solar PV Module Defined
4. [Pick my Solar](https://blog.pickmysolar.com/what-is-solar-panel-efficiency): What is Solar Panel Efficiency
