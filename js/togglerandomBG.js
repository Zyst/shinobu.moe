function toggleBG(){
	var bg = document.body;
	var randomnumber = Math.floor((Math.random() * (6)) + 1);
    if (bg.style.backgroundImage !== "none") {
        bg.style.backgroundImage = "none";
    }
    else {
        bg.style.backgroundImage = "url('images/"+randomnumber+".png')";
    }
}

function randomBG(){
	var bg = document.body;
	var randomnumber = Math.floor((Math.random() * (6)) + 1);
	bg.style.backgroundImage = "url('images/"+randomnumber+".png')";
}