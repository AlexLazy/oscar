(function(){
  "use strict"

  $('#map-wrapper .overlay,#map-wrapper .close').click(function() {
    $('#map-wrapper').toggleClass('on');
  })

  $('#map-wrapper').on('transitionend webkitTransitionEnd oTransitionEnd', function() {
    google.maps.event.trigger(map, "resize");
  });

  $('#main-slider').fullpage({
    anchors: ['section-1', 'section-2', 'section-3'],
    responsiveWidth: 1470,
    afterResponsive: function(isResponsive) {
      if(isResponsive) {
        $.fn.fullpage.destroy('all');
      } else {
        $.fn.fullpage.reBuild();
      }
    }
  });

  $('#main-slider .owl-carousel').owlCarousel({
    items: 1,
    animateOut: 'fadeOut',
    navText: [],
    autoplay: true,
    loop: true,
    nav: true,
    mouseDrag: false,
    dots: false
  });

  $('section.certificates .owl-carousel').owlCarousel({
    items: 1,
    margin: 20,
    navText: [],
    autoplay: true,
    loop: true,
    nav: false,
    mouseDrag: false,
    responsive: {
      650: {
        items: 2,
        margin: 0
      },
      991: {
        items: 3
      },
      1300: {
        items: 4
      }
    }
  });

  $('section.feedback .owl-carousel').owlCarousel({
    items: 1,
    margin: 20,
    navText: [],
    autoplay: true,
    loop: true,
    nav: false,
    mouseDrag: false,
    responsive: {
      768: {
        items: 2
      },
      991: {
        items: 3
      }
    }
  });

  $('section.experts-slider .owl-carousel').owlCarousel({
    items: 1,
    margin: 20,
    navText: [],
    autoplay: true,
    loop: true,
    nav: false,
    dots: true,
    responsive: {
      768: {
        items: 2,
        nav: true,
        dots: false
      },
      991: {
        items: 3,
        nav: true,
        dots: false
      }
    }
  });

  $('.top-menu_btn svg, .top-menu_btn button, #dropdown_menu .close').click(function() {
    $('body, .top-menu_btn, #dropdown_menu').toggleClass('on');
  });

  $('.main-header #switcher a').click(function() {
    $('.main-header #switcher a').removeClass('active');
    $(this).addClass('active');
  });

  $('.tabs-menu a').click(function(e) {
    e.preventDefault();
    $(this).parents('.tabs-menu').find('a').removeClass('active');
    $(this).addClass('active');
    var tab = $(this).attr("href");
    var container = $(this).data('container');
    $('#' + container + ' .tab-content').not(tab).css('display', 'none');
    $(tab).fadeIn();
  });


  $('.approval input').on('change', function(){
    var btn = $(this).parents('form').find('.btn');
    $(this).prop('checked')?btn.attr('disabled', false):btn.attr('disabled', true);
  })

  $('.certificates .list a').on('click', function(e){
    e.preventDefault()
    var container = $(this).parents('.item');
    container.find('.hover-underline').removeClass('active');
    $(this).addClass('active');
    container.find('.certificat a').attr('href', $(this).attr('href'));
    container.find('.certificat img').hide().attr('src', $(this).attr('href')).fadeIn();
  })

  $('.video-wrap .overlay').click(function() {
    $(this).fadeOut();
  })

  $('.inline-offer__counter-item .counter').counterUp();

  $('[type="tel"]').inputmask("+7(999) 999-99-99");

  $(window).scroll(function () {
    $('#top-menu').hasClass('on') ||
      $(window).scrollTop() > $('.main-header').height() * 3 &&
      $(window).width() < 1200 ?
        $('#top-menu_btn').addClass('visible') : $('#top-menu_btn').removeClass('visible');
  });
})();
