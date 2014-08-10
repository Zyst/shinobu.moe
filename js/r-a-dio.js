function loadAPI() {
    
    var getPHPString = document.getElementById("hidePHP");
    var radioAPIString = getPHPString.textContent;

    // This is gonna go the way of the dodo soon. Leaving it for testing.
    // alert(radioAPIString);

    var nowPlaying = radioAPIString.match("\"np\":\".*\"?,\"listeners\"");
    // alert(nowPlaying);
    nowPlaying = String(nowPlaying);
    nowPlaying = nowPlaying.replace("\"np\":\"", "");
    nowPlaying = nowPlaying.replace("\",\"listeners\"", "");

    document.getElementById("nowPlaying").innerHTML = nowPlaying;
}
