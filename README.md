#My homepage

Loads r/a/dio currently playing information. As of 2.0 it also checks your Last.fm profile.

It cycles backgrounds randomly on load using `randomBG()` in `app/app.js` from the images numbered 1 - n in the `/images` folder.

Hosted on [shinobu.moe](shinobu.moe)

##What is happening?
Just released [2.0](https://github.com/Zyst/shinobu.moe/releases/tag/2.0) which added Last.fm support, completely switched to AngularJS which greatly improved response time from the PHP version, along with a couple other goodies.

Auto updates also work now, for both Last.fm and r/a/dio

##Completed Goals:
<ul>
    <li>Base Site</li>
    <li>404 Page</li>
    <li>PHP cURL script to obtain info from the r/a/dio api</li>
    <li>JS to display the aforementioned information</li>
    <li>Now Playing r/a/dio</li>
    <li>DJ Box with images r/a/dio</li>
    <li>Listener Count</li>
    <li>Starting time/Ending Time (Song)</li>
    <li>Make Starting time tick 'up' with JS</li>
    <li>Progress bar based on Starting time progress</li>
    <li>Auto-updates from API (Song Changes and time updates)</li>
    <li>Possibly a mobile/smaller resolution version.</li>
    <li>Last.fm support</li>
</ul>


## Screenshots
### Normal r/a/dio
![alt tag](http://puu.sh/n14OX/2685d8ba62.jpg)

### Playing Last.fm also auto grabs album art when available
![alt tag](http://puu.sh/n14TQ/6bdbab9917.jpg)

### If you aren't playing anything on Last.fm it shows what's playing in r/a/dio
![alt tag](http://puu.sh/n15cG/2d3f7995a9.jpg)

### If what you are scrobbling to Last.fm what is playing in r/a/dio you get the r/a/dio view instead of the Last.fm view
![alt tag](http://puu.sh/n15mc/0a6f83fdfe.jpg)

Distributed under the [MIT License](http://opensource.org/licenses/MIT) feel free to use this code however you want.
