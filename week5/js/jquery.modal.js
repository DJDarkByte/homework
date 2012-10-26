(function ($) {
    'use strict';
    $.fn.modal = function () {
        return this.each(function () {
            var $this = $(this);
            $this.on("click", function () {
                // Create the modal
                var modalBg = $("<div />", { 'class' : 'modal-bg'}),
                    modal = $("<div />", { "class" : "modal" }),
                    close = $("<a class=close-modal title='Close or press [esc]'>&#215</a>");
                modal.append($("<h3>" + $this.text() + "</3>"));
                modal.append($("<img />", {'src' : $this.data('imgUrl'), 'alt' : 'Afbeelding van ' + $this.text()}));
                modal.append(close);
                modalBg.append(modal);
                modalBg.css('display', 'block').fadeIn(500).appendTo($('body'));
            });
            
            $('body').on('click', '.close-modal', function () {
                $('.modal-bg').remove();
            });
            $(document).on('keypress', function (event) {
                if (event.keyCode === 27) {
                    $('.modal-bg').remove();
                }
            });
        });
    };
})(jQuery);
