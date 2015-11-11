var petFinder = {};

petFinder.apiKey = 'bef3b0336a3c5097e1138a4f5c127df1';
petFinder.apiSecret = '7e8338ee0e78c9548e81e40f0eef7191';

//This method takes the users location information and sorts the data based on that. 
petFinder.getLocation = function() {
	$('.searchForm').on('submit', function(e){
		e.preventDefault();
		var location = $('#submitButton').val();
		$('#submitButton').val('');

		//This passing the user's area code into .getData()
		petFinder.getData(location);
	});
};

// This method performs the function of getting the data from the api. Sends petfinderDisplayPets the results.
petFinder.getData = function(location) {
	var apiurl = 'http://api.petfinder.com/pet.find?key=' + petFinder.apiKey + '&location=' + location + '&format=json&animal=dog';
		$.ajax({
			url: apiurl,
			dataType: 'jsonp',
			method: 'GET'
		}).then(function(res){

			//This is passing an Array of Dogs into .displayPets()
			petFinder.displayPets(res.petfinder.pets.pet);
		});
};

//This method displays images of the pets in the users area on the page. 
petFinder.displayPets = function(pets) {
	clearDogs();
	$.each(pets, function(i, value){
		if(pets[i].media.photos !== undefined) {
			
			var $dogBox = $('<div>').addClass('dogBox').css({
				"background": "url("+pets[i].media.photos.photo[2].$t+")no-repeat",
				"background-size": "cover"});
			var $link = $("<a>").attr('href','#');
			var $overlay = $('<div>').addClass('overlay');

			//storing data in a variable to get to later!
			$dogBox.data({
				'name': value.name.$t,
				'age': value.age.$t,
				'sex': value.sex.$t,
				'breed': value.breeds.breed.$t,
				'shelter': value.shelterId.$t,
				'photo': pets[i].media.photos.photo[2].$t
			});

			$overlay
				.html("<p class=dogName>"+ value.name.$t)
				.append("<p>" + value.age.$t)
				.append("<p>" + value.sex.$t)

			if (value.breeds.breed.$t !== undefined) {
				$overlay
					.append("<p>" + value.breeds.breed.$t);
			}
			$link.append($overlay);
			$dogBox.append($link);
			$('.dogGallery').append($dogBox);
			$('.number').text(value.length);
			$(".hide").addClass("show");
			$(".hide2").addClass("show2");
		}
	});
	$('html, body').animate({scrollTop: $("#gallery").offset().top - 350}, 1000);
	
	$(".dogBox").on("click",function(e) {
		e.preventDefault();
		//This is passing the shelter ID corresponding to the DOG the user selected
		petFinder.getShelter($(this).data());
	});

};

//Clears the .dogGallery so it resets when a user inputs a new location
var clearDogs = function(){
	$(".dogGallery").html(" ");
}
 

//This method gets the shelter information
petFinder.getShelter = function(dogInfo) {

	//Second ajax call to get shelter info:
	var apiurl2 = 'http://api.petfinder.com/shelter.get?key=' + petFinder.apiKey + '&id=' + dogInfo.shelter + '&format=json';
	$.ajax({
		url: apiurl2,
		dataType: 'jsonp',
		method: 'GET'
	}).then(function(res){
		
		//This is passing the shelter information AND the dog object from each dog selected to the displayModal
		petFinder.displayModal(res, dogInfo);
		// console.log(dataObject);

	});

};

//This method displays the modal
petFinder.displayModal = function(shelterInfo, dogInfo) {
	
		$('.message').empty();
		$('div').removeClass('hidden');
		var dogName = $('<h2>').text('Meet ' + dogInfo.name);
		var dogPhoto = $('<img>').attr('src', dogInfo.photo);
		var dogBreed = $('<p class=dogModal>').text(dogInfo.breed);
		var dogSex = $('<p class=dogModal>').text(dogInfo.sex);
		var dogAge = $('<p class=dogModal>').text(dogInfo.age);
		var shelterName = $('<p class=dogModal>').text('For more information contact ' + shelterInfo.petfinder.shelter.name.$t);
		var shelterZip = $('<p class=dogModal>').text(shelterInfo.petfinder.shelter.zip.$t);
		var shelterEmail = $('<p class=dogModal>').text(shelterInfo.petfinder.shelter.email.$t);
		var shelterContainer = $('.message').append(dogName, dogPhoto, dogBreed, dogSex, dogAge,shelterName, shelterZip, shelterEmail);
};

//Initalizes  
petFinder.init = function() {
  petFinder.getLocation();
};

//Document ready. Runs everything once it's ready. 
$(document).ready(function(){
	  petFinder.init();
	  $('#closeButton').on('click', function(event) {
	  	event.preventDefault();
	  	$('.alert').addClass('hidden');
	  });
});

// - user inputs location and submits 
// - location gets put in variable 
// - variable gets passed into "getinfo"
// - variable gets put into location value in data section (in url)
// - ajax call returns 25 pets filtered by location 
// - display pets and more info on hover and focused photo, name, age, sex, breed 
// - when pet is clicked then display more information including: shelter name, phone #, location, email, etc.

