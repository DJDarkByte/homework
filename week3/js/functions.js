function Act(artist, start, end, imgUrl, text) {
    "use strict";
    this.artist = artist;
    this.start = start;
    this.end = end;
    this.previous = null;
    this.prepause = 0;
    this.imgUrl = (imgUrl !== undefined) ? "img/" + imgUrl : "http://placehold.it/140x140&text=no_image";

    this.getDuration = function () {
        var start = new Date();
        var end = new Date();
        start.setHours(parseInt(this.start.split(":")[0]), parseInt(this.start.split(":")[1]));
        end.setHours(parseInt(this.end.split(":")[0]), parseInt(this.end.split(":")[1]));
        return (end.getTime() - start.getTime()) / 1000 / 60;
    };

    this.getPrePause = function () {
        if (this.hasPrevious()) {
            var start = new Date();
            var end = new Date();
            start.setHours(parseInt(this.previous.end.split(":")[0]), parseInt(this.previous.end.split(":")[1]));
            end.setHours(parseInt(this.start.split(":")[0]), parseInt(this.start.split(":")[1]));
            return (end.getTime() - start.getTime()) / 1000 / 60;
        } else {
            if (start !== "11:00") {
                start = new Date();
                end = new Date();
                start.setHours(11, 0, 0, 0);
                end.setHours(parseInt(this.start.split(":")[0]), parseInt(this.start.split(":")[1]));
                return (end.getTime() - start.getTime()) / 1000 / 60;
            }
        }
        return 0;
    };

    this.hasPrevious = function () {
        return this.previous !== null;
    };
}

function Stage(name) {
    "use strict";
    this.name = name;
    this.acts = [];
}

function Festival(name) {
    "use strict";
    this.name = name;
    this.stages = [];
}