angular.module('countriesApp')
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