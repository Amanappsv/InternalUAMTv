const URL = "https://api.uam.tv/";


//Initialize function
var init = function () {
       
    
	
    var token = localStorage.getItem("jwt token");
    
    var remembered = localStorage.getItem("remembered");
   
    
    console.log("remembered" , remembered);
    
    //launch next screen after 2 seconds....
//    setInterval(function(){
    	
    	
    
    setTimeout(function(){ 
    	
    	 if(token === null)
		 {
		
		 location.href = "login.html";
		 }
		 
	 else
		 {
		
			 if(remembered === "true")
		 		{
		 		  
		 			 heartbeatPost(token);
		 		  
		 		}
		 	else
		 		location.href = "login.html";
	
		 }
    	
    	
    	
    }, 3000);
    	
    	
//    },2000);
   
    
 
};

window.onload = init;






function heartbeatPost(token)
{
	
	
	console.log("heartbeat");
	let formData = new FormData();
	formData.append('devicehash', webapis.productinfo.getDuid());
	formData.append('devicefriendlyname',  webapis.productinfo.getModel());
	formData.append('platform', "Tizen " + webapis.tvinfo.getVersion());
	formData.append('version', webapis.productinfo.getVersion());
	
	
	fetch(URL + 'v3/users/devices/heartbeat/post.php', {
	   	  method: 'POST',
		  body:formData,
		  headers: {
			  'Authorization' : "Bearer " + token,
		  },
		})
		.then(response => response.json())
		.then(data => {
	
			
			location.href = "home/home.html";
		  
		})
		.catch((error) => {
		  console.log("Err : " , error);
		  location.href = "login.html";
		  
		});
	}




