
angular.module('countriesApp', ['ngRoute'])

///  ROUTES

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl : 'home.html',
			controller : 'HomeCtrl'
		})
		.when('/countries', {
			templateUrl : 'countries.html',
			controller : 'CountriesCtrl',
			resolve : {
				countriesData : function(countryServices) {
					var countriesData = countryServices.getCountries();
					return countriesData;
				}
			}
		})
		.when('/countries/:name', {
			templateUrl : 'country.html',
			controller : 'CountryCtrl',
			resolve : {
				countryData : function($route, countryServices) {
					var name = $route.current.params.name;
					var getCapital = countryServices.getCapital(name);
					var getCountries = countryServices.getCountries(name);
					return {
						getCapital : getCapital,
						getCountries : getCountries
					};
				}
			}
		});
	}])




	/// CONTROLLERS


	.controller('HomeCtrl', function($scope) {

	})

	.controller('CountriesCtrl', function($scope, countriesData) {
		console.log(countriesData);
		$scope.countriesData = countriesData.geonames;
		// console.log($scope.countriesData); 
		
	})

	.controller('CountryCtrl', function($scope, countryData) {
		console.log(countryData);
		var countryData = countryData.getCapital.geonames[0];
		console.log(countryData);
		$scope.countryName = countryData.countryName;
		$scope.capital = countryData.adminName1;
		$scope.capitalPop = countryData.population;
		console.log(countryData.population);
	})



	/// SERVICES


	// combining all http functions within one service
	.factory('countryServices', function($http) {

		return ({
			getCountries : getCountries,
			getCapital : getCapital
		});

		// get full list of countries
		function getCountries(name) {
			var request = {
				username: 'markhamilton90',
				callback: 'JSON_CALLBACK',
				country: name || ''
			}
			return $http({
				cache: true,
				method: 'JSONP',
				url: 'http://api.geonames.org/countryInfoJSON?',
				params: request
			})
			.then(function(response) {
				console.log(response.data);
				return response.data;
			},
			function() {
				console.log('Failure...');
			});
		}

		// get select information for specific country's capital
		function getCapital(name) {
			var request = {
				username: 'markhamilton90',
				callback: 'JSON_CALLBACK',
				country: name
			}
			return $http({
				method: 'JSONP',
				url: 'http://api.geonames.org/searchJSON?',
				params: request
			})
			.then(function(response) {
				console.log(response.data);
				return response.data;
			},
			function() {
				console.log('Failure...');
			});
		}

	})





