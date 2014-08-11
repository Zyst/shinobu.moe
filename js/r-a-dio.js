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
    nowPlaying = String(nowPlaying);


    // Updates "DJ" (WIP)
    // var DJ = radioAPIString.match("\"djname\":\".*\"?,\"djtext\"");

    // DJ = String(DJ);
    // DJ = DJ.replace("\"djname\":\"", "");
    // DJ = DJ.replace("\",\"djtext\"", "");
    // DJ = DJ.replace(/.*\"/, "");
    // DJ = String(DJ);
    // // alert(DJ);
    var DJ = "Neru feat. \u93e1\u97f3\u30ea\u30f3 - \u30a2\u30d6\u30b9\u30c8\u30e9\u30af\u30c8\u30fb\u30ca\u30f3\u30bb\u30f3\u30b9";


    // These actually update the divs with the content
    document.getElementById("nowPlaying").innerHTML = nowPlaying;
    document.getElementById("DJ").innerHTML = "DJ " + DJ;
}
