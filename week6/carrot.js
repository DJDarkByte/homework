function Carrot() {
    this.source = 'carrot.png';
}

Carrot.prototype.draw = function (x, y) {
    var img = new Image();
    img.onload = function () {
        APP.context.drawImage(img, x, y, 50, 50);
    }
    img.src = this.source;
}