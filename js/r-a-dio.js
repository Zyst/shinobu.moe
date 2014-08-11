function encode_utf8( s ){
    return unescape( encodeURIComponent( s ) );
}

function loadAPI() {
    // This gets the PHP Code
    var getPHPString = document.getElementById("hidePHP");
    var radioAPIString = getPHPString.textContent;
    
    radioAPIString = encode_utf8( radioAPIString );
    // Updates "Now Playing"
    // Regex, like honestly if anyone says they understand Regexes
    // they are filthy lying whores
    var nowPlaying = radioAPIString.match("\"np\":\".*\"?,\"listeners\"");

    nowPlaying = String(nowPlaying);
    nowPlaying = nowPlaying.replace("\"np\":\"", "");
    nowPlaying = nowPlaying.replace("\",\"listeners\"", "");
    // nowPlaying = String(nowPlaying);
    nowPlaying = unescape(nowPlaying);


    // Updates "DJ" (WIP)
    var DJ = radioAPIString.match("\"djname\":\".*\"?,\"djtext\"");

    DJ = String(DJ);
    DJ = DJ.replace("\"djname\":\"", "");
    DJ = DJ.replace("\",\"djtext\"", "");
    DJ = DJ.replace(/.*\"/, "");
    DJ = String(DJ);
    // DJ = unescape(DJ);


    // These actually update the divs with the content
    document.getElementById("nowPlaying").innerHTML = nowPlaying;
    document.getElementById("DJ").innerHTML = "DJ " + DJ;
}
