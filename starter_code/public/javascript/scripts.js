$(function(){
console.log("testing html page");

/////////////////////////////////////////////////////////////////
// loading contact list from allContacts function
allContacts();
// loading category list from displayCategories function
displayCategory();


// submit button on form
var button = $('button#submit');
	button.on("click", function(event) {
	event.preventDefault();
			console.log("button click");

		var name = $('#name').val();
		var age = $('#age').val();
		var address = $('#address').val();
		var phone_number = $('#phone').val();
		var category_id= $('#category_id').val();
		var ul_contacts = $('ul');
				console.log(name + " " + age + " " + address + " " + " " + phone_number+ " " + category_id);


// post request for contacts
$.ajax({
		url:"/contacts",
		type:"POST",
		data:{name: name, age: age, address: address, phone_number: phone_number, category_id: category_id}
			}).done(function(data){
			console.log(data);
			ul_contacts.append("<li>" +name)
			
			// may want to use this for /contacts/:id//	
			// ul_contacts.append("<li>" + "Name: " + name + "<br>" + "Age: " + age + "<br>" + "Address: " + address + "<br>" + "Phone: " + phone_number +"<br>"+ "Category ID: " + category_id)
		})
});


// display categories on page
function displayCategory() {
$.ajax({
			type:"GET",
			url:"/categories",
				}).done(function(data){
				console.log(data);
			
				var categories = data;
				var ul_categories = $('ul');
				
				for(i = 0; i < categories.length; i++){
					
					// ul_categories.append('<li id="categories">' +categories[i]["name"]+ '</li>');	
					var contactInfo_categoryID = '<option value="' + categories[i].id + '">' + categories[i]["name"] + '</option>'
					$('select').append(contactInfo_categoryID); 
			}
	});
};

// displaying all contacts, function called at the top upon loading the page
function allContacts() {
	$.ajax({
			url:"/contacts",
			type:"GET"
			}).done(function(data){
				var contacts = data;
				console.log(data);
	
				var ul = $('.all_contacts');
				var h2 = $('.all_header');
			
				h2.append("All Contacts")
					for (i=0; i < contacts.length; i++) {
					ul.append("<li id='" + contacts[i]["id"] + "'>" +  contacts[i]["name"] + "</li>")
				}
		});
};






///////end//////		
});