
(function($){

	$(document).on('click','.more-link',function(e){
	 	e.preventDefault();

	 	//link = $(this);
	 	//id   = link.attr('href').replace(/^.*#more-/,'');

		$.ajax({
			url : ajax_obj.ajaxurl,
			type: 'post',
			data: {
				action : 'wp_ajax_ajax_send',
				//id_post: id
			},
			beforeSend: function(){
				link.html('Cargando ...');
			},
			success: function(resultado){
				 $('#post-'+id).find('.entry-content').html(resultado);		
			}

		});

	});

})(jQuery);


