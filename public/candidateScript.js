/**
 * Created by Stephan on 5/20/2015.
 */


// create the module and name it candidateApp
// also include ngRoute for all our routing needs
var candidateApp = angular.module('candidateApp', ['ngRoute', 'ngAnimate']);

// configure our routes
candidateApp.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/' || '/flat_user_profile_ui', {
            templateUrl : 'flat_user_profile_ui.html',
            controller  : 'mainController'
        })

        .when('/flat_user_profile_ui', {
            templateUrl : 'flat_user_profile_ui.html',
            controller  : 'flat_user_prof_Controller'
        })

        // route for the about page
        .when('/candidate_search_results', {
            templateUrl : 'candidate_search_results.html',
            controller  : 'candidate_sr_Controller'
        })

        // route for the contact page
        .when('/edit_profile', {
            templateUrl : 'edit_profile.html',
            controller  : 'edit_profile_Controller'
        });

});

// create the controller and inject Angular's $scope
candidateApp.controller('mainController', function($scope) {
    $scope.pageClass = 'page-home';
});

candidateApp.controller('flat_user_prof_Controller', function($scope) {
    $scope.pageClass = 'page-home';
});


candidateApp.controller('candidate_sr_Controller', function($scope) {
    $scope.pageClass = 'page-about';
});

candidateApp.controller('edit_profile_Controller', function($scope) {
    $scope.pageClass = 'page-contact';
});
