var APP = {
    festival: null,
    currentDay: null,
    pxPerMin: 0
};

APP.init = function () {
    'use strict';

    APP.festival = new Festival('Bevrijdingsfestival Overijssel 2012');
    APP.seed();
    APP.pxPerMin = $('.time-table').width() / (13 * 60);
    APP.currentDay = APP.festival.days[0] || null;

    APP.Draw.updateHeader();
    APP.Draw.timelist();
    APP.Draw.today();
};

APP.addDay = function (name) {
    'use strict';

    if (name === '') {
        throw {
            name: 'InvalidFormException',
            message: 'Not all form fields are completed'
        };
    }

    var day = new Day('name');
    APP.festival.days.push(day);
    APP.changeCurrentDay(day);

    APP.Draw.today();
};

APP.changeCurrentDay = function (day) {
    'use strict';

    APP.currentDay = day;
    APP.Draw.today();
};

APP.addStage = function (name) {
    'use strict';

    if (APP.currentDay === null) {
        throw {
            name: 'NoDaysFoundException',
            message: 'No days have been created yet to add a stage to'
        };
    } else if (name === '') {
        throw {
            name: 'InvalidFormException',
            message: 'Not all form fields are completed'
        };
    } else {
        var stage = new Stage(name);
        APP.currentDay.stages.push(stage);

        APP.Draw.today();
    }
};

APP.addAct = function (artist, start, end, image, stageName) {
    'use strict';

    if (artist === '' || start === '' || end === '') {
        throw {
            name: 'InvalidFormException',
            message: 'Not all form fields are completed'
        };
    }

    var act, stage;

    if (image === '') {
        image = undefined;
    }

    act = new Act(artist, start, end, image);

    _.each(APP.currentDay.stages, function (stage) {
        if (stage.name === stageName) {
            stage.acts.push(act);
        }
    });

    APP.Draw.today();
};





// Drawing
APP.Draw = {
    timelist: function () {
        'use strict';

        $('.times li').css('width', 60 * APP.pxPerMin + 'px');
    },

    showform: function (obj) {
        'use strict';

        $('.form').hide();
        $('#' + obj.data('reveal-id')).fadeToggle();
    },

    dayButtons: function () {
        'use strict';

        $('#days-list').empty();

        _.each(APP.festival.days, function (day) {
            var button = $('<button data-switch-day="' + day.name + '">' + day.name + '</button>');
            button.on('click', function () {
                APP.changeCurrentDay(day);
            });
            $('#days-list').append(button);
        });
    },

    today: function () {
        'use strict';

        this.dayButtons();
        this.updateHeader();
        this.stages();
        this.acts();
    },

    updateHeader: function () {
        'use strict';
        if (APP.currentDay !== null) {
            $('h1').text('Speelschema ' + APP.currentDay.name);
        }
    },

    stages: function () {
        'use strict';

        $('#stagelists').empty();
        $('.stages ul').empty();
        $('#newActStage').empty();

        if (APP.currentDay !== null) {
            _.each(APP.currentDay.stages, function (stage) {
                $('<ol />').addClass('stagelist').attr('id', stage.name + '-list')
                    .appendTo('#stagelists');

                $('<li />').text(stage.name).attr('id', stage.name + '-stage')
                    .css('height', $('#' + stage.name + '-list').height())
                    .appendTo('.stages ul');

                $('<option />')
                    .text(stage.name)
                    .val(stage.name)
                    .appendTo($('#newActStage'));
            });
        }
    },

    acts: function () {
        'use strict';
        if (APP.currentDay !== null) {
            _.each(APP.currentDay.stages, function (stage) {
                // Empty existing lists
                $('#' + stage.name + '-list').empty();
                var tallest = 0,
                    i,
                    act,
                    li;

                // Fill them again
                for (i = 0; i < stage.acts.length; i += 1) {
                    act = stage.acts[i];

                    if (i !== 0) {
                        act.previous = stage.acts[i - 1];
                    }

                    li = $('<li />')
                        .text(act.artist)
                        .data({
                            "start-time" : act.start,
                            "end-time" : act.end,
                            "imgUrl" : act.img()
                        })
                        .css({
                            'width': act.duration() * APP.pxPerMin + 'px',
                            "margin-left" : act.prePause() * APP.pxPerMin + "px"
                        })
                        .appendTo("#" + stage.name + "-list");

                    if (li.height() > tallest) {
                        tallest = li.height();
                    }
                }

                $("#" + stage.name + "-list li").css({"height" : tallest + "px"});
                $("#" + stage.name + "-stage").css({"height" : tallest + "px"});
                $(".stagelist li").modal();
            });
        }
    }
};





