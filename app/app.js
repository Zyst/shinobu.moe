angular.module("shinobuApp", [])

    // Inject $http to our controller
    .controller("mainController", function($http) {

        // Bind this to view model (vm)
        var vm = this;

        vm.helloWorld = "Success!";
        
        // Make the API call
        $http.get("https://r-a-d.io/api")
            .then(function(data) {
                
                // Bind the information we receive
                // to vm.radio
                vm.radio = data.data;

                vm.nowPlaying  = vm.radio.main.np;
                vm.dj          = vm.radio.main.dj.djname;
                vm.listeners   = vm.radio.main.listeners;
                vm.currentTime = vm.radio.main.current;
                vm.startTime   = vm.radio.main.start_time;
                vm.endTime     = vm.radio.main.end_time;
                
            });

    });
