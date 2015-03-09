#My homepage

Loads r/a/dio currently playing info. currently updates everything with JS and thus cannot 'change' tracks dynamically. Fixing that is one of the current goals.

It cycles backgrounds randomly on load using togglerandomBG.js from the images numbered 1 - n in the /images folder.

Hosted on [shinobu.moe](shinobu.moe)

##What is happening?
Currently I'm updating the entire site so it runs on Angular instead of PHP (Improved response time by 900% since it doesn't need to wait for the PHP response to render the page, instead handling it with the angular promise)

The current 'to-do' actions are:

<ul>
    <li>Finish polishing the reactive aspect of the site (It'll now work on mobile)</li>
    <li>Fix the random background, that should take a few seconds</li>
</ul>

On the bright side, auto updates now work. Meaning when the song changes it'll change the song by itself. On the downside I added the bootstrap library to make this work. That does add like 130 kb to page load. I'll minify the modified version I'm using once I'm done which will hopefully take that down to around 34 kb. Will keep updating.

##Current Goals:
<ul>
    <li>A button that launches Foobar/AIMP3 with the r/a/dio stream or the r/a/dio stream in-browser after the button press</li>
    <li>Possibly a mobile/smaller resolution version, as this is my personal site it doesn't really display well with small resolutions.</li>
</ul>

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
    <li>Ultimately auto-updates from API (Song Changes and time updates)</li>
</ul>


## Screenshots
![alt tag](http://puu.sh/b1arK/37b46b228a.jpg)

![alt tag](http://puu.sh/b4cCB/eb57b062b3.jpg)

![alt tag](http://puu.sh/b19va/279952fbf2.jpg)

![alt tag](http://puu.sh/b12Nw/ee8632fac8.jpg)


Distributed under the [MIT License](http://opensource.org/licenses/MIT) feel free to use this code however you want.
