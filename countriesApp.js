
angular.module('countriesApp', ['ngRoute'])

	.constant('BASE_URL', 'http://api.geonames.org/countryInfoJSON?')
	.constant('BASE', 'http://api.geonames.org/')
	.constant('ALL_COUNTRIES', 'countryInfoJSON?')
	.constant('SINGLE_COUNTRY', 'searchJSON?country=')

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl : 'home.html',
			controller : 'HomeCtrl'
		})
		.when('/countries', {
			templateUrl : 'countries.html',
			controller : 'CountriesCtrl as countries',
			resolve : {
				getInfo : function(getCountryInfo) {
					var countriesData = getCountryInfo();
					return countriesData;
				}
			}
		})
		.when('/countries/:name', {
			templateUrl : 'country.html',
			controller : 'CountryCtrl as country',
			resolve : {
				getMoreInfo : function($route, getCountryDetails) {
					var name = $route.current.params.name;
					console.log($route.current.params.name);
					var moreDetails = getCountryDetails(name);
					return moreDetails;
				}
			}
		});
	}])








	.factory('getCountryInfo', ['$http', 'BASE_URL', function($http, BASE_URL) {
		return function() {
			var request = {
				username: 'markhamilton90',
				callback: 'JSON_CALLBACK'
			}
			return $http({
				cache: true,
				method: 'JSONP',
				url: BASE_URL,
				params: request
			})
			.then(function(response) {
				console.log(response.data);
				return response.data;
			},
			function() {
				console.log('Failure...');
			});
		};
	}])


	.factory('getCountryDetails', ['$http', 'BASE', 'SINGLE_COUNTRY', function($http, BASE, SINGLE_COUNTRY) {
		return function(name) {
			var request = {
				username: 'markhamilton90',
				callback: 'JSON_CALLBACK',
				maxRows: 1
			}
			return $http({
				cache: true,
				method: 'JSONP',
				url: BASE + SINGLE_COUNTRY + name,
				params: request
			})
			.then(function(response) {
				console.log(response.data);
				return response.data;
			},
			function() {
				console.log('Failure...');
			});
		};
	}])









	.controller('HomeCtrl', function($scope) {

	})
	.controller('CountriesCtrl', function($scope, getInfo) {
		var vm = this;
		console.log(getInfo);
		vm.search; // will contain value for $scope variable clicked
		vm.countriesData = getInfo.geonames;
		
	})
	.controller('CountryCtrl', function($scope, $routeParams, getMoreInfo) {
		var vm = this;
		var info = getMoreInfo.geonames[0];
		console.log(info);
		vm.name = info.countryName;
		vm.population = info.population;
		vm.area;
		vm.capital = info.name;
		vm.populationCapital = info.population;

		// add a resolve to controller
	})





