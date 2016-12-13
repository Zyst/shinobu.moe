angular.module('shinobuApp', [])
  .controller('mainController', function ($http) {
    // Our view model
    var vm = this;

    // Have we started? To show/hide our divs
    vm.started = false;

    // What we'll use to contain our front end display
    vm.display = {};

    // We add a 0 to numbers below 10 ie: 09, 03
    function zeroPadding(seconds) {
      var secondsString = String(seconds);

      if (secondsString.length > 1) {
        // Basically do nothing
        return secondsString;
      }
      return '0' + secondsString;
    }

    // Clears timeouts and calls r/a/dio
    function clearTimeoutsAndRestart() {
      clearTimeout(vm.timeTimeout);
      clearTimeout(vm.concurrencyTimeout);

      callRadio();
    }

    // Checks if we are still playing the same song
    function checkRadioConcurrency() {
      $http({
        method: 'GET',
        url: 'https://r-a-d.io/api',
      }).then(function successCallback(data) {
        vm.display.listeners = data.data.main.listeners;

        if (data.data.main.np !== vm.display.playing) {
          clearTimeoutsAndRestart();
        } else {
          vm.concurrencyTimeout = setTimeout(checkRadioConcurrency, 5000);
        }
      }, function errorCallback(err) {
        console.log('Somebody messed up', err);
      });
    }

    // Increases seconds in our playing, also handles the playing bar
    function increaseTime() {
      // Play bar is 100% by default
      var playingPercentage = 100;

      vm.time.currentTime++;

      // We turn time into Minutes and seconds
      vm.time.currentTimeMinutes = Math.floor(vm.time.currentTime / 60);
      vm.time.currentTimeSeconds = zeroPadding(vm.time.currentTime % 60);

      document.getElementById('time').innerHTML =
        vm.time.currentTimeMinutes + ':' + vm.time.currentTimeSeconds + '/' +
        vm.time.endTimeMinutes + ':' + vm.time.endTimeSeconds;

      if (vm.time.endTime > 0) {
        playingPercentage = vm.time.currentTime * 100 / vm.time.endTime;
      }

      document.getElementById('playing-bar').style.width = playingPercentage + '%';

      if (vm.time.currentTime >= vm.time.endTime && vm.time.endTime > 0) {
        clearTimeout(vm.timeTimeout);
      } else {
        vm.timeTimeout = setTimeout(increaseTime, 1000);
      }
    }

    // Binds our r/a/dio view model variables
    function setRadioGlobals(radio) {
      vm.radio = radio;

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
        endTimeSeconds: zeroPadding((vm.radio.main.end_time - vm.radio.main.start_time) % 60),
      };
    }

    // r/a/dio path
    function callRadio() {
      vm.playingRadio = true;

      vm.started = true;

      $http({
        method: 'GET',
        url: 'https://r-a-d.io/api',
      }).then(function successCallback(data) {
        setRadioGlobals(data.data);

        // We call the increase time function
        increaseTime();
        checkRadioConcurrency();
      }, function errorCallback(err) {
        console.log('Somebody messed up', err);
      });
    }

    // Binds our Last.fm view model variables
    function setLastFmGlobals(lastfm) {
      vm.lastfm = lastfm;

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
    }

    // Last.fm path
    function callLastfm() {
      vm.playingLastFm = true;

      vm.started = true;

      $http({
        method: 'GET',
        url: 'http://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=Zystx' +
          '&api_key=57ee3318536b23ee81d6b27e36997cde&limit=1&format=json',
      }).then(function successCallback(data) {
        setLastFmGlobals(data.data.recenttracks);

        setTimeout(callLastfm, 5000);
      }, function errorCallback(err) {
        console.log('Somebody messed up', err);
      });
    }

    // Determines which image is our Background randomly
    function randomBG() {
      var bg = document.body;
      var randomNumber = Math.floor((Math.random() * (14)) + 1);

      bg.style.backgroundImage = 'url(\'images/' + randomNumber + '.png\')';
    }

    // Start getting data
    function start() {
      // Random background
      randomBG();

      $http({
        method: 'GET',
        // Replace user=Zystx here with your Lastfm user name
        url: 'http://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=Zystx' +
          '&api_key=57ee3318536b23ee81d6b27e36997cde&limit=1&format=json',
      }).then(function successLastfm(lastfm) {
        // We bind the Last.fm data
        vm.lastfm = lastfm.data.recenttracks;

        $http({
          method: 'GET',
          url: 'https://r-a-d.io/api',
        }).then(function successRadio(radio) {
          // We bind the r/a/dio data
          vm.radio = radio.data;

          // We create variables for comparison
          var radioPlaying = vm.radio.main.np;
          var lastFmPlaying = vm.lastfm.track[0].artist['#text'] + ' - ' + vm.lastfm.track[0].name;

          // We see that the last.fm response doesn't have undefined to prevent an exception
          var notUndefined = vm.lastfm.track[0] !== undefined &&
            vm.lastfm.track[0]['@attr'] !== undefined &&
            vm.lastfm.track[0]['@attr'].nowplaying !== undefined;

          // If you are playing the same thing as r/a/dio
          if ((radioPlaying.toUpperCase() === lastFmPlaying.toUpperCase()) &&
            notUndefined && vm.lastfm.track[0]['@attr'].nowplaying === 'true') {
            setRadioGlobals(radio.data);
            callRadio();

          // You are playing something in Last.fm (Different from r/a/dio)
          } else if (notUndefined && vm.lastfm.track[0]['@attr'].nowplaying === 'true') {
            setLastFmGlobals(lastfm.data.recenttracks);
            callLastfm();

          // We aren't playing anything so we show r/a/dio
          } else {
            setRadioGlobals(radio.data);
            callRadio();
          }
        }, function playLastFm(err) {
          console.log('r/a/dio is down', err);

          // We use Last.fm
          callLastfm();
        });
      }, function playRadio(err) {
        console.log('Last.fm is down', err);

        // Last fm is down so we do r/a/dio
        callRadio();
      });
    }

    start();
  });
