/**
 * Example of usage with some extra stuff to test the config on the fly
 */

 // Canvas element to use - style/position this with CSS
var canvasId = 'space'; // required

// If you enable 'followMouse' and need mousemove on different element to canvas
// var followContext = window; // optional, default 'this.canvas' in class

// Illusion of changing view direction due to mouse pos
var followMouse = true; // optional, default false

// Star color
var color = { r: 255, g: 255, b: 255 }; // optional, default 255, 255, 255

// Subtle glow with canvas shadow - performance drain
var glow = true; // optional, default false

// Min velocity range
var minV = 2; // optional, default 2

// Max velocity range
var maxV = 7; // optional, default 5

// Perforance starts to degrade beyond around 1500 stars, system-dependent
var numStars = 500; // optional, default 400

// Subtle trail lines which help the illusion of speed
var trails = true; // optional, default false

// Setup the Starfield
// var starfield = new Starfield.Starfield(canvasId); // Run with defaults
var starfield = new StarFieldCanvas.StarField(canvasId, {
  // followContext: followContext
  followMouse: followMouse,
  color: color,
  glow: glow,
  minV: minV,
  maxV: maxV,
  numStars: numStars,
  trails: trails
});

// Make stars happen
starfield.start();

$(window).resize(function(){     
  if ($('header').width() < 768 ){
    starfield.setNumStars(100);
  }
});