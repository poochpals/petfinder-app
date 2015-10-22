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


// This method performs the function of getting the data from the api. Sends petfinderDisplayPets the results.
petFinder.getData = function(city) {
var apiurl = 'http://api.petfinder.com/pet.find?key=' + petFinder.apiKey + '&location=' + city + '&format=json&animal=dog';
	$.ajax({
		url: apiurl,
		dataType: 'jsonp',
		method: 'GET'
	}).then(function(res){
		// console.log(res.petfinder.pets.pet);
		petFinder.displayPets(res.petfinder.pets.pet);
	});
};


//This method takes the users location information and sorts the data based on that. 
petFinder.getLocation = function() {
	$('.searchForm').on('submit', function(e){
		e.preventDefault();
		var location = $('#submitButton').val();
		$('#submitButton').val('');
		petFinder.getData(location);
	});
};


//This method displays images of the pets in the users area on the page. 
petFinder.displayPets = function(pets) {
	$.each(pets, function(i, value){
		console.log(pets[i])
		if(pets[i].media.photos != undefined) {
			console.log("inside displayPets");
			console.log(pets[i].media.photos.photo[0].$t)	
			var $dogBox = $('<div>').addClass('dogBox').css({
				"background": "url("+pets[i].media.photos.photo[0].$t+")no-repeat",
				"background-size": "cover"})
			var $link = $("<a>").attr('href','#');
			var $overlay = $('<p>').addClass('overlay');
			$overlay.data({
				'name': value.name.$t,
				'age': value.age.$t,
				'sex': value.sex.$t,
				'breed': value.breeds.breed.$t
			});
			$link.append($overlay);
			$dogBox.append($link);
			$('.dogGallery').append($dogBox);
		};
	});
};


//This method displays modal on click
petFinder.displayModal = function() {
	$('.dogGallery').on('click', '.overlay',function(e){
		e.preventDefault();

		//when you click get the data on the overlay and use it how you wish

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


