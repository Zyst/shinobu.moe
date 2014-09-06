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
    } else if (DJ == "Kethsar") {
        changeImage("../images/DJs/Kethsar.png");
    } else if (DJ == "DigitalHoarder") {
        changeImage("../images/DJs/DigitalHoarder.png")
    } else if (DJ == "ed") {
        changeImage("../images/DJs/ed.png");
    } else if (DJ == "Eggmun") {
        changeImage("../images/DJs/Eggmun.png");
    } else if (DJ == "Claud") {
        changeImage("../images/DJs/Claud.png");
    } else if (DJ == "Ekureiru") {
        changeImage("../images/DJs/Ekureiru.png");
    } else if (DJ == "Kilim") {
        changeImage("../images/DJs/Kilim.png");
    } else if (DJ == "oru") {
        changeImage("../images/DJs/oru.png");
    } else if (DJ == "Wessie") {
        changeImage("../images/DJs/Wessie.png");
    } else if (DJ == "DJ Saotome") {
        changeImage("../images/DJs/Saotome.png");
    } else if (DJ == "Chizu-nee") {
        changeImage("../images/DJs/Chizu-nee.png");
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

    // Added this so it updates on pageload because my OCD was killing me
    var playingPercentage = currentTime * 100 / endTime;
    document.getElementById("playingBar").style.width = playingPercentage + "%";

    // Justifying the ~1 second time delay
    ++currentTime;

    // Starts the Timer
    var countUp = setInterval(increaseTime, 1000);

    /**
     * Increases time in 1 second increments
     * @return {void} Will just keep going until
     *                  it's equal to endtime.
     *
     * This also handles the playing bar now.
     *   It multiplies by laws of threes to get percentages,
     *     so it multiplies Current Time by 100 and divides it by Endtime.
     *
     */
    function increaseTime() {
        currentTimeMinutes = Math.floor(currentTime / 60);
        currentTimeSeconds = currentTime % 60;
        // We'll add a 0 pad
        currentTimeSeconds = zeroPadding(currentTimeSeconds);

        document.getElementById("time").innerHTML = currentTimeMinutes + ":" + currentTimeSeconds +
                                              "/" + endTimeMinutes     + ":" + endTimeSeconds;

        ++currentTime;

        /**
         * We are now going to do the playing bar width adjustments.
         *   Percentage based and laws of threes
         */
        if (endTime > 0) {
            // If the 'endTime' of song is above 0 update as normal
            playingPercentage = currentTime * 100 / endTime;
        } else {
            // If the endTime is 0 which some DJs do pretty often
            //   it'll just show a full bar. This is mostly a stylistic choice.
            playingPercentage = 100;
        }
        document.getElementById("playingBar").style.width = playingPercentage + "%";

        // If time reaches end time this stops.
        //   It also makes sure endtime is not zero so it keeps going even if
        //     DJ didn't pass time metadata or for whatever reason that happens.
        //     otherwise it gets stuck after the first update when time is 0
        if ((currentTime > endTime) && (endTime > 0)) {
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
