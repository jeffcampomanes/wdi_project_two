$(function(){
console.log("testing html page");

/////////////////////////////////////////////////////////////////

// var ItemView = Backbone.View.extend({
// 	tagName:"ul",
// 	this.template = _.template($('#template').html())

// 	events: {
		
// 	},

// 	initialize: function(){
// 		this.listenTo(this.model, 'change', this.render)
// 		this.listenTo(this.model, 'destroy', this.remove)
// 		this.template = _.template($('#template').html())
// 	},

// 	render:function(){
// 	   var myTemplate = this.template({item: this.model.attributes})
		
// 		this.$el.html(myTemplate);
// 	}
// })

/////////////////////////////////////////////////////////////////

// submit button
var submitButton = $('button#submit');
	submitButton.on("click", function(event) {
	event.preventDefault(); 
		console.log("button click");
	})

// display categories on page
	$.ajax({
		type:"GET",
		url:"/categories",
	}).done(function(data){
			console.log(data);
			var categories = data;
			var ul_categories = $('ul');
				for(i = 0; i < categories.length; i++){
				ul_categories.append('<li>' +categories[i]["name"]+ '</li>');	
				}
	});





///////end//////		
});