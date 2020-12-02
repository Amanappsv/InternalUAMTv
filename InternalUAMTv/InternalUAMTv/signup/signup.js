var init = function () {
       
	
	document.getElementById("email").focus();
    initTizenKeys();
};


window.onload = init;






function initTizenKeys()
{
	 // add eventListener for keydown
    document.addEventListener('keydown', function(e) {
    	switch(e.keyCode){
    	case 37: //LEFT arrow
    		keyLeft();
    		break;
    	case 38: //UP arrow
    		keyUp();
    		break;
    	case 39: //RIGHT arrow
    		keyRight();
    		break;
    	case 40: //DOWN arrow
    		keyDown();
    		break;
    	case 13: //OK button
    		keyOk();
    		
    	//	console.log(document.getElementById("email").value);
    		break;
    	case 10009: //RETURN button
		tizen.application.getCurrentApplication().exit();
    		break;
    	default:
    		console.log('Key code : ' + e.keyCode);
    		break;
    	}
    });
}


function keyOk() {
	
	if(document.activeElement.id === "subscribe")
	{
		location.href = "../login.html";
	}
	else if(document.activeElement.id === "loginBtnID")
	{
		signup();
	}
	
}

function keyLeft() {
	
	if(document.activeElement.id === "loginBtnID")
	{
	
		removeFocus("loginBtn_style");
		document.getElementById("subscribe").classList.add('signupfocus');
		document.getElementById("subscribe").focus();
	}
}


function keyRight() {
	
	if(document.activeElement.id === "subscribe")
	{
		
		removeFocus("signupfocus");
		document.getElementById("loginBtnID").classList.add('loginBtn_style');
		document.getElementById("loginBtnID").focus();
	}
}

function keyDown() {
	
	if(document.activeElement.id === "email")
	{
		document.getElementById("email").blur();
		document.getElementById("fname").focus();
	}
	else if(document.activeElement.id === "fname")
	{
		document.getElementById("fname").blur();
		document.getElementById("lname").focus();
	}
	else if(document.activeElement.id === "lname")
	{
		document.getElementById("lname").blur();
		document.getElementById("pass").focus();
	}
	else if(document.activeElement.id === "pass")
	{
		document.getElementById("pass").blur();
		document.getElementById("loginBtnID").classList.add('loginBtn_style');
	    document.getElementById("loginBtnID").focus();
	}
}


function removeFocus(clas){
	
	var el = document.getElementsByClassName(clas)[0].id;
    document.getElementById(el).classList.remove(clas);
	
}




function signup(){
	
	showLoader();
	
	
	let formData = new FormData();
	formData.append('email', document.getElementById("email").value);
	formData.append('password', document.getElementById("pass").value);
	formData.append('fname', document.getElementById("fname").value);
	formData.append('lname',  document.getElementById("lname").value);
	
	
	
	
	
	

	
	fetch('https://testapi.uam.tv/v3/users/post.php', {
	  method: 'POST', // or 'PUT'
	  body:formData,
	})
	.then(response => response.json())
	.then(data => {
	  
		
		hideLoader();
		
		if(data["meta"]["response"] == true){
			alert("Successfully Registered");
			location.href = "../login.html";
		}
		else{
			alert("Account already exists!");
		}
	  
	  
	  
	})
	.catch((error) => {
		alert("Failed!");
	  hideLoader();
	});
	
	
	
	
	
}



function showLoader()
{
	document.getElementById("spinner_display_id").classList.add('hide_loader');
	document.getElementById("opacity_effect").classList.add('add_opacity');
	
	
}

function hideLoader()
{
	var el = document.getElementsByClassName("add_opacity")[0].id;
    document.getElementById(el).classList.remove("add_opacity");
    
    var el1 = document.getElementsByClassName("hide_loader")[0].id;
    document.getElementById(el1).classList.remove("hide_loader");
}


