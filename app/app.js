angular.module("shinobuApp", [])

    // Inject $http to our controller
    .controller("mainController", function($http) {

        // Bind this to view model (vm)
        var vm     = this;
        vm.apiGet  = false // Hide stuff until successful response
        vm.build   = false;
        
        // Make the API call for the main information
        $http.get("https://r-a-d.io/api")
            .then(function(data) {
                
                // Bind the information we receive
                // to vm.radio
                vm.radio = data.data;

                // Our commonly used JSON entries get bound
                vm.nowPlaying  = vm.radio.main.np;
                vm.dj          = vm.radio.main.dj.djname;
                vm.djId        = vm.radio.main.dj.id;
                vm.listeners   = vm.radio.main.listeners;
                vm.currentTime = vm.radio.main.current;
                vm.startTime   = vm.radio.main.start_time;
                vm.endTime     = vm.radio.main.end_time;

            })

            .then(function(data) {

                // We bind the image link once we get a response, because
                // we can't bind this until we are sure we have the data
                vm.djImage = "https://r-a-d.io/api/dj-image/" + vm.djId;

                vm.apiGet  = true; // Show the element we hid previously

                // vm.startTime = parseInt(vm.startTime);

                // We get the current time (Song position) in seconds
                vm.currentTime = vm.currentTime - vm.startTime;

                // We get the end time (Song end) in seconds
                vm.endTime = vm.endTime - vm.startTime;

                // Starts the Timer
                var countUp = setInterval(increaseTime, 1000);

                /**
                 * * * * TIME AND PLAYING BAR HANDLER * * * *
                 *
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

                    // Here we turn the numbers into Minutes and seconds
                    vm.currentTimeMinutes = Math.floor(vm.currentTime / 60);
                    vm.currentTimeSeconds = vm.currentTime % 60;

                    // We'll add a 0 pad
                    vm.currentTimeSeconds = zeroPadding(vm.currentTimeSeconds);
                    vm.endTimeMinutes = Math.floor(vm.endTime / 60);

                    vm.endTimeSeconds = vm.endTime % 60;

                    ++vm.currentTime;

                    /**
                     * We are now going to do the playing bar width adjustments.
                     *   Percentage based and laws of threes
                     */
                    if (vm.endTime > 0) {
                        // If the 'endTime' of song is above 0 update as normal
                        playingPercentage = vm.currentTime * 100 / vm.endTime;
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
                    if ((vm.currentTime > vm.endTime) && (vm.endTime > 0)) {
                        clearInterval(countUp);
                    }
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
                        return "0" + seconds;
                    }
                }

                });
    });
