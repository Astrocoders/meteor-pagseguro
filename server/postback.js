Meteor.startup(function() {
  Router.route(
    PagSeguro.config.cbUrls.successfulPurchase,
    PagSeguro.config._notificationHandler,
    {where: 'server'},
  );
});
