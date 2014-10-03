$(function(){
console.log("testing html page");
/////////////////////////////////////////////////////////////////

// submit button on form
var button = $('button#submit');
	button.on("click", function(event) {
	event.preventDefault();
			console.log("button click");

		var name = $('#name').val();
		var age = $('#age').val();
		var address = $('#address').val();
		var phone = $('#phone').val();
				console.log(name + " " + age + " " + address + " " + " " + phone);

// post request for contacts
		$.ajax({
			url:"/contacts",
			type:"POST",
			data:{name: name, age: age, address: address, phone: phone}
		}).done(function(data){
			console.log(data);
		})
});

// display categories on page
$.ajax({
	type:"GET",
	url:"/categories",
	}).done(function(data){
			console.log(data);
			var categories = data;
			var ul_categories = $('ul');
				for(i = 0; i < categories.length; i++){
				ul_categories.append('<li id="categories">' +categories[i]["name"]+ '</li>');	
			}
});









///////end//////		
});