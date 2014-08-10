function loadAPI() {

    // Goes to r-a-d.io/api, gets content
    var radioAPIString = "<?php Print($curlResult); ?>";

    // The Div that contains "Now Playing"
    var nowPlayingDiv = document.getElementById("nowPlaying");
    // Regex for catching the "NP" thing, hopefully.
    var nowPlaying = radioAPIString.match("\"np\":\"*\",");

    document.getElementById("nowPlaying").innerHTML = nowPlaying;

}