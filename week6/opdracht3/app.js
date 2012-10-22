$(document).ready(function (){
    'use strict';
    app.init();
});

var ball, app;

ball = {
    size: 40,
    color: '#0f0',
    isMoving: false
};

app = {
    'ball': ball,
    offset: $(canvas).offset()
};

app.init = function () {
    'use strict';

    app.canvas = $("#canvas");
    app.context = canvas.getContext('2d');

    app.ball.move();
};

ball.move = function () {
    'use strict';
    ball.isMoving = true;

    app.context.beginPath();
    app.context.fillStyle = ball.color;
    app.context.arc(0, 0, ball.size, 2 * Math.PI, false);
    app.context.fill();
    
    
};