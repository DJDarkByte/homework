(function(){
    console.log("App start;");
    context = canvas.getContext("2d");
    
    var drawBar = function (text, color, width, value, verticalOffet) {
        // draw the bar
        context.fillStyle = color;
        context.fillRect(100, 0, 400, 56);
    }
    
    // First bar
    
    
    // First bar text
    context.font = 'normal 400 16px sans-serif';
    context.textBaseline = 'top';
    context.fillStyle = '#000';
    context.fillText("Chrome", 0, 20);
    
    context.fillStyle = '#fff';
    context.fillText("28.8%", 440, 20);
})();