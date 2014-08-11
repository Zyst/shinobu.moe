function loadAPI() {

    // This gets the PHP Code
    var getPHPString = document.getElementById("hidePHP");
    var radioAPIString = getPHPString.textContent;

    // Updates "Now Playing"
    var nowPlaying = radioAPIString.match("\"np\":\".*\"?,\"listeners\"");

    nowPlaying = String(nowPlaying);
    nowPlaying = nowPlaying.replace("\"np\":\"", "");
    nowPlaying = nowPlaying.replace("\",\"listeners\"", "");

    // Gonna do a function to escape the unicode characters
    var regex = /\\u([\d\w]{4})/gi;
    nowPlaying = nowPlaying.replace(regex, function (match, grp) {
        return String.fromCharCode(parseInt(grp, 16)); 
    });
    nowPlaying = unescape(nowPlaying);
    // Removes unescaped slashes that shouldn't be there
    nowPlaying = nowPlaying.replace(/\\(?=\/)/, "");

    // Updates "DJ"
    var DJ = radioAPIString.match("\"djname\":\".*\"?,\"djtext\"");

    DJ = String(DJ);
    DJ = DJ.replace("\"djname\":\"", "");
    DJ = DJ.replace("\",\"djtext\"", "");
    DJ = DJ.replace(/.*\"/, "");


    // These actually update the divs with the content parsed
    // with the wizardry above.
    document.getElementById("nowPlaying").innerHTML = nowPlaying;
    document.getElementById("DJ").innerHTML = DJ;
}
