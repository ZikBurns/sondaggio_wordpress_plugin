
(function($){
	$(document).on('click','.more-link',function(e){
	 	e.preventDefault();
	 	//link = $(this);
	 	//id   = link.attr('href').replace(/^.*#more-/,'');
		$.ajax({
			url : ajax_obj.ajaxurl,
			type: 'post',
			data: {
				action : 'ajax_send',
				//id_post: id
				_ajax_nonce: my_ajax_obj.nonce, // nonce
				parameters_to_send: this.parameters_to_send // data

			},
			beforeSend: function(){
				link.html('Cargando ...');
			},
			success: function(resultado){
				// $('#post-'+id).find('.entry-content').html(resultado);		
			}
		});
	});
})(jQuery);
