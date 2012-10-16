$(document).ready(function () {
    'use strict';
    painting.init();
});

var painting = {
    isPainting: false,
    drawMode: 'default',
    lineSize: 1,
    lineColor: '#000'
};

painting.init = function () {
    'use strict';
    painting.canvas = $("#canvas");
    painting.context = canvas.getContext('2d');

    // Set mouse bindings and clear the canvas
    $("[data-drawmode]").on('click', function () {
        painting.setDrawmode($(this).data("drawmode"));
    });
    $("[data-linesize]").on('click', function () {
        painting.setLinesize($(this).data("linesize"));
    });
    $("[data-linecolor]").on('click', function () {
        painting.setLinecolor($(this).data('linecolor'));
    });
    $("#clearcanvas").on('click', function () {
        painting.clearCanvas();
    });
    
    $(painting.canvas).mousedown(painting.startPainting);
    $(painting.canvas).mousemove(painting.paint);
    $(painting.canvas).mouseup(painting.endPainting);
    
    painting.clearCanvas();
};

painting.clearCanvas = function () {
    'use strict';
    console.log('clearing....');
    painting.context.clearRect(0, 0, canvas.width, canvas.height);
};

painting.startPainting = function (event) {
    'use strict';
    event.preventDefault();

    var x, y, offset;
    offset = $(painting.canvas).offset();
    x = event.pageX - offset.left;
    y = event.pageY - offset.top;

    // Set starting values
    painting.prevX = x;
    painting.prevY = y;

    painting.isPainting = true;
};

painting.paint = function (event) {
    'use strict';
    event.preventDefault();

    if (painting.isPainting) {
        var x, y, offset;
        offset = $(painting.canvas).offset();
        x = event.pageX - offset.left;
        y = event.pageY - offset.top;

        painting.context.beginPath();
        painting.context.fillStyle = 'rgba(0,0,0,0)';
        
        if (painting.drawMode == 'default') {
            painting.context.moveTo(painting.prevX, painting.prevY);
            painting.context.lineTo(x, y);
            painting.context.closePath();
        } else if (painting.drawMode == 'squares') {
            painting.context.rect(painting.prevX, painting.prevY, 20, 20);
        } else if (painting.drawMode == 'circles') {
            painting.context.arc(painting.prevX, painting.prevY, 20, 2 * Math.PI, false);
        } else {
            throw new Error("Unrecognized drawmode");
        }
        
        painting.context.fill();
        painting.context.lineWidth = painting.lineSize;
        painting.context.strokeStyle = painting.lineColor;
        painting.context.stroke();
        
        painting.prevX = x;
        painting.prevY = y;
    }
};

painting.endPainting = function () {
    'use strict';
    painting.isPainting = false;
};

painting.setDrawmode = function (newmode) {
    'use strict';
    painting.drawMode = newmode;
};

painting.setLinesize = function (width) {
    'use strict';
    painting.lineSize = parseInt(width);
};

painting.setLinecolor = function (color) {
    'use strict';
    painting.lineColor = color;
}