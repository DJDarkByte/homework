function Bunny() {
    this.source = 'bunny.jpg';
    this.size = 150;
}

Bunny.prototype.draw = function () {
    var img = new Image();
    img.onload = function () {
        APP.context.drawImage(img, 0, APP.canvas.height() - 150, 150, 150);
    }
    img.src = this.source;
}