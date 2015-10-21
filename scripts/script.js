var petFinder = {};

petFinder.apiKey = 'bef3b0336a3c5097e1138a4f5c127df1';
petFinder.apiSecret = '7e8338ee0e78c9548e81e40f0eef7191';

// - user inputs location and submits 
// - location gets put in variable 
// - variable gets passed into "getinfo"
// - variable gets put into location value in data section (in url)
// - ajax call returns 25 pets filtered by location 
// - display pets and more info on hover and focused photo, name, age, sex, breed 
// - when pet is clicked then display more information including: shelter name, phone #, location, email, etc.



petFinder.getData = function(city) {
	var apiurl = 'http://api.petfinder.com/pet.find?key=' + petFinder.apiKey + '&location=' + city + '&format=json&animal=dog';

petFinder.getData = function(city) {

	$.ajax({
		url: apiurl,
		dataType: 'jsonp',
		method: 'GET'
	}).then(function(res){
		console.log(res.petfinder.pets.pet);
		petFinder.displayPets(res.petfinder.pets.pet);
	});
};

petFinder.getLocation = function() {
	$('.searchForm').on('submit', function(e){
		e.preventDefault();
		var location = $('#submitButton').val();
		$('#submitButton').val('');
		console.log(location);
		petFinder.getData(location);
	});
};

petFinder.displayPets = function(pets) {
	$.each(pets, function(i, value){
		console.log("inside displayPets");
		console.log(value);
	});
};

petFinder.init = function() {
  petFinder.getData();
  petFinder.getLocation();
};



//Document ready. Runs everything once it's ready. 
$(document).ready(function(){
  petFinder.init();
});


