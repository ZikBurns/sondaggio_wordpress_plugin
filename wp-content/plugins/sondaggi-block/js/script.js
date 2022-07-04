var form;
var radioButtons; 
debugger;
if(document.cookie.includes("sondaggioSent")){
	/*const resultschart = document.querySelector('#resultChart');        
	resultschart.style.display='block';
	const frontsondaggio = document.querySelector('#frontSondaggio');        
	frontsondaggio.style.display = 'none';
*/
	const idson = document.querySelector('#idson').innerHTML; 
	var formData = new FormData();
	formData.append("selected", null);
	formData.append("action", "send");
	formData.append("idson", idson);
	fetch(ajax_obj.ajaxurl,{
        method:'POST',
        body: formData
    })
	.then(response => response.json())
	.then(function(data) {
		updateChart(data);
	})
    .catch(err => console.error("Error:", err));   
} 
else{
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
	fetch(ajax_obj.ajaxurl,{
        method:'POST',
        body: formData
    })
	.then(response => response.json())
	.then(function(data) {
		updateChart(data);
	})
    .catch(err => console.error("Error:", err));   

}

function updateChart(data){
	console.log(data);

	const resultschart = document.querySelector('#resultChart');        
	resultschart.style.display='block';
	const frontsondaggio = document.querySelector('#frontSondaggio');        
	frontsondaggio.style.display = 'none';

	var updatedRes = data[3][0].count;
	var chosenbar = document.querySelector('#bar'+0).innerHTML;
	var splitbar = chosenbar.split(": ");
	var firstpart = splitbar[splitbar.length-2]
	chosenbar = firstpart+": "+updatedRes;
	document.querySelector('#bar'+0).innerHTML = chosenbar;
	
	var updatedRes = data[3][1].count;
	var chosenbar = document.querySelector('#bar'+1).innerHTML;
	var splitbar = chosenbar.split(": ");
	var firstpart = splitbar[splitbar.length-2]
	chosenbar = firstpart+": "+updatedRes;
	document.querySelector('#bar'+1).innerHTML = chosenbar;

	document.cookie = "sondaggioSent=true";
}