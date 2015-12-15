
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

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl : 'home.html',
			controller : 'HomeCtrl'
		})
		.when('/countries', {
			templateUrl : 'countries/countries.html',
			controller : 'CountriesCtrl as countries',
			resolve : {
				countriesData : function(countryServices) {
					var countriesData = countryServices.getCountries();
					return countriesData;
				}
			}
		})
		.when('/countries/:name', {
			templateUrl : 'countries/country.html',
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