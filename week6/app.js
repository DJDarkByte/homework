// shim layer with setTimeout fallback
// Src: http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();



var APP = {
    HEIGHT: 600,
    WIDTH: 1000,
    canvas: null,
    ctx: null,
    offset: { top: 0, left: 0 },
    entities: [],
    nextCarrot: 100,
    
    init: function () {
        APP.canvas = $("#canvas");
        APP.ctx = canvas.getContext('2d');
        APP.canvas.width = APP.WIDTH;
        APP.canvas.height = APP.HEIGHT;
        APP.offset.top = $('#canvas').offset().top;
        APP.offset.left = $('#canvas').offset().left;

        $(document).on('click', function (e) {
            e.preventDefault();
            APP.Input.set(e);
        });

        APP.loop();
    },
    
    update: function () {
        APP.nextCarrot -= 1;
        var checkCollision = false;

        if (APP.nextCarrot < 0) {
            APP.entities.push(new APP.Carrot());
            APP.nextCarrot = (Math.random() * 100) + 100;
        }

        if (APP.Input.clicked) {
            APP.entities.push(new APP.Click(APP.Input.x, APP.Input.y));
            APP.Input.clicked = false;
            checkCollision = true;
        }

        _.each(APP.entities, function (entity, index) {
            entity.update();

            if (entity.type === 'carrot' && checkCollision) {
                var hit = APP.collides(entity, {x: APP.Input.x, y: APP.Input.y, r: 7});
                APP.entities[index].remove = hit;
            }

            if (entity.remove) {
                APP.entities.splice(index, 1);
            }
        });
    },
    
    render: function () {
        APP.Draw.clear();
        _.each(APP.entities, function (entity) {
            entity.render();
        });
    },
    
    loop: function () {
        requestAnimFrame(APP.loop);
        APP.update();
        APP.render();
    }
};


// Check if entities are touching
APP.collides = function (a, b) {
    var distance_squared = (((a.x - b.x) * (a.x - b.x)) + ((a.y - b.y) * (a.y - b.y)));
    var radii_squared = (a.r + b.r) * (a.r + b.r);
    if (distance_squared < radii_squared) {
        return true;
    } else {
        return false;
    }
};


APP.Draw = {
    clear: function () {
        APP.ctx.clearRect(0, 0, APP.WIDTH, APP.HEIGHT);
    },
    
    image: function (src, x, y) {
        var img = new Image();
        img.onload = function () {
            APP.ctx.drawImage(img, x, y);
        }
        img.src = src;
    },
    
    circle: function (x, y, size, color) {
        APP.ctx.fillStyle = color;
        APP.ctx.beginPath();
        APP.ctx.arc(x + (size / 2), y + (size / 2), size, 0,  Math.PI * 2, false);
        APP.ctx.closePath();
        APP.ctx.fill();
    }
};


APP.Input = {
    x: 0,
    y: 0,
    clicked: false,
    
    set: function (data) {
        this.x = data.pageX - APP.offset.left;
        this.y = data.pageY - APP.offset.top;
    }
};


// Click is an entity
APP.Click = function (x, y) {
    this.type = 'click';
    this.x = x;
    this.y = y;
    this.remove = false;
    this.opacity = 1;
    this.fade = .1;
    
    this.update = function () {
        this.opacity -= this.fade;
        this.remove = (this.opacity < 0) ? true : false;
    };
    
    this.render = function () {
        APP.Draw.circle(this.x, this.y, 5, '#0f0');
    };
};


// Carrot is an entity
APP.Carrot = function () {
    this.type = 'carrot';
    this.x = (Math.random() * APP.WIDTH - 50);
    this.y = APP.HEIGHT + (Math.random() * 100) + 100; // Start off canvas
    this.remove = false;
    this.speed = (Math.random() * 3) + 1;
    
    this.update = function () {
        this.y -= this.speed;
        this.remove = (this.y < -10) ? true : false;
    };
    
    this.render = function () {
        APP.Draw.image('carrot.png', this.x, this.x);
    }
};


$(document).ready(APP.init);