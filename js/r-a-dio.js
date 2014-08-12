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
    nowPlaying = nowPlaying.replace(regex, function(match, grp) {
        return String.fromCharCode(parseInt(grp, 16));
    });
    nowPlaying = unescape(nowPlaying);
    // Removes unescaped slashes that shouldn't be there
    nowPlaying = nowPlaying.replace(/\\(?=\/)/g, "");

    // Updates "DJ"
    var DJ = radioAPIString.match("\"djname\":\".*\"?,\"djtext\"");

    DJ = String(DJ);
    DJ = DJ.replace("\"djname\":\"", "");
    DJ = DJ.replace("\",\"djtext\"", "");
    DJ = DJ.replace(/.*\"/, "");

    // Finds DJ and changes to appropriate portrait
    if (DJ == "Hanyuu-sama") {
        changeImage("../images/DJs/shinobu.png");
    } else if (DJ == "Shotacon") {
        changeImage("../images/DJs/Shotacon.png");
    } else if (DJ == "Kilim") {
        changeImage("../images/DJs/Kilim.png");
    } else if (DJ == "ed") {
        changeImage("../images/DJs/ed.png");
    } else if (DJ == "Eggmun") {
        changeImage("../images/DJs/Eggmun.png");
    } else if (DJ == "Ekureiru") {
        changeImage("../images/DJs/Ekureiru.png");
    } else if (DJ == "Kilim") {
        changeImage("../images/DJs/Kilim.png");
    } else if (DJ == "oru") {
        changeImage("../images/DJs/oru.png");
    } else if (DJ == "Wessie") {
        changeImage("../images/DJs/Wessie.png");
    } else {
        changeImage("../images/DJs/shinobu.png");
    }

    // Get the listener count
    var listeners = radioAPIString.match("\"listeners\":.*,\"bitrate\"");
    listeners = String(listeners);
    listeners = listeners.replace(/.*\":/, "");
    listeners = listeners.replace(/,.*/, "");
    
    // Time Area
    var startTime = radioAPIString.match("\"isstreamdesk\":.*,\"end_time\"");
    var currentTime = radioAPIString.match("\"current\":.*,\"queue\"");
    var endTime = radioAPIString.match("\"start_time\":.*,\"lastset\"");

    // Start Time area
    startTime = String(startTime);
    startTime = startTime.replace(/.*\":/, "");
    startTime = startTime.replace(/,.*/, "");
    startTime = parseInt(startTime);
    // We get startTime, we will use this as a base to calculate
    //   time in actual minutes and seconds.
  
    // Current Time Area
    currentTime = String(currentTime);
    currentTime = currentTime.replace(/.*\":/, "");
    currentTime = currentTime.replace(/,.*/, "");
    currentTime = parseInt(currentTime);
    // We turn this from a long ass number to
    //  a smaller one
    currentTime = currentTime - startTime;

    // End Time
    endTime = String(endTime);
    endTime = endTime.replace(/.*\":/, "");
    endTime = endTime.replace(/,.*/, "");
    endTime = parseInt(endTime);
    // We turn this from a long ass number to
    //  a smaller one
    endTime = endTime - startTime;

    /**
     * Song Current Time
     *  we turn seconds to minutes and seconds
     */
    var currentTimeMinutes = Math.floor(currentTime / 60);
    var currentTimeSeconds = currentTime % 60;
    // We'll add a 0 pad
    currentTimeSeconds = zeroPadding(currentTimeSeconds);

    /**
     * Song End Time
     *  we turn seconds to minutes and seconds
     */
    var endTimeMinutes = Math.floor(endTime / 60);
    var endTimeSeconds = endTime % 60;
    // We'll add a 0 pad
    // endTimeSeconds = String(endTimeSeconds);
    endTimeSeconds = zeroPadding(endTimeSeconds);   

    /**
     * Updates the inner html using the black
     *   magic regexes above.
     */
    document.getElementById("nowPlaying").innerHTML = nowPlaying;
    document.getElementById("DJ").innerHTML = DJ;
    document.getElementById("listeners").innerHTML = "Listeners: " + listeners; 
    document.getElementById("time").innerHTML = currentTimeMinutes + ":" + currentTimeSeconds +
                                          "/" + endTimeMinutes     + ":" + endTimeSeconds;

    // Starts the Timer
    var countUp = setInterval(increaseTime, 1000);

    /**
     * Increases time in 1 second increments
     * @return {void} Will just keep going until
     *                  it's equal to endtime.
     */
    function increaseTime() {
        /**
         * Song Current Time
         *  we turn seconds to minutes and seconds
         */
        currentTimeMinutes = Math.floor(currentTime / 60);
        currentTimeSeconds = currentTime % 60;
        // We'll add a 0 pad
        currentTimeSeconds = zeroPadding(currentTimeSeconds);

        document.getElementById("time").innerHTML = currentTimeMinutes + ":" + currentTimeSeconds +
                                              "/" + endTimeMinutes     + ":" + endTimeSeconds;


        ++currentTime;

        if (currentTime > endTime) {
            clearInterval(countUp);
        }
    }

}


// Changes DJ Images
function changeImage(picture) {
    document.getElementById("IMG_3").src = picture;
}

/**
 * Adds a 0 if the seconds are in the 0X range
 * @param  {int} seconds    Initial Seconds input
 * @return {String}         First case: Same as input
 *                          Second case: 0+X with X = input
 */
function zeroPadding(seconds) {

    seconds = String(seconds);

    if (seconds.length > 1) {
        // Basically do nothing
        return seconds;
    } else {
        var padded = "0" + seconds;
        return padded;
    }
}


