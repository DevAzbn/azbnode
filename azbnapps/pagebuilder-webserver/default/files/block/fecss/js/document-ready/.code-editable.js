	
	//console.log(hljs.listLanguages());
	
	/*
	hljs.configure({
		//useBR: true,
		//languages : ['apache', 'bash', 'coffeescript', 'cpp', 'cs', 'css', 'diff', 'http', 'ini', 'java', 'javascript', 'json', 'makefile', 'xml', 'markdown', 'nginx', 'objectivec', 'perl', 'php', 'python', 'ruby', 'sql'],
		languages : ['bash', 'css', 'http', 'javascript', 'json', 'php', 'sql'],
	});

	$('.code-editable').each(function(index, block) {
		hljs.highlightBlock(block);
	});
	*/
	
	$('.code-editable-block').each(function(index){
		var block = $(this);
		var name = block.find('.code-name').eq(0);
		var value = block.find('.code-value').eq(0);
		var status = block.find('.code-status').eq(0);
		
		$(document.body).on('click.code-editable', '.code-editable-block .code-btn.open', function(event){
			$.get(
				'/pagebuilder/code-editable/open',
				{
					name : name.val(),
				},
				function(data){
					value.text(data);
					status.text('opened');
					
					/*
					$('.code-editable').each(function(index, block) {
						hljs.highlightBlock(block);
					});
					*/
				}
			);
		});
		
		$(document.body).on('click.code-editable', '.code-editable-block .code-btn.save', function(event){
			$.post(
				'/pagebuilder/code-editable/save',
				{
					name : name.val(),
					value : value.text(),
				},
				function(data){
					status.text(data);
				}
			)
		});
		
		var hash = window.location.hash.substr(1);
		if(hash != '') {
			name.val(hash);
			block.find('.code-btn.open').trigger('click');
		}
		
	})