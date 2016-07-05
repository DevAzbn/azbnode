	
	$('.scrollto').on('click', function(event){
		event.preventDefault();
		$($(this).attr('href').eq(0)).jqfeScrollTo({diff:0,speed:777});
	});
	
	$('.go-to-top').on('click', function(event){
		event.preventDefault();
		$('body').jqfeScrollTo({diff:0,speed:777});
	});
	
	$(window).on('scroll',function(){
		var pos = $(document).scrollTop();
		
		var gototop = $('.go-to-top');
		if(gototop.hasClass('active')) {
			if(pos < 220) {
				gototop.removeClass('active');
			}
		} else {
			if(pos > 220) {
				gototop.addClass('active');
			}
		}
	}).trigger('scroll');
	