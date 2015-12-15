angular.module('countriesApp')
	.controller('CountriesCtrl', ['countriesData', function(countriesData) {
		var vm = this;
		vm.countriesData = countriesData.geonames;
		// console.log($scope.countriesData); 
		
	}])