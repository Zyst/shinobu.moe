function loadAPI() {
    // This gets the PHP Code
    var getPHPString = document.getElementById("hidePHP");
    var radioAPIString = getPHPString.textContent;

    // Regex, like honestly if anyone says they understand Regexes
    // they are filthy lying whores
    var nowPlaying = radioAPIString.match("\"np\":\".*\"?,\"listeners\"");
    
    // Updates "Now Playing"
    nowPlaying = String(nowPlaying);
    nowPlaying = nowPlaying.replace("\"np\":\"", "");
    nowPlaying = nowPlaying.replace("\",\"listeners\"", "");

    // Updates "DJ"
    var DJ = radioAPIString.match("\"djname\":\".*\"?,\"djtext\"");
    DJ = String(DJ);
    DJ = DJ.replace("\"djname\":\"", "");
    DJ = DJ.replace("\",\"djtext\"", "");

    document.getElementById("nowPlaying").innerHTML = nowPlaying;
}
