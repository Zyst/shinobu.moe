angular.module("shinobuApp", [])

    // Inject $http to our controller
    .controller("mainController", function($http) {

        // Bind this to view model (vm)
        var vm = this;

        vm.helloWorld = "Success!";
        
        // Make the API call
        $http.get("https://r-a-d.io/api")
            .then(function(data) {
                
                // Bind the information we recieve
                // to vm.radio
                vm.radio = data;
                
            });

    });
