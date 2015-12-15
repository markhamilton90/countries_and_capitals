angular.module('countriesApp')
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