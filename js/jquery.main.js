jQuery(document).ready(function($) {

// fancybox
	$('.fancybox').fancybox();

// nav active
  $('.h_nav-btn').on('click', function(event) {
    event.preventDefault();
    $('.h_menu, .h_nav-btn').toggleClass('active');
  });


// Slider
	$('.c_slider-header').slick({
		slidesToShow: 1, slidesToScroll: 1, arrows: true, autoplay: true, autoplaySpeed: 8000
	});

// Action
	$('.c_slider-bottom').slick({
		slidesToShow: 1, slidesToScroll: 1, arrows: true, autoplay: true, autoplaySpeed: 8000
	});



// scroll to
	$("body").on('click', '.goto', function(e){
		var scrollTo = $(this).data('scroll');
		$('html,body').stop().animate({ scrollTop: $('#'+scrollTo).offset().top }, 1000);
		e.preventDefault();
	});


//  
// Работа с попап
//  
  $('.overlay, .popup-close').on('click', function(){
    $('.popup').fadeOut(); 
    $('.overlay').fadeOut();
  });
  $('.action').on('click', function(){
    var event = $(this).data('event'),
    eventTitle = $(this).data('name');
    $('input[name="input_type"]').val(eventTitle);
    $('.overlay').fadeIn();
    $('.popup-' + event).centered_popup(); 
    $('.popup-' + event).fadeIn(); 
    return false;
  });
  
// Маска для телефона
  $("[type=tel]").mask("+7(999) 999-99-99");
    
// Обработка форм на AJAX
  $.validator.addMethod("minlenghtphone", function (value, element) {
      return value.replace(/\D+/g, '').length > 10;
  },
  "Введите полный номер.");
  
  $(".c_form").each(function(){
      $(this).validate({
          rules: {
              name: {
                required: true
              },
              tel: {
                required: true,
                minlenghtphone: true
              }
          },
          submitHandler: function(form, event){
              event = event || window.event;
              $('.overlay').fadeOut(300);
              $('.popup').fadeOut();

              $(form).ajaxSubmit({
                  error: function(){
                    // После ошибки
                  },
                  success: function(responseText, statusText, xhr){
                            // Цель на отправку формы
                            /****  Поменять номер счетчика ****/
                            //yaCounterxxxxxx.reachGoal('ORDER');
                        
                            // Очистка форм после отправки
                            $('.form-input').val('');
                        
                            // Появление "спасибо"                        
							$('.popup').fadeOut();							
							$('.popup-thy').centered_popup();
							$('.overlay').fadeIn();
							$('.popup-thy').fadeIn();
                        
                            // Через 5 сек скрываем "спасибо" 
							setTimeout(function(){
								$('.popup-thy').fadeOut(500);
								$('.overlay').fadeOut(500);
							}, 5 * 1000)
                  }
              });
              return false;
         }
      });
  });
  //
});

// Центрируем эелемент
$.fn.centered_popup = function(top) {
    this.css('position', 'absolute');
    this.css('left', ($(window).outerWidth() - this.outerWidth()) / 2 + $(window).scrollLeft() + 'px');
    if( top == 1 )
        this.css('top', $(window).scrollTop() + 'px');
    else
        this.css('top', ($(window).outerHeight() - this.outerHeight()) / 2 + $(window).scrollTop() + 'px');
}