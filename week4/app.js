var APP = {
    currentSite: null
};

APP.init = function () {
    'use strict';
    APP.Draw.clearSites();
    APP.Draw.addHeadingData();
    APP.currentSite = window.location.hash || null;
    APP.Draw.showCurrentSite();
};

APP.switchSite = function (id) {
    'use strict';

    APP.currentSite = id;
    APP.Draw.showCurrentSite();
};



APP.Draw = {
    addToTop : function () {
        'use strict';
        $('h3')
            .after($('<a />')
                .text('naar boven')
                .attr('href', '#')
                .addClass('top'));
    },

    addHeadingData : function () {
        'use strict';
        $('.main-nav a').each(function () {
            var site = $(this).attr('href');
            
            $(site + '-site .analytics h3').each(function () {
                $(this).attr('data-heading-name', site.substr(1, site.length) + '-' + $(this).text().toLowerCase().replace(/\s+/g, ''));
            });
        });
    },

    clearSites : function () {
        'use strict';
        $('.site').hide();
        $('.main-nav a').removeClass();
    },

    showCurrentSite : function () {
        'use strict';
        this.clearSites();
        if (APP.currentSite !== null) {
            $('.featured').hide();
            $(APP.currentSite + '-site').show();
            this.addToTop();
            $('a[href=' + APP.currentSite + ']').addClass('active');
        } else {
            $('.featured').show();
        }
    },

    scrollToHeading : function (name) {
        'use strict';
        scrollTo(0, $('[data-heading-name=' + name + ']').offset().top);
    },

    scrollToTop : function (name) {
        'use strict';
        scrollTo(0, 0);
    }
};



$('.main-nav a').on('click', function () {
    'use strict';
    APP.switchSite($(this).attr('href'));
});

$('.sub-nav a').on('click', function (event) {
    'use strict';
    event.preventDefault();
    var site = APP.currentSite.substr(1, APP.currentSite.length);
    var $this = $(this).attr('href');
    var name = site + '-' + $this.substr(1, $this.length).toLowerCase().replace(/\s+/g, '');
    APP.Draw.scrollToHeading(name);
});

$('body').on('click', '.top', function (event) {
    'use strict';
    event.preventDefault();
    APP.Draw.scrollToTop();
});



$(document).ready(function () {
    'use strict';
    APP.init();
});