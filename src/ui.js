var setscale = solar_system.user.scale;
var recordMouse = false;
var mouseX;
var mouseY;
var n;
var vm = new Vue({
	el: '#app',
	data: {
		mywidth: document.body.clientWidth -10,
		myheight: document.body.clientHeight - 30,
		scale: solar_system.user.scale * 100
	},
	computed: {  },
	methods: {
        handleScroll: function (event) {
			setscale *= (event.wheelDelta == 180 ? 1 / 1.4 : 1.4);
			vm.scale = Math.round(setscale * 100) ;
			n = 1000;
			scaleSleek();
        },
		handleDown: function (event) {
			if(event.which !== 1) return;
			recordMouse = true;
			mouseX = event.pageX;
			mouseY = event.pageY;
		},
		handleMove: function (event) {
			if(!recordMouse) return;
			solar_system.user.viewx -= (event.pageX - mouseX) * solar_system.user.scale;
			solar_system.user.viewy -= (event.pageY - mouseY) * solar_system.user.scale;
			mouseX = event.pageX;
			mouseY = event.pageY;
		},
		handleUp: function (event) {
			recordMouse = false;
		}
    },
    created: function () {
        window.addEventListener('mousewheel', this.handleScroll);
		window.addEventListener('mousedown', this.handleDown);
		window.addEventListener('mousemove', this.handleMove);
		window.addEventListener('mouseup', this.handleUp);
    },
    destroyed: function () {
        window.removeEventListener('mousewheel', this.handleScroll);
		window.removeEventListener('mousedown', this.handleDown);
		window.removeEventListener('mousemove', this.handleMove);
		window.removeEventListener('mouseup', this.handleUp);
    }
});

function scaleSleek(){
	solar_system.user.scale = solar_system.user.scale + (setscale-solar_system.user.scale) / 200;
	n--;
	if(n > 0){
		setTimeout(function(){scaleSleek(n)},10);
	}
}
	