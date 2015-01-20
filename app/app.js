angular.module("shinobuApp", [])

    // Inject $http to our controller
    .controller("mainController", function($http) {

        // Bind this to view model (vm)
        var vm          = this;
        var nowPlaying  = this,
            dj          = this,
            listeners   = this,
            currentTime = this,
            startTime   = this,
            endTime     = this;

        vm.helloWorld = "Success!";
        
        // Make the API call
        $http.get("https://r-a-d.io/api")
            .then(function(data) {
                
                // Bind the information we receive
                // to vm.radio
                vm.radio = data.data;
                
                nowPlaying = vm.radio.main.np;
                
                dj = vm.radio.main.dj.djname;
                
                listeners = vm.radio.main.listeners;
                
                currentTime = vm.radio.main.current;
                
                startTime = vm.radio.main.start_time;

                endTime = vm.radio.main.end_time;
                
            });

    });
