
const btn = document.querySelector('#btnSave');        
const radioButtons = document.querySelectorAll('input[name="choice"]');

btn.addEventListener("click", doStuff);

function doStuff(){
    const radios = document.querySelectorAll('[name="choice"]');
    let selectedRadio;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedRadio = radioButton.value;
            break;
        }
    }
    var parameters_to_send = {selected: selectedRadio};

    fetch(`http://localhost/wordpress/wp-admin/admin-ajax.php`,{
        method:'POST',
        body: JSON.stringify(parameters_to_send),
			headers: {
				'Content-Type': 'application/json'
			}
    })
    .then(res => {
        if (res.ok) console.log('SUCCESS')
        else console.log('Not successful')

    })
    .then(data => console.log(data))
    .catch(err => console.error("Error:", err));

}
/*
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
				_ajax_nonce: my_ajax_obj.nonce, 
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

querySelectorAll
addEventListener
*/