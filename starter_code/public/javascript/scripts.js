console.log("testing html page");


var ItemModel = Backbone.Model.extend({
	urlRoot: ''
});



var ItemView = Backbone.View.extend({
	tagName:"ul",
	this.template = _.template($('#template').html())

	events: {
		
	},

	initialize: function(){
		this.listenTo(this.model, 'change', this.render)
		this.listenTo(this.model, 'destroy', this.remove)
		this.template = _.template($('#template').html())
	},

	render:function(){
	   var myTemplate = this.template({item: this.model.attributes})
		
		this.$el.html(myTemplate);
	}
})

var ItemCollection = Backbone.Collection.extend({
	url: '/',
	model: MyModel
});

var ItemCollection = Backbone.Collection.extend({
	url: '/',
	model: MyModel
});