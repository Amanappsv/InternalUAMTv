const URL = "https://api.uam.tv/";
var player;

var init = function () {
       
    initTizenKeys();
    
    setPlayer();
   
};


window.onload = init;


function setPlayer() {

	 player = videojs('player_one');
	    var url = localStorage.getItem("video");
	    
	    player.src({
	     type: 'application/x-mpegURL',
	     src: url
	    });
	   
	    player.nuevo({
	    	title: "Nuevo plugin for VideoJs Player"
	    });
	   
	    player.hotkeys({
	    	volumeStep: 0.1,
	    	seekStep: 5
	    	});
}



function initTizenKeys()
{
	 // add eventListener for keydown
    document.addEventListener('keydown', function(e) {
    	switch(e.keyCode){
    	case 37: //LEFT arrow
    		moveLeft();
    		break;
    	case 38: //UP arrow
    		
    		break;
    	case 39: //RIGHT arrow
    		moveRight();
    		break;
    	case 40: //DOWN arrow
    		
    		break;
    	case 13: //OK button
    		moveOk();
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


function moveRight(){
	
	player.currentTime(player.currentTime() + 10);
}

function moveLeft(){
	
	player.currentTime(player.currentTime() - 10);
}


function moveOk() {
	
	
		  if (player.paused()) {
			  player.play();
		  }
		  else {
			  player.pause();
		  }
		
	
}

