var sun = new Image();
var moon = new Image();
var earth = new Image();
function init() {
  sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
  moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';
  earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';
  window.requestAnimationFrame(draw);
}

var cam_width = vm.mywidth;
var cam_height = vm.myheight;
// Bigger than screen
var display_distance = Math.sqrt(Math.pow(cam_width, 2) + Math.pow(cam_height, 2));
var cam_center_x = solar_system.user.viewx;
var cam_center_y = solar_system.user.viewy;

function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');

  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, cam_width, cam_height); // clear canvas

  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)';
  ctx.save();

  for(var i = 0; i < solar_system.planet.length; i++) {
	  var distance = Math.sqrt(Math.pow(solar_system.planet[i].x - cam_center_x, 2) + Math.pow(solar_system.planet[i].y - cam_center_y, 2));
	  if(distance <= display_distance * solar_system.user.scale) {
		  var planet_x = cam_width  / 2 + (solar_system.planet[i].x - cam_center_x) / solar_system.user.scale;
		  var planet_y = cam_height / 2 + (solar_system.planet[i].y - cam_center_y) / solar_system.user.scale;
		  var planet_r = solar_system.planet[i].r / solar_system.user.scale;
		  
		  ctx.beginPath();
		  ctx.arc(planet_x, planet_y, planet_r, 0, Math.PI * 2, true); // Planet need to display.
		  ctx.stroke();
		  ctx.fillStyle=solar_system.planet[i].color;
		  ctx.fill();
		  ctx.font = "15px Arial";
		  ctx.fillStyle=solar_system.planet[i].color;
		  ctx.fillText(solar_system.planet[i].name, planet_x + planet_r, planet_y - planet_r);
	  }
  }
  ctx.restore();
 
  window.requestAnimationFrame(draw);
}

init();