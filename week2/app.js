// Helpers
var $ = {
    get: function (id) {
        'use strict';

        return document.querySelector(id);
    },
    create: function (tagName) {
        'use strict';

        return document.createElement(tagName);
    },
    empty: function (node) {
        'use strict';

        node = this.get(node);
        if (node.hasChildNodes()) {
            while (node.childNodes.length > 0) {
                node.removeChild(node.firstChild);
            }
        }
    }
};

var Workout = function () {
    'use strict';

    this.name = null;
    this.intervals = [];
};
Workout.prototype.hasWarm = function () {
    'use strict';

    var flag = false;

    _.each(this.intervals, function (interval) {
        if (interval.isWarm) {
            flag = true;
            return flag;
        }
    });
    return flag;
};
Workout.prototype.hasCool = function () {
    'use strict';

    var flag = false;

    _.each(this.intervals, function (interval) {
        if (interval.isCool) {
            flag = true;
            return flag;
        }
    });
    return flag;
};
Workout.prototype.removeInterval = function(intervalId) {
    'use strict';
    
    _.reject(this.intervals, function () {
        return interval.id === intervalId;
    });
};

var Interval = function () {
    'use strict';

    this.id = id;
    this.workoutType = null;
    this.size = 0;
    this.isWarm = false;
    this.isCool = false;
    this.speed = null;
};
// End helpers


// The app
var APP = {
    workouts: [],
    currentWorkout: null
};

APP.init = function () {
    'use strict';
    
    APP.workouts = JSON.parse(localStorage.getItem('APP'));
    APP.currentWorkout = APP.workouts[0] || null;
    APP.Draw.workoutsList();
};

APP.save = function () {
    'use strict';

    if (window.localStorage) {
        localStorage.setItem('APP', JSON.stringify(APP.workouts));
    }
};

APP.clear = function () {
    localStorage.setItem('APP', JSON.stringify([]));
    APP.init();
};

APP.addWorkout = function () {
    'use strict';

    var newWorkout = new Workout();
    newWorkout.name = 'Workout' + APP.workouts.length;
    APP.currentWorkout = newWorkout;
    APP.workouts.push(newWorkout);
    APP.Draw.workoutsList();
};

APP.addInterval = function () {
    'use strict';

    var workoutType = ($.get('#time').checked) ? 'time' : 'distance',
        isWarm = ($.get('#warm').checked) ? true : false,
        isCool = ($.get('#cool').checked) ? true : false,
        size = parseInt($.get('#intervalSize').value, 10),
        speed = $.get('#intervalSpeed').value,
        newInterval = null;

    if (isNaN(size)) {
        alert('Error in form!');
        return false;
    } else if (APP.workouts.length < 1) {
        alert('No workouts have been created yet');
        return false;
    } else {
        newInterval = Object.create(Interval);
        newInterval.workoutType = workoutType;
        newInterval.isCool = isCool;
        newInterval.isWarm = isWarm;
        newInterval.size = size;
        newInterval.speed = speed;

        APP.currentWorkout.intervals.push(newInterval);
        APP.Draw.intervalsList();
        APP.Draw.intervalsShortList();
        return true;
    }
};

APP.removeInterval = function (id) {
    APP.currentWorkout.removeInterval(id);
    APP.Draw.intervalsList();
    APP.Draw.intervalsShortList();
};

APP.Draw = {

    workoutsList: function () {
        'use strict';

        $.empty('#workoutsList');

        var li;
        if (APP.currentWorkout !== null) {
            _.each(APP.workouts, function (workout) {
                li = $.create('li');
                li.innerHTML = workout.name;
                if (workout === APP.currentWorkout) {
                    li.setAttribute('class', 'active');
                }
                $.get('#workoutsList').appendChild(li);
            });
            APP.Draw.intervalsList();
            APP.Draw.intervalsShortList();
        }
    },
    
    intervalsList: function () {
        'use strict';
        
        $.empty('#intervalsList');
        var li,
            dist,
            extra;
            
        _.each(APP.currentWorkout.intervals, function (interval) {
            li = $.create('li');
            extra = '';
            dist = (interval.workoutType === 'time') ? 'min.' : 'km';
            if (interval.isWarm) {
                extra = '(Warmup)';
            }
            if (interval.isCool) {
                extra = '(Cooldown)';
            }
            li.innerHTML = interval.size + ' ' + dist + ' ' + interval.speed + ' ' + extra;
            switch (interval.speed) {
                case 'fast':
                    li.setAttribute('class', 'fast');
                    break;
                case 'medium':
                    li.setAttribute('class', 'medium');
                    break;
                case 'slow':
                    li.setAttribute('class', 'slow');
                    break;
            }
            $.get('#intervalsList').appendChild(li);
        });
    },
    
    intervalsShortList: function () {
        'use strict';
        
        $.empty('#intervalsShortList');
        $.get("#numIntervals").innerHTML = APP.currentWorkout.intervals.length;
        var li,
            dist
        _.each(APP.currentWorkout.intervals, function (interval) {
            li = $.create('li');
            dist = (interval.workoutType === 'time') ? 'min.' : 'km';
            li.innerHTML = interval.size + ' ' + dist + ' ' + interval.speed;
            $.get('#intervalsShortList').appendChild(li);
        });
    }
};

// Event handlers and listeners
document.onload = APP.init();
$.get('#newWorkoutBtn').onclick = APP.addWorkout;
$.get('#saveWorkoutBtn').onclick = APP.save;
$.get('#addIntervalBtn').onclick = APP.addInterval;
$.get('#clearStorageBtn').onclick = APP.clear;