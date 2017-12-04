;(function ($) {
  var defaults = {
    shift: 5,
    mobile: true
  };

  $.fn.simpleParallax = function (options) {
    var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
    var config = $.extend({}, defaults, options);
    var th = this;

    if(config.mobile && mobile) {
      return this;
    } else {
      $(window).scroll(function () {
        var yPos = -($(window).scrollTop() - th.offset().top) / config.shift;
        var coords = 'center ' + yPos + 'px';
        if($(window).scrollTop() < $(window).height()) th.css('backgroundPosition', coords);
      });
    }

    return this;
  };
})(jQuery);
