var jobflex = angular.module("jetbrains", []);

jobflex.controller("AppCtrl", function ($http) {
    var app = this;
    var url = "http://localhost:3000";

    app.saveCandidate = function (newCandidate) {
        $http.post(url + "/add", {name:newCandidate}).success(function (){
            loadCandidate();
        })
    }

    function loadCandidate() {
        $http.get("http://localhost:3000").success(function (candidates) {
            app.candidate = candidates;
        })
    }
    loadCandidate();
})