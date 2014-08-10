function loadAPI() {
    
    var getPHPString = document.getElementById("hidePHP");
    var radioAPIString = getPHPString.textContent;

    alert(radioAPIString);
    var nowPlaying = radioAPIString.match("\"np\":\".*\"?,\"listeners\"");
    alert(nowPlaying);

    var placeholder = "Temporary Listening Placeholder";

    document.getElementById("nowPlaying").innerHTML = placeholder;

}