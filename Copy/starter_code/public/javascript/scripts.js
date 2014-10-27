$(function(){
console.log("testing html page");
/////////////////////////////////////////////////////////////////

function loadAll(){
	allContacts(); // loading contact list from allContacts function
	displayCategory(); // loading category list from displayCategories function
	randomuserAPI(); // randomuserAPI function
	searchButton(); // search function
};
loadAll();

// submit button on form
var button = $('i#submit');
	button.on("click", function(event) {
	event.preventDefault();
			console.log("button click");

		var name = $('#name').val();
		var age = $('#age').val();
		var address = $('#address').val();
		var phone_number = $('#phone').val();
		var picture= $('#picture').val();
		var category_id= $('#category_id').val();
		var ul_contacts = $('ul');
				console.log(name + " " + age + " " + address + " " + " " + phone_number+ " " + picture + " " +category_id);


// post request for contacts
$.ajax({
		url:"/contacts",
		type:"POST",
		data:{name: name, age: age, address: address, phone_number: phone_number, picture: picture, category_id: category_id}
			}).done(function(data){
			console.log(data);
			
			ul_contacts.append("<li>" + name + "<button class='edit'>Edit</button>");

			editButton();
			deleteButton();
			randomuserAPI();

			// ul_contacts.append("<li>" + "Name: " + name + "<br>" + "Age: " + age + "<br>" + "Address: " + address + "<br>" + "Phone: " + phone_number +"<br>"+ "Category ID: " + category_id+ "<button class='edit'>Edit</button>")
		})
		window.location.reload();
});


//search button, a bit crazy looking, but working. when typing the name, name needs to be EXACT or else search won't work. need to work on this more later on today!
function searchButton() {
	var searchButton = $('i#search');
		searchButton.on("click", function(event) {
		event.preventDefault();
			console.log("search button click");

// search input
			var search = $('input#search').val();
// empty array that we will use later to push results in	
			var searchResultsArray = [];

// underscore.js .each method to loop.
			$.get('/contacts', function(contacts) {
				_.each(contacts, function(contact) {

// if name in contact equal to name typed into the search input, push results into empty array		
				if(contact['name'] == search){
				var contacts = "Name: " + contact["name"] + "<br>" + "Age: " + contact["age"] + "<br>" + "Address: " + contact["address"] + "<br>" + "Phone: " + contact["phone_number"] + "<br>" + "<img src='" + contact["picture"] + "'><br><i class='fa fa-caret-square-o-left fa-1.5x' id='back' value='button'></i>"
					searchResultsArray.push(contacts)
							}
						});
					}).done(function(){
					$("#search_result").append(searchResultsArray);

					backButton();
				});
			});;
		};


// display all categories on page and from select dropdown
function displayCategory() {
	$.ajax({
			type:"GET",
			url:"/categories",
				}).done(function(data){
					console.log(data);
			
				var categories = data;
				var h4_categories = $('.all_categories');
				
				for(i = 0; i < categories.length; i++){
					
					// h4_categories.append('<li id="categories">' +categories[i]["name"]+ '</li>');	
					var contactInfo_categoryID = '<option value="' + categories[i].id + '">' + categories[i]["name"] + '</option>'
					$('select').append(contactInfo_categoryID); 
			}
	});
};

// randomuserAPI call
function randomuserAPI() {
	$.ajax({
  	url:"http://api.randomuser.me/",
  	dataType:"json"
		}).done(function(data){
    	console.log(data);
    
    	var image = data["results"][0]["user"]["picture"]["thumbnail"];
    		console.log(image);
    	var picture = $('#picture');
		
			var photoButton = $('#random_image');
			photoButton.on('click', function(event) {
				event.preventDefault();
				picture.val(image);
			});
	});
};

var categories = [{"id":1,"name":"friends"},{"id":2,"name":"family"},{"id":3,"name":"co_worker"}];

var leftColumn = $('.column_header1');
contactsInCategory("friends");

var middleColumn = $('.column_header2');
contactsInCategory("family");

var rightColumn = $('.column_header3');
contactsInCategory("co_worker");

//sorting contacts and displaying via specific category
function contactsInCategory(category) {
		for (i = 0; i < categories.length; i++){
			if (category == categories[i]["name"]) {
			category_id = categories[i]["id"];		
			};
};

$.ajax({
		url: '/categories/' + category_id,
		type: 'GET'
		}).done(function(data){
		
			var contacts = data["contacts"];
				console.log(contacts);
		
			var ul = $("#" + category);
			var ul_friends = $('#friends');
			var ul_family = $('#family');
			var ul_co_worker = $('#co_worker');


			for (i = 0; i < contacts.length; i++) {
				var contactName = contacts[i]["name"];
				var contactAge = contacts[i]["age"];
				var contactAddress = contacts[i]["address"];
				var contactPhoneNumber = contacts[i]["phone_number"];
				
				ul.append("<li>" + contactName + " </li>");
		};
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
	
				var ul_contacts = $('.all_contacts');
				var h2 = $('.all_header');

			
					h2.append("All Contacts")
						for (i=0; i < contacts.length; i++) {
						ul_contacts.append("<li id='" + contacts[i]["id"] + "'>" + "Name: " +  contacts[i]["name"] +"<br>"+ "Age: " + contacts[i]["age"]+ "<br>" + "Phone Number: " + contacts[i]["phone_number"] + "<br>" + "Address: "+ contacts[i]["address"] +"<br>" + "<img src='" +contacts[i]["picture"]+ "'>" +"<br>" + "<i class='fa fa-pencil-square-o fa-2x' id='edit' value='button'></i>")				
					}
					
						editButton();
						saveButton();
						deleteButton();
			});
	};

// edit button, new form appears, how to change categories and make edit button dissapear upon click??
function editButton() {
	var $editButton = $("i#edit");
			$editButton.on("click", function(){
				console.log("edit button has been clicked")

				$("#input_field").empty('');	

				var id = $(this).parent().attr("id");
				$(this).parent().append("<div id='input_field'><input id='newName' placeholder='Name' </input> <br> <input id='newAge' placeholder='Age' </input> <br> <input id='newAddress' placeholder='Address' </input> <br> <input id='newPhoneNumber' placeholder='Phone Number' </input> <br> <select id='new_category_id'><option selected='selected'>Select category</option></select> <i class='fa fa-floppy-o fa-2x' id='save' value='button'></i><i class='fa fa-trash fa-2x' id='delete' value='button'></i><br> <input id='id' type='hidden' value='" + id + "'><i class='fa fa-caret-square-o-left fa-2x' id='back' value='button'></i></li></div>");
				// $(this).parent().append("<br><input id='newName' placeholder='Name' </input> <br> <input id='newAge' placeholder='Age' </input> <br> <input id='newAddress' placeholder='Address' </input> <br> <input id='newPhoneNumber' placeholder='Phone Number' </input> <button class='save'>Save</button> <button class='delete'>Delete</button></li>");

				$.ajax({
					url:'/categories',
					type: 'GET'
					}).done(function(data){
						console.log(data)

					var category = data;
						for (i=0; i < category.length; i++) {
							var categories = $('select#new_category_id');
							categories.append('<option value="' + category[i].id + '">' + category[i]["name"] + '</option>'); 
		}
})
					saveButton();
					deleteButton();
					backButton();

		});

};

function backButton(){
	var $backButton = $("i#back");
			$backButton.on("click", function(){
				console.log("back button has been clicked");
			
			window.location.reload();
		});
};


// save button for changes in new input forms
function saveButton(){
	var $saveButton = $("i#save");
	$saveButton.on("click", function(){
		console.log("save button has been clicked");
					
			var $newNameInput = $("input#newName");
			var $newAgeInput = $("input#newAge");
			var $newAddressInput = $("input#newAddress");
			var $newPhoneNumberInput = $("input#newPhoneNumber")
			var newCategoryIdInput = $('select#new_category_id');
			var $id = $("input#id")
			
			var newName = $newNameInput.val();
			var newAge = $newAgeInput.val();
			var newAddress = $newAddressInput.val();
			var newPhoneNumber = $newPhoneNumberInput.val();
			var newCategoryId = newCategoryIdInput.val();
			var newId = $id.val();
		
			// var id = $(this).parent().attr("id"); // id is passed through
			// debugger

		putRequestContact(newName, newAge, newAddress, newPhoneNumber, newCategoryId, newId);
	});
};

// delete button
function deleteButton() {
	var deleteButton = $('i#delete');
	deleteButton.on("click", function() {
		console.log('Delete button working');
	
		var name = $('#name').val();
		var age = $('#age').val();
		var address = $('#address').val();
		var phone_number = $('#phone_number').val();
		var category_id = $('#category_id').val();

		var id = $(this).parent().attr("id");
		var li = $('#'+id);

		li.remove();

		$.ajax({
			url:"/contacts/"+id,
			type: 'DELETE',
			data: {name: name, age: age, address: address, phone_number: phone_number, category_id: category_id, id: id }	
				}).done(function(response){
				console.log(response);
			})
			window.location.reload();
	});
};

// put request for contact
function putRequestContact(name, age, address, phone_number, category_id, id){
// debugger	
// var newId= id;

	$.ajax({
		type: "PUT",
		url: "/contacts/"+id,
		data: {name: name, age: age, address: address, phone_number: phone_number, category_id: category_id, id: id}
		}).done(function(data){
			console.log(data);
				var contacts = data;
				var li = contacts[i]["id"];
				$('li').html("<li>" + 'Name: '+ newName + "<br>" + 'Age: ' +newAge + 'Phone Number: ' +phone_number );
		});
				window.location.reload();
};



////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// sorting 	
// function sortingContacts(category){

// 	if(category.friends == 1)
// 		console.log("friends");
// 	else if (category.family == 2)
// 		console.log("family");
// 	else return ("co_workers");
// };






///////end//////		
});