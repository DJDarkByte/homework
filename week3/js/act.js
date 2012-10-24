function Act(artist, start, end, imgUrl) {
    'use strict';
    this.artist = artist;
    this.start = start;
    this.end = end;
    this.previous = null;
    this.imgUrl = imgUrl;
};

Act.prototype.img = function () {
    'use strict';
    return (this.imgUrl !== undefined) ? "img/" + this.imgUrl : "http://placehold.it/140x140&text=no_image";
};

Act.prototype.duration = function () {
    'use strict';
    var start = new Date(),
        end = new Date();
    start.setHours(parseInt(this.start.split(":")[0], 10), parseInt(this.start.split(":")[1], 10));
    end.setHours(parseInt(this.end.split(":")[0], 10), parseInt(this.end.split(":")[1], 10));
    return (end.getTime() - start.getTime()) / 1000 / 60;
};

Act.prototype.prePause = function () {
    'use strict';
    var start = new Date(),
        end = new Date();
    if (this.previous !== null) {
        start.setHours(parseInt(this.previous.end.split(":")[0], 10), parseInt(this.previous.end.split(":")[1], 10));
        end.setHours(parseInt(this.start.split(":")[0], 10), parseInt(this.start.split(":")[1], 10));
        return (end.getTime() - start.getTime()) / 1000 / 60;
    } else {
        if (start !== "11:00") {
            start = new Date();
            end = new Date();
            start.setHours(11, 0, 0, 0);
            end.setHours(parseInt(this.start.split(":")[0], 10), parseInt(this.start.split(":")[1], 10));
            return (end.getTime() - start.getTime()) / 1000 / 60;
        }
    }
    return 0;
};