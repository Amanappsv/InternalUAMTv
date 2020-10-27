const URL = "https://api.uam.tv/";
var categoryList = [];
var mostRecentsList = [];
var mostViewedList = [];
var randomBannerList = []; 


var selectedListPos ;               //selected element of any of 3 lists...

var init = function () {
       
	
	initText();
	
	
	viewLoader();
	
	//set Focus on details text....
	
	
	setFocus("detail" , "activeDetail");
	
	
	
	
	
	getHomeScreenData();
    initTizenKeys();
};


window.onload = init;


function initText(){
	
	document.getElementById("watch_btn_id").innerHTML = TIZEN_L10N['home_watch_now_text'];
	document.getElementById("category_btn_id").innerHTML = TIZEN_L10N['home_category_text'];
	document.getElementById("fav_btn_id").innerHTML = TIZEN_L10N['home_favorites_text'];
	document.getElementById("setting_btn_id").innerHTML = TIZEN_L10N['home_settings_text'];	
	document.getElementById("category_list_id").innerHTML = TIZEN_L10N['home_category_list'];	
	document.getElementById("see_more_list_id").innerHTML = TIZEN_L10N['home_see_more_list'];	
	document.getElementById("most_viewed_list_id").innerHTML = TIZEN_L10N['home_most_viewed_list'];	
	document.getElementById("most_recent_list_id").innerHTML = TIZEN_L10N['home_most_recent_list'];	
	document.getElementById("detail").innerHTML = TIZEN_L10N['home_detail_text'];	
	document.getElementById("play_btn").innerHTML = TIZEN_L10N['home_play_now_text'];	
	document.getElementById("add_fav_btn").innerHTML = TIZEN_L10N['home_add_to_fav_text'];	

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
    		moveUp();
    		break;
    	case 39: //RIGHT arrow
    		moveRight();
    		break;
    	case 40: //DOWN arrow
    		moveDown();
    		break;
    	case 13: //OK button
    		moveOk();
    
    		
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


function showSection(id){
	
	document.getElementById(id).style.display = "block";
	
}

function hideSection(id){
	
	
	document.getElementById(id).style.display = "none";
	
}

function setFocus(id , clas)
{
	
	document.getElementById(id).classList.add(clas);		
	
}

function removeFocus(clas)
{
	
		var el = document.getElementsByClassName(clas)[0].id;
	    document.getElementById(el.toString()).classList.remove(clas);
		
	
}

function moveOk()
{
	 
	if(document.getElementsByClassName("activeDetail")[0] !== undefined)
		{
		   location.href = "../detail/detail.html";
		}
	else if(document.getElementsByClassName("activeCategory")[0] !== undefined)
		{
			console.log( document.getElementsByClassName("activeCategory")[0].id);
		}
	else if(document.getElementsByClassName("activeViewed")[0] !== undefined)
	{
		console.log( document.getElementsByClassName("activeViewed")[0].id);
	}
	else if(document.getElementsByClassName("activeRecents")[0] !== undefined)
	{
		console.log( document.getElementsByClassName("activeRecents")[0].id);
	}
	
	
	  
}


function moveUp()
{
	if(document.getElementsByClassName("activeCategory")[0] !== undefined)
		{
		   setFocus("play_btn" , "button_play_now");
		   
		   removeFocus("activeCategory");
			
		}
	else if(document.getElementsByClassName("button_play_now")[0] !== undefined)
	{
	  
	   setFocus("detail", "activeDetail");
	   
	   removeFocus("button_play_now");
	}
	else if(document.getElementsByClassName("button_favourite")[0] !== undefined)
	{
	  
	   setFocus("detail", "activeDetail");
	   
	   removeFocus("button_favourite");
	} 
	else if(document.getElementsByClassName("activeViewed")[0] !== undefined)
		{
			scroll('-=500px');
		   selectedListPos = 0 ;
		   setFocus("categories " +  selectedListPos, "activeCategory");
		   
		   removeFocus("activeViewed");
		}
	else if(document.getElementsByClassName("activeRecents")[0] !== undefined)
	{
	
		scroll('-=200px');
		selectedListPos = 0 ;
	   setFocus("viewed " +  selectedListPos, "activeViewed");
	   
	   removeFocus("activeRecents");
	}
	
}


function moveDown()
{
	if(document.getElementsByClassName("activeDetail")[0] !== undefined)
		{
		   setFocus("play_btn", "button_play_now");
		   
		   removeFocus("activeDetail");
			
		}
	else if(document.getElementsByClassName("button_play_now")[0] !== undefined)
		{
		   selectedListPos = 0 ;
		   setFocus("categories " +  selectedListPos, "activeCategory");
		   
		   removeFocus("button_play_now");
		}
	else if(document.getElementsByClassName("button_favourite")[0] !== undefined)
	{
	   selectedListPos = 0 ;
	   setFocus("categories " +  selectedListPos, "activeCategory");
	   
	   removeFocus("button_favourite");
	}
	else if(document.getElementsByClassName("activeCategory")[0] !== undefined)
		{
		 
		 scroll('+=400px');
		 selectedListPos = 0 ;
		   setFocus("viewed " +  selectedListPos, "activeViewed");
		   
		   removeFocus("activeCategory");
		}
	else if(document.getElementsByClassName("activeViewed")[0] !== undefined)
	{
		
		 scroll('+=300px');	
		selectedListPos = 0 ;
	   setFocus("recent " +  selectedListPos, "activeRecents");
	   
	   removeFocus("activeViewed");
	}
	
}




function moveLeft(){
	
	if(document.getElementsByClassName("button_favourite")[0] !== undefined)
	{
		
	   setFocus("play_btn", "button_play_now");
	   
	   removeFocus("button_favourite");
	}
	
}



function scroll(by)
{
    $('html, body').animate({
        scrollTop: by
    }, 300);
}


function moveRight()
{
	if(document.getElementsByClassName("button_play_now")[0] !== undefined)
	{
		
			   removeFocus("button_play_now");
			   setFocus("add_fav_btn", "button_favourite");
		
	  
	}
	else if(document.getElementsByClassName("activeCategory")[0] !== undefined)
	{
		if(selectedListPos !== (categoryList.length-1))
			{
			   selectedListPos++;
			   removeFocus("activeCategory");
			   setFocus("categories " +  selectedListPos, "activeCategory");
			}
	  
	   
	  
	}
	else if(document.getElementsByClassName("activeViewed")[0] !== undefined)
	{
		if(selectedListPos !== (mostViewedList.length-1))
			{
			   selectedListPos++;
			   removeFocus("activeViewed");
			   setFocus("viewed " +  selectedListPos, "activeViewed");
			}	  	
	  
	}
	else if(document.getElementsByClassName("activeRecents")[0] !== undefined)
	{
		if(selectedListPos !== (mostRecentsList.length-1))
			{
			   selectedListPos++;
			   removeFocus("activeRecents");
			   setFocus("recent " +  selectedListPos, "activeRecents");
			}	  	
	  
	}
	
	
}



function getHomeScreenData() {
	
	
	var token = localStorage.getItem("jwt token");
	
	if(token !== null)
		{
		    getRandomMovies(token);
		}
	else
		{
			console.log("No token found");
			location.href = "../login.html";
		}
	
	
		
	
}


function getRandomMovies(token)
{
	fetch(URL + 'v3/movies/onair/getRandomSelection.php', {
		  headers: {
			  'Authorization' : "Bearer " + token
		  },
		})
		.then(response => response.json())
		.then(data => {
	
			data.forEach((result, index) => {
		
 			//add categories to list.....
				var obj = {
						"fullId" : result["src"]["id_full"],
						"title" :  result["langs"]["it"]["title"],
						"image" :  "https://media.uam.tv/images/media/frames/"  + result["src"]["id_full"] + ".jpg",
					   	"desc" :    result["langs"]["it"]["logline"],
				};
			
				randomBannerList.push(obj);
				
						        
			})
			
			
			
			addBackground();
			getCategories(token);

		  
		})
		.catch((error) => {
		  console.error('Err:', error);
//		  hideLoader();
		});
	}





function getCategories(token)
{
	fetch(URL + 'v3/movies/categories/get.php', {
		  headers: {
			  'Authorization' : "Bearer " + token
		  },
		})
		.then(response => response.json())
		.then(data => {
	
			data["data"][0].forEach((result, index) => {
		
 			
				if(result[0] !== -1 && result[0] !== 0)
					{
					//add categories to list.....
					var obj = {
							"fullId" :  result[0],
							"title" :  result[1],
							"image" :  "https://media.uam.tv/images/media/category/" +result[0] + ".jpg"
					};
				
					categoryList.push(obj);
					}
				
			
				
						        
			})
			
			
			
			addCategories();
			getMostRecents(token);
		  
		})
		.catch((error) => {
		  console.error('Err:', error);
//		  hideLoader();
		});
	}


function getMostRecents(token)
{
	fetch(URL + 'v3/movies/onair/getMostRecent.php', {
		  headers: {
			  'Authorization' : "Bearer " + token
		  },
		})
		.then(response => response.json())
		.then(data => {
	
			data.forEach((result, index) => {
		
 			//add most recents to list.....
				var obj = {
						"fullId" :  result["src"]["id_full"],
						"image" :  "https://media.uam.tv/images/media/slider/" + result["src"]["id_full"] + ".jpg"
				};
			
				mostRecentsList.push(obj);
		        
			})
			
			addMostRecents();
			getMostViewed(token);
		  
		})
		.catch((error) => {
		  console.error('Err:', error);
//		  hideLoader();
		});
	}







function getMostViewed(token)
{
	fetch(URL + 'v3/movies/onair/getMostViewed.php', {
		  headers: {
			  'Authorization' : "Bearer " + token
		  },
		})
		.then(response => response.json())
		.then(data => {
	
			data["data"].forEach((result, index) => {
		
 			//add most viewed to list.....
				
				var obj = {
						"fullId" :  result["id_full"],
						"image" :  "https://media.uam.tv/images/media/slider/" + result["id_full"] + ".jpg"
				};
			
				mostViewedList.push(obj);
		        
			})
			
			addMostViewed();
		  
		})
		.catch((error) => {
		  console.error('Err:', error);
//		  hideLoader();
		});
	}



function addBackground()
{
	changeBg(randomBannerList[0]["image"]);
	document.getElementById('random-title').innerHTML = randomBannerList[0]["title"];
	document.getElementById('desc').innerHTML = randomBannerList[0]["desc"];

}



function addCategoriesToCategoryScreen(){
	
	
	
	document.getElementById("container-fluid-category-id").innerHTML = ``;
	
	
var rowId = "-1";
	

	categoryList.forEach((result, idx) => {
		
		
		console.log(idx);
		
		if(idx % 4 == 0)
			{
			if(idx == 0)
				{
			
				var showcase = document.getElementById("container-fluid-category-id");
				rowId = idx;
				
				showcase.innerHTML += `<div id="row-category ${rowId.toString()}" class="row"></div>`;
				
				}
			else
				{
				
				var showcase = document.getElementById("container-fluid-category-id");
				rowId = idx;
				
				showcase.innerHTML += `<div id="row-category ${rowId.toString()}" class="row mt-5"></div>`;
				}
		
			
			}
		
		
		var row = document.getElementById("row-category " + rowId);
        var temp = `
        
        
        
        
        <div class="col-lg-3 mt-4">
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${result["image"]}" alt="Card image cap">
            <p class="category_type">${result["title"]}</p>
        </div>
    </div>
        
        
        
        
        
        
        `;
        
        row.innerHTML += temp;
        
        
	})
	
	
	
	

	  removeFocusHome();
	
	hideSection("watch_section_id");
	hideSection("favourite_setion");
	showSection("category_setion");
	
	
}



function addCategories()
{
	
	var rowId = "-1";
	
	console.log(categoryList.length , categoryList);
	
	categoryList.forEach((result, idx) => {
		
		
		console.log(idx);
		
		if(idx % 4 == 0)
			{
			if(idx == 0)
				{
			
				var showcase = document.getElementById("category-carousel-item activeId");
				rowId = idx;
				
				showcase.innerHTML += `<div id="row ${rowId.toString()}" class="row"></div>`;
				
				}
			else
				{
				
				var mainContainer = document.getElementById("category-carousel-innerId");
				
				mainContainer.innerHTML += `<div id="item ${rowId.toString()}" class="carousel-item"></div>`;
				
				
				
				var showcase = document.getElementById("item " + rowId);
				
				rowId = idx;
				showcase.innerHTML += `<div id="row ${rowId.toString()}" class="row"></div>`;
				}
		
			
			}
		
		
		var row = document.getElementById("row " + rowId);
        var temp = `
        
        
        
        
        <div id="categories ${idx}" class="col-sm-3">
        <div class="thumb-wrapper">
            <div class="img-box">
                <img src= "${result["image"]}" class="img-fluid" alt="">
                <p class="catagory_name_style ml-2">${result["title"]}</p>
            </div>

        </div>
    </div>
        
        
        
        
        
        
        `;
        
        row.innerHTML += temp;
        
        
	})
	
	
	
}


function addMostRecents()
{
	
	var rowId = "-1";
	
	
	mostRecentsList.forEach((result, idx) => {
		
		
		console.log(idx);
		
		if(idx % 4 == 0)
			{
			if(idx == 0)
				{
			
				var showcase = document.getElementById("recent-carousel-item activeId");
				rowId = idx;
				
				showcase.innerHTML += `<div id="recent-row ${rowId.toString()}" class="row"></div>`;
				
				}
			else
				{
				
				var mainContainer = document.getElementById("recent-carousel-innerId");
				
				mainContainer.innerHTML += `<div id="recent-item ${rowId.toString()}" class="carousel-item"></div>`;
				
				
				
				var showcase = document.getElementById("recent-item " + rowId);
				
				rowId = idx;
				showcase.innerHTML += `<div id="recent-row ${rowId.toString()}" class="row"></div>`;
				}
		
			
			}
		
		
		var row = document.getElementById("recent-row " + rowId);
        var temp = `
        
        
        
        
        <div id="recent ${idx}" class="col-sm-3">
        <div class="thumb-wrapper">
            <div class="img-box">
                <img src= "${result["image"]}" class="img-fluid" alt="">
        
            </div>

        </div>
    </div>
        
        
        
        
        
        
        `;
        
        row.innerHTML += temp;
        
        
	})
}


function addMostViewed()
{
	
	var rowId = "-1";
	
	
	mostViewedList.forEach((result, idx) => {
		
		
		console.log(idx);
		
		if(idx % 4 == 0)
			{
			if(idx == 0)
				{
			
				var showcase = document.getElementById("viewed-carousel-item activeId");
				rowId = idx;
				
				showcase.innerHTML += `<div id="viewed-row ${rowId.toString()}" class="row"></div>`;
				
				}
			else
				{
				
				var mainContainer = document.getElementById("viewed-carousel-innerId");
				
				mainContainer.innerHTML += `<div id="viewed-item ${rowId.toString()}" class="carousel-item"></div>`;
				
				
				
				var showcase = document.getElementById("viewed-item " + rowId);
				
				rowId = idx;
				showcase.innerHTML += `<div id="viewed-row ${rowId.toString()}" class="row"></div>`;
				}
		
			
			}
		
		
		var row = document.getElementById("viewed-row " + rowId);
        var temp = `
        
        
        
        
        <div id="viewed ${idx}" class="col-sm-3">
        <div class="thumb-wrapper">
            <div class="img-box">
                <img src= "${result["image"]}" class="img-fluid" alt="">
        
            </div>

        </div>
    </div>
        
        
        
        
        
        
        `;
        
        row.innerHTML += temp;
        
        
        hideLoader();
        
        
	})
	
	
	
}



function addFavouritesToFavouritesScreen(){
	
	
	
	document.getElementById("container-fluid-favourite-id").innerHTML = ``;
	
	
var rowId = "-1";
	

	categoryList.forEach((result, idx) => {
		
		
		console.log(idx);
		
		if(idx % 4 == 0)
			{
			if(idx == 0)
				{
			
				var showcase = document.getElementById("container-fluid-favourite-id");
				rowId = idx;
				
				showcase.innerHTML += `<div id="row-favourite ${rowId.toString()}" class="row"></div>`;
				
				}
			else
				{
				
				var showcase = document.getElementById("container-fluid-favourite-id");
				rowId = idx;
				
				showcase.innerHTML += `<div id="row-favourite ${rowId.toString()}" class="row mt-5"></div>`;
				}
		
			
			}
		
		
		var row = document.getElementById("row-favourite " + rowId);
        var temp = `
        
        
        
        
        <div class="col-lg-3 mt-4">
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${result["image"]}" alt="Card image cap">
            <p class="category_type">${result["title"]}</p>
        </div>
    </div>
        
        
        
        
        
        
        `;
        
        row.innerHTML += temp;
        
        
	})
	
	
	
	
	//scroll to top of home...
	
	  removeFocusHome();
	
	hideSection("watch_section_id");
	showSection("favourite_setion");
	hideSection("category_setion");
	
	
}






function showCategorySection(){
	
	
	addCategoriesToCategoryScreen();
	
	
	
	
	
}


function showWatchSection(){ 
	
	
	  
	showSection("watch_section_id");
	hideSection("favourite_setion");
	hideSection("category_setion");
	
	removeFocusHome();
	
}


function showFavouriteSection(){
	
	addFavouritesToFavouritesScreen();
	
	
	
}


function changeBg(image) {
    var d = {
        img: image,
    }
    var img =  d.img;
    var a = "linear-gradient(rgba(21, 9, 36, 1), rgba(20, 9, 34, .7), rgba(21, 9, 36, .7)),"
    var b = "url(" + img + ")";
    var c = a + b;
    console.log(c);
    document.getElementById('split_right').style.backgroundImage = c;
    
    
}


function viewLoader(){
	document.getElementById("parentRightSection").classList.add('parent_right_section');
	document.getElementById("spinner_display_id").classList.add('loadingio-spinner-spinner-rexyx9adxl');

	}


function hideLoader(){
		document.getElementById("parentRightSection").classList.remove('parent_right_section');
		document.getElementById("spinner_display_id").classList.remove('loadingio-spinner-spinner-rexyx9adxl');
		
	
		}



function removeFocusHome(){

	 document.body.scrollTop = 0;
	  document.documentElement.scrollTop = 0;
	  
	
	
	
	//Assign focus to detail button....
	if(document.getElementsByClassName("activeDetail")[0] === undefined)
	{
	   setFocus("detail" , "activeDetail");	
	}

	
	if(document.getElementsByClassName("activeCategory")[0] !== undefined)
	{
	   removeFocus("activeCategory");	
	}
else if(document.getElementsByClassName("button_play_now")[0] !== undefined)
	{
		removeFocus("button_play_now");
	}
else if(document.getElementsByClassName("button_favourite")[0] !== undefined)
	{
		removeFocus("button_favourite");
	} 
else if(document.getElementsByClassName("activeViewed")[0] !== undefined)
	{
		removeFocus("activeViewed");
	}
else if(document.getElementsByClassName("activeRecents")[0] !== undefined)
	{
		removeFocus("activeRecents");
	}

	
}










