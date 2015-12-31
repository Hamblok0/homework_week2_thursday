// Router

var contactsRouter = Backbone.Router.extend({
  routes: {
    '' : 'contactform',
    'contacts' : 'contacts'
  },

  contactform: function() {
    var view = new formView();
    $('.mainBody').html(view.render().$el);
  }

});

// Collections and models


var contact = Backbone.Model.extend({
  url: 'https://tiny-starburst.herokuapp.com/collections/broj'
});

var contacts = Backbone.Collection.extend({
  model: contact,
  url: 'https://tiny-starburst.herokuapp.com/collections/broj'
});

// Forms

var formView = Backbone.View.extend({
  tagName: 'form',
  className: 'inputView',
  template: _.template($('#formTemplate').html()),
  events: {
    'click .submitBtn' : 'sendContacts'
  },

   sendContacts: function(){
     var email = $('.emailInput').val();
     var name = $('.nameInput').val();
     var phone = $('.phoneInput').val();
     var twitter = $('.twitInput').val();

     if (email.trim() === '' || name.trim() === '' || phone.trim() === '' || twitter.trim() === '') {
       alert("Please complete form before submitting");
     } else {
       var createContact = new contacts();
       createContact.create({
         'email': email,
         'name': name,
         'phone': phone,
         'twitter': twitter
       })

       email.val('');
       name.val('');
       phone.val('');
       twitter.val('');

       alert("New contact submitted");
     }

   },

   render: function(){
     this.$el.html(this.template());
     return this
   }
});

var router = new contactsRouter();
Backbone.history.start();
