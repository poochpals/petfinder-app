var petFinder = {};

petFinder.apiKey = 'abef3b0336a3c5097e1138a4f5c127df1';
petFinder.apiSecret = '7e8338ee0e78c9548e81e40f0eef7191';


petFinder.getData = function(city) {
	$.ajax({
		url: 'http://api.petfinder.com/pet.find?key=bef3b0336a3c5097e1138a4f5c127df1&location=Toronto,ontario&format=json&animal=dog',
		// 'http://api.petfinder.com/pet.find?key=bef3b0336a3c5097e1138a4f5c127df1&location=Toronto,ontario&format=json&animal=dog',
		dataType: 'jsonp',
		method: 'GET', 
		data: {
			variable: "find",
			key: petFinder.apiKey,
			location: city, 
			format: 'json',
			animal: "dog" 
		}
	}).then(function(res){
		console.log(res);
	});
};





//Document ready. Runs everything once it's ready. 
$(document).ready(function(){
  petFinder.getData();
  petFinder.getData("shelter", "Toronto, Ontario");
  // petFinder.getData("M6P1N9");
});


