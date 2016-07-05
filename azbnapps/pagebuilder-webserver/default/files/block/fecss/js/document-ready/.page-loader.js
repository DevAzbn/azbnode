
	$('.page-loader .close-loader').on('click',function(event){
		event.preventDefault();
		$('.page-loader').removeClass('active');
	});
	$(window).load(function(event){
		$('.page-loader').removeClass('active');
	});
