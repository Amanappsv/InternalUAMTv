const URL = "https://api.uam.tv/";
var details;

var init = function () {
       
    initTizenKeys();
   
    details = JSON.parse(localStorage.getItem("detail"));
    
    getDetailScreenData();
    
};


window.onload = init;






function initTizenKeys()
{
	 // add eventListener for keydown
    document.addEventListener('keydown', function(e) {
    	switch(e.keyCode){
    	case 37: //LEFT arrow
    		
    		break;
    	case 38: //UP arrow
    		
    		break;
    	case 39: //RIGHT arrow
    		
    		break;
    	case 40: //DOWN arrow
    		
    		break;
    	case 13: //OK button
    		
    
    		
       		break;
    	case 10009: //RETURN button
		    location.href = "../home/home.html";
    		break;
    	default:
    		console.log('Key code : ' + e.keyCode);
    		break;
    	}
    });
}


function getDetailScreenData() {
	
	
	document.getElementById("detail_video_name").innerHTML = details["title"];
	document.getElementById("detail_video_desc").innerHTML = details["desc"];
	document.getElementById("detail_video_length").innerHTML = formatTime(details["length"]);
	
	var castCase = document.getElementById("cast_case");

	details["cast"].forEach((result, index) => {


		var temp = `<p><i class="fa fa-circle text-white mr-3 mt-4"></i> ${result}</p>`;
		
		
		castCase.innerHTML += temp; 

    })
	
	
	
}


function formatTime(totalMinutes){
	
	var hours = Math.floor(totalMinutes / 60);          
    var minutes = totalMinutes % 60;
    
    
    if(hours == 0)
    	 return " " + minutes + "m"; 
    else if(minutes == 0)
    	 return " " + hours + "h"; 
    else
    	 return " " + hours + "h " + minutes + "m"; 
    
	
}


