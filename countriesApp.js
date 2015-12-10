
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
					var getCountries = countryServices.getCountries(name);
					return getCountries;
				},
				capitalData : function($route, countryServices) {
					var name = $route.current.params.name;
					var getCapital = countryServices.getCapital(name);
					return getCapital;
				},
				neighborsData : function($route, countryServices) {
					var name = $route.current.params.name;
					var getNeighbors = countryServices.getNeighbors(name);
					return getNeighbors;
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

	.controller('CountryCtrl', function($scope, countryData, capitalData, neighborsData) {
		var countryData = countryData.geonames[0];
		var capitalData = capitalData.geonames[0];
		var neighborsData = neighborsData.geonames;
		console.log(neighborsData);
		$scope.neighbors = neighborsData;
		$scope.country_name = countryData.countryName;
		$scope.country_code = countryData.countryCode;
		console.log($scope.country_code);
		$scope.population = countryData.population
		$scope.area = countryData.areaInSqKm;
		$scope.capital = countryData.capital || 'Unavailable';
		$scope.capital_population = capitalData.population;
	})



	/// SERVICES


	// combining all http functions within one service
	.factory('countryServices', function($http) {

		return {
			getCountries : getCountries,
			getCapital : getCapital,
			getNeighbors : getNeighbors
		};

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
				//console.log(response.data);
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
				//console.log(response.data);
				return response.data;
			},
			function() {
				console.log('Failure...');
			});
		}

		function getNeighbors(name) {
			var request = {
				username: 'markhamilton90',
				callback: 'JSON_CALLBACK',
				country: name
			}
			return $http({
				method: 'JSONP',
				url: 'http://api.geonames.org/neighboursJSON?',
				params: request
			})
			.then(function(response) {
				return response.data;
			},
			function() {
				console.log('Failure...');
			})
		}

	})





