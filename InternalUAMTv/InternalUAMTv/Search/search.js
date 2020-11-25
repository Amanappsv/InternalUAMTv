const URL = "https://api.uam.tv/";

var categoryList = [];

var init = function () {
       
    initTizenKeys();
    
    
    
   
};


window.onload = init;




function initTizenKeys()
{
	 // add eventListener for keydown
    document.addEventListener('keydown', function(e) {
    	switch(e.keyCode){
    	case 37: //LEFT arrow
    		//moveLeft();
    		break;
    	case 38: //UP arrow
    		
    		break;
    	case 39: //RIGHT arrow
    		//moveRight();
    		break;
    	case 40: //DOWN arrow
    		
    		break;
    	case 13: //OK button
    		//moveOk();
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



function doSearch(text , token){
	
	  let params = {
		        "term": text,
		    };

		    let query = Object.keys(params)
		        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
		        .join('&');

		    fetch(URL + 'v3/movies/onair/search.php?' + query, {
		            headers: {
		                'Authorization': "Bearer " + token
		            },
		        })
		        .then(response => response.json())
		        .then(data => {

		        	
		        	
		        	
		        	
		        	data["data"].forEach((result, idx) => {

		        		  var obj = {
		                          "fullId": result["id_full"],
		                          "image": "https://media.uam.tv/images/media/frames/" + result["id_full"] + ".jpg",
		                          "id_movie": result["id_movie"]
		                     
		                      };

		        		  categoryList.push(obj);
		        		
		        	    })
		        	
		        	    addCategoriesToCategoryScreen();

		        })
		        .catch((error) => {
		            console.error('Err:', error);
		            //hideLoader();
		        });

	
	
}


function addCategoriesToCategoryScreen() {
    document.getElementById("container-fluid_id").innerHTML = ``;


    var rowId = "-1";


    categoryList.forEach((result, idx) => {


        console.log(idx);

        if (idx % 4 == 0) {
          
        	if(idx === 0 ){
        		
        		var showcase = document.getElementById("container-fluid_id");
                rowId = idx;

                showcase.innerHTML += `<div id="row-category ${rowId.toString()}" class="row"></div>`;

        		
        	}
        	else {
        		
        		var showcase = document.getElementById("container-fluid_id");
                rowId = idx;

                showcase.innerHTML += `<div id="row-category ${rowId.toString()}" class="row mt-5"></div>`;

				
			}
                
         

        }


        var row = document.getElementById("row-category " + rowId);
        var temp = `
      
    	<div id="categories ${idx}" class="col-3">
   			<div id="cat-wrap ${idx}" class="card searchCard">
   				<img class="img-fluid" src="${result["image"]}" alt="Card image cap">
   			</div>
   		</div>
        
        `;

        row.innerHTML += temp;

        

    })
   

}



function searchButtonStyle(){
    document.getElementById("serachBtn").classList.add('searchStyleAfterClick');
    document.getElementById("loadingSpinner").classList.add('ldio-eon67kjyqwt');
    
    var token = localStorage.getItem("jwt token");

    
    categoryList.length = 0;
    var text = document.getElementById('search_field_id').value;
    
    if (token !== null) {
    	doSearch(text , token);
    }
    else{
    	  console.log("No token found");
          location.href = "../login.html";
    }
    
    }



