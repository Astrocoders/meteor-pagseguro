Meteor.startup(function() {
  Router.route(
    PagSeguro.config.cbUrls.notifications,
    PagSeguro.config._notificationHandler,
    {where: 'server'},
  );
});
