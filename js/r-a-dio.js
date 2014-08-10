function loadAPI() {
    
    var getPHPString = document.getElementById("hidePHP");
    var radioAPIString = getPHPString.textContent;

    // This is gonna go the way of the dodo soon. Leaving it for testing.
    // alert(radioAPIString);

    var nowPlaying = radioAPIString.match("\"np\":\".*\"?,\"listeners\"");
    // alert(nowPlaying);
    var dummy = nowPlaying.replace("\"np\":\"", "");
    nowPlaying = dummy.replace("\",\"listeners\"", "");
    alert("nowPlaying");

    document.getElementById("nowPlaying").innerHTML = "Placeholder";

}
