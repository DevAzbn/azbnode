	
	$(document.body).on('click', '.can-close .close-btn', function(event){
		event.preventDefault();
		$(this).closest('.can-close').removeClass('active');
	});
	