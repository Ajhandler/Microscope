Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return Meteor.subscribe('posts'); }
});

Router.route('/', {name: 'postsList'});
Router.route('/posts/:_id', {
  name: 'postPage',
  data: function(){ return Posts.findOne(this.params._id)}
});

Router.route('/submit', {name:'postSubmit'})

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

// if no posts are found
Router.onBeforeAction('dataNotFound', {only: 'postPage'});
// if user is not logged in
Router.onBeforeAction(requireLogin,{only:'postSubmit'});
