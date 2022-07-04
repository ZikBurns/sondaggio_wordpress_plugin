var form;
var radioButtons; 
const initForm = () => {
	form = document.querySelector('#sendForm');        
	radioButtons = document.querySelectorAll('input[name="choice"]');
	
	form.addEventListener("submit", doStuff);
	console.log(ajax_obj);  
  }
  
  document.addEventListener('DOMContentLoaded', () => {
	initForm();
  });

function doStuff(event){
	event.preventDefault();
    const radios = document.querySelectorAll('[name="choice"]');
    let selectedRadio;
	var index = 0;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedRadio = index;
            break;
        }
		index++;
    }
	const idson = document.querySelector('#idson').innerHTML;        
	var formData = new FormData();
	formData.append("selected", selectedRadio);
	formData.append("action", "send");
	formData.append("idson", idson);
	fetch(ajax_obj.ajaxurl,{
        method:'POST',
        body: formData
    })
	.then(response => response.json())
	.then(function(data) {
		console.log(data);
		/*
		const resultschart = document.querySelector('#resultChart');        
		resultschart.style.visibility='visible';
		const frontsondaggio = document.querySelector('#frontSondaggio');        
		frontsondaggio.style.visibility = 'hidden';
		*/
		var chosenbar = document.querySelector('#bar'+index).innerHTML;
		var splitbar = chosenbar.split(": ");
		var firstpart = splitbar[splitbar.length-2]
		var secondpart = splitbar[splitbar.length-1]
		secondpart = parseInt(secondpart)+1;
		chosenbar = firstpart+": "+secondpart;
		document.querySelector('#bar'+index).innerHTML = chosenbar;
		document.cookie = "sondaggioSent=true";
	})
    .catch(err => console.error("Error:", err));

/*
	var xhr = new XMLHttpRequest();
	xhr.open('POST','http://localhost/wordpress/wp-admin/admin-ajax.php', true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send(formData);

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			alert("Form submitted successfully");
			console.log(xhr.responseText);

			const resultschart = document.querySelector('#resultChart');        
			resultschart.style.visibility='visible';
			const frontsondaggio = document.querySelector('#frontSondaggio');        
			frontsondaggio.style.visibility = 'invisible';
			
			document.querySelector('#bar'+index).innerHTML = document.querySelector('#bar'+index).innerHTML +1 ;        

		}
		    var parameters_to_send = {selected: selectedRadio, idson: idson, action: "ajax_send" };

	}*/


    

}