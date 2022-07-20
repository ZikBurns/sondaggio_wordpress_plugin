var form;
var radioButtons; 
if(document.cookie.includes("sondaggioSent"))
{
	
	const idson = document.querySelector('#idson').innerHTML; 
	var formData = new FormData();
	var selected;
	formData.append("selected", "");
	formData.append("action", "send");
	formData.append("idson", idson);
	formData.append("nonce", ajax_obj.nonce);
	fetch(ajax_obj.ajaxurl,{
        method:'POST',
        body: formData
    })
	.then(response => response.json())
	.then(function(data) {
		updateChart(data[0]);
	})
    .catch(err => console.error("Error:", err));   
} 
else
{
	const initForm = () => {
		form = document.querySelector('#sendForm');        
		radioButtons = document.querySelectorAll('input[name="choice"]');
		
		form.addEventListener("submit", doStuff);
		console.log(ajax_obj);  
	  }
	  
	  document.addEventListener('DOMContentLoaded', () => {
		initForm();
	  });
}





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
	formData.append("nonce", ajax_obj.nonce);
	fetch(ajax_obj.ajaxurl,{
        method:'POST',
        body: formData
    })
	.then(response => response.json())
	.then(function(data) {
		updateChart(data[0]);
	})
    .catch(err => console.error("Error:", err));   

}

function updateChart(data){
	console.log(data);

	const resultschart = document.querySelector('#resultChart');        
	resultschart.style.display='block';
	const frontsondaggio = document.querySelector('#frontSondaggio');        
	frontsondaggio.style.display = 'none';
	for (i =0;i<data.length;i++){
		var updatedRes = data[i].count;
		var chosenbar = document.querySelector('#bar'+i).innerHTML;
		var splitbar = chosenbar.split(": ");
		var firstpart = splitbar[splitbar.length-2]
		chosenbar = firstpart+": "+updatedRes;
		document.querySelector('#bar'+i).innerHTML = chosenbar;
	}
	document.cookie = "sondaggioSent=true";
}