$(function(){
console.log("testing html page");

/////////////////////////////////////////////////////////////////
// loading contact list from allContacts function
allContacts();

// loading category list from displayCategories function
displayCategory();


// submit button on form
var button = $('i#submit');
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
			ul_contacts.append("<li>" + name + "<button class='edit'>Edit</button>")
			
			// may want to use this for /contacts/:id//	
			// ul_contacts.append("<li>" + "Name: " + name + "<br>" + "Age: " + age + "<br>" + "Address: " + address + "<br>" + "Phone: " + phone_number +"<br>"+ "Category ID: " + category_id+ "<button class='edit'>Edit</button>")
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
				var h4_categories = $('.all_categories');
				
				for(i = 0; i < categories.length; i++){
					
					h4_categories.append('<li id="categories">' +categories[i]["name"]+ '</li>');	
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
	
				var ul_contacts = $('.all_contacts');
				var h2 = $('.all_header');
			
				h2.append("All Contacts")
					for (i=0; i < contacts.length; i++) {
					ul_contacts.append("<li id='" + contacts[i]["id"] + "'>" +  contacts[i]["name"] + "<button class='edit'>Edit</button>")				
				}
					editButton();

		});
};

// edit button, new form appears, how to change categories and make edit button dissapear upon click??
function editButton() {
			var $editButton = $("button.edit");
			$editButton.on("click", function(){
				console.log("edit button has been clicked")
				$(this).parent().append("<br>" + "<input id='newName' placeholder='Name' </input> <br> <input id='newAge' placeholder='Age' </input> <br> <input id='newAddress' placeholder='Address' </input> <br> <input id='newPhoneNumber' placeholder='Phone Number' </input> <button class='save'>Save</button> <button class='delete'>Delete</button></li>");
				
				saveButton();
				deleteButton();
		});
};

// save button
function saveButton(){
	var $saveButton = $("button.save");
	$saveButton.on("click", function(){
		console.log("save button has been clicked");
		
			var id = $(this).parent().attr("id");
			
			var $newNameInput = $("input#newName");
			var $newAgeInput = $("input#newAge");
			var $newPhoneNumberInput = $("input#newPhoneNumber")
			
			var newName = $newNameInput.val();
			var newAge = $newAgeInput.val();
			var newPhoneNumber = $newPhoneNumberInput.val();


		putRequestContact(newName, newAge, newPhoneNumber);
	});
};

// delete button
function deleteButton() {
	var deleteButton = $('.delete');
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
		url:'/contacts/'+id,
		type: 'DELETE',
		data: {name: name, age: age, address: address, phone_number: phone_number, category_id: category_id, id: id }	
			}).done(function(response){
			console.log(response);
		})
	});
};

// put request for contact. THIS IS A FUCKING MESS
function putRequestContact(name, age, address, phone_number){
	$.ajax({
		type: "PUT",
		url: "/contacts",
		data: {name: name, age: age, address: address, phone_number: phone_number}
		}).done(function(data){
			console.log(data);
				var contacts = JSON(data);
				var li = contacts["id"];
				$('li').html("<li>" + 'Name: '+ newName + " <br> " + 'Age: ' +newAge + phone_number );
		});
	}

// function allCategories() {
// 		var leftColumn = $('.column_header1');
// 		leftColumn.append(category[0]["name"]);

// 		var middleColumn = $('.column_header2');
// 		middleColumn.append(category[1]["name"]);

// 		var rightColumn = $('.column_header3');
// 		rightColumn.append(category[2]["name"]);
// 		}
// allCategories();





///////end//////		
});