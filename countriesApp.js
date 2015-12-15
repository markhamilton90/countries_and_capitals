
angular.module('countriesApp', ['ngRoute', 'ngAnimate'])
	.run(function($rootScope, $location, $timeout) {
		$rootScope.$on('$routeChangeError', function() {
			$location.path('/');
		});
		$rootScope.$on('$routeChangeStart', function() {
			$rootScope.isLoading = true;
		});
		$rootScope.$on('$routeChangeSuccess', function() {
			$rootScope.isLoading = false;
		});
	})

///  ROUTES

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl : 'home.html',
			controller : 'HomeCtrl'
		})
		.when('/countries', {
			templateUrl : 'countries.html',
			controller : 'CountriesCtrl as countries',
			resolve : {
				countriesData : function(countryServices) {
					var countriesData = countryServices.getCountries();
					return countriesData;
				}
			}
		})
		.when('/countries/:name', {
			templateUrl : 'country.html',
			controller : 'CountryCtrl as country',
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
		})
		.otherwise({
			redirectTo : '/'
		});
	}])




	/// CONTROLLERS


	.controller('HomeCtrl', function() {

	})

	.controller('CountriesCtrl', ['countriesData', function(countriesData) {
		var vm = this;
		vm.countriesData = countriesData.geonames;
		// console.log($scope.countriesData); 
		
	}])

	.controller('CountryCtrl', ['countryData', 'capitalData', 'neighborsData',
		function(countryData, capitalData, neighborsData) {
			var countryData = countryData.geonames[0];
			var capitalData = capitalData.geonames[0];
			var neighborsData = neighborsData.geonames;

			var vm = this;
			vm.neighbors = neighborsData;
			vm.country_name = countryData.countryName;
			vm.country_code = countryData.countryCode;
			vm.population = countryData.population
			vm.area = countryData.areaInSqKm;
			vm.capital = countryData.capital || 'Unavailable';
			vm.capital_population = capitalData.population;
			console.log(vm);
	}])



	/// SERVICES


	// combining all http functions within one service
	.factory('countryServices', ['$http', function($http) {

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

	}]);





