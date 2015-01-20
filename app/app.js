angular.module("shinobuApp", [])

    // Inject $http to our controller
    .controller("mainController", function($http) {

        // Bind this to view model (vm)
        var vm = this;
        var nowPlaying,
            dj,
            listeners,
            currentTime,
            startTime,
            endTime;

        vm.helloWorld = "Success!";
        
        // Make the API call
        $http.get("https://r-a-d.io/api")
            .then(function(data) {
                
                // Bind the information we receive
                // to vm.radio
                vm.radio = data.main;
                
                nowPlaying = data.main[0].np;
                
            });

    });
