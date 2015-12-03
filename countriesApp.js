
angular.module('countriesApp', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl : 'home.html',
			controller : 'HomeCtrl'
		})
		.when('/list', {
			templateUrl : 'list.html',
			controller : 'ListCtrl'
		})
		.when('/details', {
			templateUrl : 'details.html',
			controller : 'DetailsCtrl'
		});
	}])
	.controller('HomeCtrl', function($scope) {
		
	})