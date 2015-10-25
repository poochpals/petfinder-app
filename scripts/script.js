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
			petFinder.displayPets(res.petfinder.pets.pet);
			// console.log(res.petfinder.pets.pet);
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

var clearDogs = function(){
	$(".dogGallery").html(" ");
	console.log('clearing');
}


//This method displays images of the pets in the users area on the page. 
petFinder.displayPets = function(pets) {
	clearDogs();
	$.each(pets, function(i, value){
		// console.log(pets[i]);
		if(pets[i].media.photos !== undefined) {
			// console.log("inside displayPets");
			// console.log(pets[i].media.photos.photo[0].$t);
			var $dogBox = $('<div>').addClass('dogBox').css({
				"background": "url("+pets[i].media.photos.photo[2].$t+")no-repeat",
				"background-size": "cover"}).data("shelter", value.shelterId.$t);
			var $link = $("<a>").attr('href','#');
			var $overlay = $('<div>').addClass('overlay');
			//storing data in a variable to get to later!
			$overlay.data({
				'name': value.name.$t,
				'age': value.age.$t,
				'sex': value.sex.$t,
				'breed': value.breeds.breed.$t,
				'shelter': value.shelterId.$t
			});
			console.log(value.length);

			//displaying dog info on hover
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
			$('.hide3').addClass('show3 animated fadeIn');
			$('html, body').animate({
            scrollTop: $("div.dogGallery").offset().top-120}, 1000);
		}
	});
};


//we need to put this event listener outside of the loop(each) above!
$("body").on("click",".dogBox",function(e) {
	e.preventDefault();
	console.log($(this).data('shelter'));
	petFinder.getShelter($(this).data('shelter'));
}); 


//This method displays modal on click
petFinder.getShelter = function(shelterId) {
	$('.dogGallery').on('click', '.overlay',function(e){
		e.preventDefault();

		//second ajax call to get shelter info:
		var apiurl2 = 'http://api.petfinder.com/shelter.get?key=' + petFinder.apiKey + '&id=' + shelterId + '&format=json';
		//http://api.petfinder.com/shelter.get?key=bef3b0336a3c5097e1138a4f5c127df1&id=ON493&format=json
		$.ajax({
			url: apiurl2,
			dataType: 'jsonp',
			method: 'GET'
		}).then(function(res){

			// var shelter = res.petfinder.shelter.name.$t
			console.log(res.petfinder.shelter.name.$t);
			// var shelterName = res.petfinder.shelter.name.$t;
			// console.log(res);

			console.log(res.petfinder.shelter);
			// petFinder.displayModal(res.petfinder.shelter);
		});
		$(".hidden").addClass("show4");
		$('#close').addClass('show');
	});
};

// petFinder.displayModal = function(shelter) {
	
// }


// petFinder.displayModal = function(shelter) {

// 	$('.dogGallery').on('click', '.dogBox', function(e){
// 			e.preventDefault();

// 			console.log(shelter);
// 			console.log(shelter.name.$t);
// 			console.log(shelter.address.$t);
// 	});
// };

// clear and / or just grab the first object then finishes
// console.log(petFinder.displayModal);

//problem: its remembering every thing you click and displaying the shelter info for every dog you have previously clicked
//question: how can I tell the event listener to remember only the last dogBox you have clicked? 
			//how can I tell an event listener to only remember last item clicked?



petFinder.init = function() {
  petFinder.getLocation();
  petFinder.displayPets();
  petFinder.getShelter();
};

//Document ready. Runs everything once it's ready. 
$(document).ready(function(){
  petFinder.init();
});