// Event handlers
$('[data-reveal-id]').on('click', function () {
    'use strict';
    APP.Draw.showform($(this));
});

$('#addDayBtn').on('click', function () {
    'use strict';
    try {
        APP.addDay($('#newDay').val());
    } catch (e) {
        alert(e.message);
    } finally {
        $('#newDay').val('');
    }
});

$('#addStageBtn').on('click', function () {
    'use strict';
    try {
        APP.addStage($('#newStageName').val());
    } catch (e) {
        alert(e.message);
    } finally {
        $('#newStageName').val('');
    }
});

$('#addActBtn').on('click', function () {
    'use strict';

    try {
        APP.addAct(
            $('#newAct').val(),
            $('#newActStart').val(),
            $('#newActEnd').val(),
            $('#newActImgUrl').val(),
            $('#newActStage').val()
        );
    } catch (e) {
        alert(e.message);
    }
});






$(document).ready(function () {
    'use strict';
    APP.init();
});

APP.seed = function () {
    'use strict';

    var day1, day2, stage1, stage2, stage3, stage4, act1, act2, act3, act4, act5, act6, act7, act8;

    day1 = new Day('friday');
    day2 = new Day('saturday');

    stage1 = new Stage('podiumFriday1');
    stage2 = new Stage('podiumFriday2');
    stage3 = new Stage('podiumSaturday1');
    stage4 = new Stage('podiumSaturday2');

    stage1.acts = [
        new Act("Das Pri-V", "12:45", "13:30"),
        new Act("Textures", "14:00", "14:50", 'Textures-kl.jpg'),
        new Act("The Asteroids Galaxy Tour", "15:20", "16:10", 'The-Asteroids-Galaxy-Tour-kl.jpg'),
        new Act("Eric Sardinas", "16:40", "17:30", 'Eric-Sardinas-kl.jpg'),
        new Act("Sonic Boom Six", "18:00", "18:50", 'Sonic-Boom-six-kl.jpg')
    ];
    stage2.acts = [
        new Act("Black Rose Rebelz", "19:10", "19:30", 'Kader-klein-Black-Rose.jpg'),
        new Act("Negritos", "20:10", "21:00", 'Negritos-kl.jpg'),
        new Act("Blaudzun", "21:30", "22:30", 'Blaudzun-kl.jpg'),
        new Act("Nobody beats the drum", "23:00;", "23:59", 'Nobody-Beats-The-Drum-kl.jpg')
    ];
    stage3.acts = [
        new Act("Openingsconcert met De Vuurvogel", "11:00", "12:00", "Kader-klein-Vuurvogel.jpg"),
        new Act("Alain Clark", "12:30", "13:00", 'Alain-Clark-kl.jpg'),
        new Act("Heideroosjes", "14:00", "14:45", 'heideroosjes-kl.jpg'),
        new Act("Krystl", "15:20", "16:10", 'Krystl-kl.jpg'),
        new Act("Normaal", "16:40", "17:40", 'kader-klein-Normaal.jpg')
    ];
    stage4.acts = [
        new Act("Rapalje", "18:10", "19:00", 'Rapalje-kl.jpg'),
        new Act("Waylon", "19:30", "20:30", 'Waylon-Kl.jpg'),
        new Act("Chef' Special", "21:00", "21:50", 'Chefspecial-klein.jpg'),
        new Act("VanVelzen", "22:30", "23:30", 'VanVelzen-kl.jpg')
    ];

    day1.stages = [stage1, stage2];
    day2.stages = [stage3, stage4];

    APP.festival.days = [day1, day2];
};