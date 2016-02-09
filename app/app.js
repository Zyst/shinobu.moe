angular.module("shinobuApp", [])
    .controller('mainController', function ($http) {
        
        // Our view model
        var vm = this;

        // Have we started? To show/hide our divs
        vm.started = false;

        // What we'll use to contain our front end display
        vm.display = {};

        // r/a/dio path
        var callRadio = function () {

            vm.playingRadio = true;

            vm.started = true;

            $http({
                method: 'GET',
                url: 'https://r-a-d.io/api'
            }).then(function successCallback(data) {

                vm.radio = data.data;

                vm.display.playing = vm.radio.main.np;

                // Our commonly used JSON entries get bound
                vm.display.playing = vm.radio.main.np;
                vm.display.dj = vm.radio.main.dj.djname;
                vm.display.image = 'https://r-a-d.io/api/dj-image/' + vm.radio.main.dj.id;
                vm.display.listeners = vm.radio.main.listeners;

                // Object with our 'time' information
                vm.time = {
                    currentTime: vm.radio.main.current - vm.radio.main.start_time,
                    endTime: vm.radio.main.end_time - vm.radio.main.start_time,
                    endTimeMinutes: Math.floor((vm.radio.main.end_time - vm.radio.main.start_time) / 60),
                    endTimeSeconds: zeroPadding((vm.radio.main.end_time - vm.radio.main.start_time) % 60)
                }

                // We call the increase time function
                increaseTime();
                checkRadioConcurrency();

            }, function errorCallback(err) {

                console.log('Somebody messed up');

            });

        }

        // Checks if we are still playing the same song
        var checkRadioConcurrency = function () {

            $http({
                method: 'GET',
                url: 'https://r-a-d.io/api'
            }).then(function successCallback(data) {

                vm.display.listeners = data.data.main.listeners;

                if (data.data.main.np !== vm.display.playing) {
                    
                    clearTimeoutsAndRestart();

                } else {

                    vm.concurrencyTimeout = setTimeout(checkRadioConcurrency, 5000);
                }
            
            }, function errorCallback(err) {
                console.log('Somebody messed up');

            });
        }

        // Clears timeouts and calls r/a/dio
        var clearTimeoutsAndRestart = function () {

            clearTimeout(vm.timeTimeout);
            clearTimeout(vm.concurrencyTimeout);

            callRadio();
        }

        // Increases seconds in our playing, also handles the playing bar
        var increaseTime = function () {

            vm.time.currentTime++;

            // We turn time into Minutes and seconds
            vm.time.currentTimeMinutes = Math.floor(vm.time.currentTime / 60);
            vm.time.currentTimeSeconds = zeroPadding(vm.time.currentTime % 60);

            document.getElementById("time").innerHTML = vm.time.currentTimeMinutes + ":" + vm.time.currentTimeSeconds +
                        "/" + vm.time.endTimeMinutes + ":" + vm.time.endTimeSeconds;

            // Play bar is 100% by default
            var playingPercentage = 100;

            if (vm.time.endTime > 0) {
                playingPercentage = vm.time.currentTime * 100 / vm.time.endTime;
            }

            document.getElementById("playing-bar").style.width = playingPercentage + "%";

            if (vm.time.currentTime >= vm.time.endTime && vm.time.endTime > 0) {

                clearTimeout(vm.timeTimeout);
            } else {

                vm.timeTimeout = setTimeout(increaseTime, 1000);
            }

        }

        // Last.fm path
        var callLastfm = function () {

            vm.playingLastFm = true;

            $http({
                method: 'GET',
                url: 'http://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=Zystx&api_key=5b801a66d1a34e73b6e563afc27ef06b&limit=1&format=json'
            }).then(function successCallback(data) {

                vm.lastfm = data.data.recenttracks;

                // We save the currenly playing song and artist 
                vm.display.playing = vm.lastfm.track[0].artist['#text'] + ' - ' + vm.lastfm.track[0].name;
                
                // A default image in case there's no artwork in our Last.fm
                vm.display.image = 'images/dj.jpg';
                
                // We grab the largest image that exists
                vm.lastfm.track[0].image.forEach(function (image) {
                    
                    // If the image is different from 'empty' this is our new image
                    if (image['#text'] !== '') {
                        vm.display.image = image['#text'];
                    }

                }, this);
                
                // DJ is hardcoded for Last.fm
                vm.display.dj = 'Zyst';
                
                // We have completed a cycle
                vm.started = true;

                setTimeout(callLastfm, 5000);

            }, function errorCallback(err) {

                console.log('Somebody messed up');

            });

        }

        // We add a 0 to numbers below 10 ie: 09, 03
        var zeroPadding = function (seconds) {

            seconds = String(seconds);

            if (seconds.length > 1) {

                // Basically do nothing
                return seconds;

            } else {

                return "0" + seconds;
            }
        }

        // Determines which image is our Background randomly
        var randomBG = function () {

            var bg = document.body;
            var randomnumber = Math.floor((Math.random() * (14)) + 1);

            bg.style.backgroundImage = "url('images/" + randomnumber + ".png')";
        }

        // Start getting dataa
        var start = function () {

            // Random background
            randomBG();

            $http({
                method: 'GET',
                // Replace user=Zystx here with your Lastfm user name
                url: 'http://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=Zystx&api_key=5b801a66d1a34e73b6e563afc27ef06b&limit=1&format=json'
            }).then(function successCallback(lastfm) {
                
                // We bind the Last.fm data
                vm.lastfm = lastfm.data.recenttracks;

                $http({
                    method: 'GET',
                    url: 'https://r-a-d.io/api'
                }).then(function successCallback(radio) {
                    
                    // We bind the r/a/dio data
                    vm.radio = radio.data;
                    
                    // We create variables for comparison
                    var radioPlaying = vm.radio.main.np;
                    var lastFmPlaying = vm.lastfm.track[0].artist['#text'] + ' - ' + vm.lastfm.track[0].name;

                    var notUndefined = vm.lastfm.track[0] !== undefined &&
                        vm.lastfm.track[0]['@attr'] !== undefined &&
                        vm.lastfm.track[0]['@attr'].nowplaying !== undefined;

                    // If you are playing the same thing as r/a/dio
                    if ((radioPlaying.toUpperCase() === lastFmPlaying.toUpperCase()) &&
                        notUndefined && vm.lastfm.track[0]['@attr'].nowplaying === "true") {

                        callRadio();

                    // You are playing something in Last.fm (Different from r/a/dio)
                    } else if (notUndefined && vm.lastfm.track[0]['@attr'].nowplaying === "true") {

                        callLastfm();

                        // We aren't playing anything so we show r/a/dio
                    } else {

                        callRadio();
                    }

                }, function errorCallback(err) {

                    // We use Last.fm
                    callLastfm();
                });

            }, function errorCallback(err) {

                // Last fm is down so we do r/a/dio
                callRadio();
            });
        }

        start();
    });
