function loadAPI() {
    // This gets the PHP Code
    var getPHPString = document.getElementById("hidePHP");
    var radioAPIString = getPHPString.textContent;
    
    // Updates "Now Playing"
    // Regex, like honestly if anyone says they understand Regexes
    // they are filthy lying whores
    var nowPlaying = radioAPIString.match("\"np\":\".*\"?,\"listeners\"");

    nowPlaying = String(nowPlaying);
    nowPlaying = nowPlaying.replace("\"np\":\"", "");
    nowPlaying = nowPlaying.replace("\",\"listeners\"", "");


    // Updates "DJ"
    var DJ = radioAPIString.match("\"djname\":\".*\"?,\"djtext\"");

    DJ = String(DJ);
    DJ = DJ.replace("\"djname\":\"", "");
    DJ = DJ.replace("\",\"djtext\"", "");
    DJ = DJ.replace(".*\",\"dj\":\{\"id\":.*,\"djname\":\"");
    alert(DJ);


    // These actually update the divs with the content
    document.getElementById("nowPlaying").innerHTML = nowPlaying;
    document.getElementById("DJ").innerHTML = DJ;




    var random = "djname":"Hanyuu","dj":{"id":18,"djname":"Hanyuu-sama","djtext";
}
