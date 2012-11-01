var APP = {
    festival: null,
    currentDay: null,
    PX_PER_MIN: 0
};

APP.init = function () {
    'use strict';

    APP.festival = new Festival('Bevrijdingsfestival Overijssel 2012');
    APP.PX_PER_MIN = $('.time-table').width() / (13 * 60);
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
    day.persist();
    if (day.dayID === null) {
        throw {
            name: 'HellBrokeLooseException',
            message: 'You bought it'
        };
    }
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

        $('.times li').css('width', 60 * APP.PX_PER_MIN + 'px');
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
                            'width': act.duration() * APP.PX_PER_MIN + 'px',
                            "margin-left" : act.prePause() * APP.PX_PER_MIN + "px"
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