var APP = {
    canvas: $('#canvas'),
    context: canvas.getContext('2d'),
    bunny: null,
    x: 1000,
    y: 600,
    dx: 2,
    dy: 3
};

APP.clear = function () {
    APP.context.clearRect(0, 0, APP.canvas.width, APP.canvas.height);
}

APP.init = function () {
    return setInterval(APP.draw, 500);
}

APP.draw = function () {
    APP.clear();
    
    APP.bunny = new Bunny();
    APP.bunny.draw();
    
    var carrot = new Carrot();
    carrot.draw(APP.x.randomMax(), APP.y.randomMax());
    
    if (APP.x + APP.dx > APP.canvas.width() || APP.x + APP.dx < 0) {
        APP.dx = -APP.dx;
    }
    if (APP.y + APP.dy > APP.canvas.height() || APP.y + APP.dy < 0) {
        APP.dy = -APP.dy;
    }
    
    APP.x += APP.dx;
    APP.y += APP.dy;
}



// Handlers
$(document).keydown(function (event) {
    if(event.keyCode == 32) { // space bar
        event.preventDefault();
        APP.init();
    }
});




// http://www.sitekickr.com/blog/javascript-numbers-prototype/
Number.prototype.randomMax = function () {
    return Math.floor(Math.random() * this.valueOf() + 1);
}