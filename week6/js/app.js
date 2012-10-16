(function(){
    console.log("App start;");
    context = canvas.getContext("2d");
    
    var drawBar = function (text, color, width, value, verticalOffset) {
        // draw the bar
        var horizontalOffset = 100;
        var barHeight = 56;
        
        context.fillStyle = color;
        context.fillRect(horizontalOffset, verticalOffset - (barHeight / 2), width, barHeight);
        // global text settings
        context.font = 'normal 400 16px sans-serif';
        context.textBaseline = 'top';
        context.fillStyle = '#000';
        // draw browsername
        context.fillText(text, 0, verticalOffset);
        // draw value
        context.fillText(value, width + horizontalOffset + 20, verticalOffset);
    }
    
    var drawGraph = function () {
        
    };
    
    
    // First bar
    drawBar("Chrome", "rgba(200, 0, 0, .8)", 300, '28,8%', 20);
    drawBar("Firefox", "rgba(0, 200, 0, .8)", 200, '20%', 56);
    drawBar("IE", 'rgba(0, 0, 200, 0.8)', 125, '12.5%', 92);
})();