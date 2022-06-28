(function($){

	$(document).on('click','.more-link',function(e){
	 	e.preventDefault();
        ele = document.querySelector('input[name="answer"]:checked').value;
        
		$.ajax({
            type: 'post',
            url: dcms_vars.ajaxurl,
            data: {
                action: 'dcms_ajax_readmore',
                answer: ele
            },
            success: function(data) {
                alert('AJAX call was successful!');
                alert('Data from the server' + data);
            },
            error: function() {
                alert('There was some error performing the AJAX call!');
            }
	    });
    });
})(jQuery);
