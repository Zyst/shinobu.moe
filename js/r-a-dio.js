// Changes DJ Images
function changeImage(a) {
    document.getElementById("IMG_3").src = a;
}

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


    // if (DJ == "Hanyuu-sama") {
    //     changeImage("../images/DJs/Hanyuu.png");
    // } else if (DJ == "Shotacon") {
    //     changeImage("../images/DJs/Kilim.png");
    // } else if (DJ) == "ed") {
    //     changeImage("../images/DJs/ed.png");
    // } else if (DJ) == "Eggmun") {
    //     changeImage("../images/DJs/Eggmun.png");
    // } else if (DJ) == "Ekureiru") {
    //     changeImage("../images/DJs/Ekureiru.png");
    // } else if (DJ) == "Kilim") {
    //     changeImage("../images/DJs/Kilim.png");
    // } else if (DJ) == "oru") {
    //     changeImage("../images/DJs/oru.png");
    // } else if (DJ) == "Wessie") {
    //     changeImage("../images/DJs/Wessie.png");
    // } else {
    //     changeImage("../images/DJs/shinobu.png");
    // }

    // These actually update the divs with the content parsed
    // with the wizardry above.
    document.getElementById("nowPlaying").innerHTML = nowPlaying;
    document.getElementById("DJ").innerHTML = DJ;
}
