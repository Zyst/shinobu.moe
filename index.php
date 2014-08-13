<!DOCTYPE HTML>
<!DOCTYPE HTML>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">

        <link rel="icon" href="images/4chon.ico">
        <link rel='stylesheet' href='css/style.css' type='text/css'>
        <script src="js/togglerandomBG.js"></script>
        <script src="js/r-a-dio.js"></script>
        <title>Love</title>
    </head>
    <body onload="randomBG();">
        <div id="leftbg">
            <div id="lefturls">
                <genericpad><strong>4chan</strong><genericpad><br>
                <a class="topcolor" href="https://boards.4chan.org/a/">/a/</a>
                <a class="topcolor" href="https://boards.4chan.org/g/">/g/</a>
                <a class="topcolor" href="https://boards.4chan.org/tg/">/tg/</a><br>
                <a class="topcolor" href="https://app.roll20.net/home">Roll20</a><br>
                <a class="topcolor" href="https://www.youtube.com/">Youtube</a><br>
                <a class="topcolor" href="https://mail.google.com/">Gmail</a><br>
                <a class="topcolor" href="http://bbsistema.tecmilenio.edu.mx/">School</a>
            </div>
        </div>

        <div id="leftbottom">
            <div id="lefturls">
                <div id="hidePHP" style="display: none;">
                    <?php
                        // while(true) {
                            $chandle = curl_init();
                            $url = "http://r-a-d.io/api";
                            curl_setopt($chandle, CURLOPT_URL, $url);
                            curl_setopt($chandle, CURLOPT_RETURNTRANSFER, 1);
                            curl_setopt($chandle, CURLOPT_CONNECTTIMEOUT, 5);

                            $curlResult = curl_exec($chandle);
                            $decodedString = html_entity_decode($curlResult, ENT_COMPAT, 'UTF-8');

                            echo $decodedString;

                            curl_close($chandle);
                            // sleep(10);


                        // }
                    ?>
                </div>
                
                <!-- Play button block start -->
                <button id = "playButton" style="display:block">
                    Play Stream
                </button>

                <button id = "playButton" style="display:none">
                    Stop Stream
                </button>
                <!-- Play button block end   -->
                
                <!-- Now playing block start -->
                <br>
                <div id = "nowPlaying" class="playing"></div>
                <!-- Now playing block end   -->

                <!-- DJ block start -->
                <div id="DIV_1">
                    <div id="DIV_2">
                        <!-- Image goes here -->
                        <img id="IMG_3" src="/images/DJs/shinobu.png" alt='' />
                        <h4 id="DJ">
                        </h4>
                    </div>
                </div>
                <!-- DJ block end   -->

                <!-- Playing bar start -->
                <div id="outsideBar">
                    <div id="playingBar">
                    </div>
                </div>
                <!-- Playing bar end   -->

                <!-- Listeners and time block start -->
                <div id = "listenersAndTime">
                    <!-- Listening count start -->
                    <span id="listeners"></span>
                    <span id="time"></span>
                    <!-- Listening count end   -->
                </div>
                <!-- Listeners and time block end   -->
            </div>

        <div id="alldivs">
            <div id="anotherdiv">
                <div class="divurls">
                    <strong>Technology:</strong><br>
                    <a class="urlcolor" href="http://arstechnica.com/">Ars Technica</a><br>
                    <a class="urlcolor" href="https://stackoverflow.com/">Stack Overflow</a><br>
                    <a class="urlcolor" href="https://github.com/">Github</a><br>
                    <a class="urlcolor" href="https://github.com/vhf/free-programming-books/blob/master/free-programming-books.md">Prog. Books</a><br>
                    <a class="urlcolor" href="http://slashdot.org/">Slashdot</a>
                </div>
                <div class="divurls">
                    <strong>Weeaboo:</strong><br>
                    <a class="urlcolor" href="http://www.nyaa.se">Nyaa</a><br>
                    <a class="urlcolor" href="http://myanimelist.net/profile/Zyst">MyAnimeList</a><br>
                    <a class="urlcolor" href="https://animebytes.tv/">Anime Bytes</a><br>
                    <a class="urlcolor" href="http://bakabt.me/">BakaBT</a><br>
                    <a class="urlcolor" href="http://www.amiami.com/">AmiAmi</a><br>
                </div>
                <div class="divurls">
                    <strong>Entertainment:</strong><br>
                    <a class="urlcolor" href="http://r-a-d.io/">R/a/dio</a><br>
                    <a class="urlcolor" href="http://www.twitch.tv/">Twitch</a><br>
                    <a class="urlcolor" href="http://www.ustream.tv/channel/mogra1">MOGRA</a><br>
                    <a class="urlcolor" href="http://livechart.me/">Ani Countdown</a><br>
                    <a class="urlcolor" href="http://sleepyti.me/">Sleepyti.me</a>
                </div>
                <div class="divurls">
                    <strong>Botnet:</strong><br>
                    <a class="urlcolor" href="https://www.facebook.com/">Facebook</a><br>
                    <a class="urlcolor" href="https://www.linkedin.com/">LinkedIn</a><br>
                    <a class="urlcolor" href="https://twitter.com/">Twitter</a><br>
                    <a class="urlcolor" href="https://plus.google.com/">Plus</a><br>
                    <br>
                </div>
                <div class="divurls">
                    <strong>Japanese:</strong><br>
                    <a class="urlcolor" href="https://ankiweb.net/shared/decks/">Anki Shared Decks</a><br>
                    <a class="urlcolor" href="https://docs.google.com/document/d/1G5C7fCe07CDzYalZYZObzxv_fhw7RUNsLHiMAY-t7FA">DJT Guide</a><br>
                    <a class="urlcolor" href="https://docs.google.com/spreadsheet/lv?key=0Agk2IH0ZXhn7dDNmSW1BVFU5dVgyOHkzWjU4b2l2dkE">DJT Reading Guide</a><br>
                    <a class="urlcolor" href="http://pastebin.com/w0gRFM0c">DJT Pastebin</a>
                </div>
            </div>
        </div>
            <script type="text/javascript">
                loadAPI();
            </script>
    </body>
</html>
