angular.module("shinobuApp", [])

    // Inject $http to our controller
    .controller("mainController", function($http) {

        // Bind this to view model (vm)
        var vm = this;
        
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

                // Once we get the previous data
                var djIdForCall = JSON.stringify(vm.dj);

                vm.djImage = "https://r-a-d.io/api/dj-image/" + vm.djId;

                //$http.get(djIdForCall)
                //    .then(function(imageResponse) {
                //
                //        // Bind the information we receive
                //        // to vm.djImage
                //        vm.djImage = imageResponse;
                //
                //    });
            });
    });
