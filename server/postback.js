Meteor.startup(function(){
  Router.route(PagSeguro.config.cbUrls.successfulPurchase, function(){
    let data = this.request.body;

    console.log('[PagSeguro]', 'Recieving a postback');
    console.log('[PagSeguro]', 'And this is the request body', data);
    
    if(data){
      let response = HTTP.get(PagSeguro.config.API_NOTIFICATION_URL + data.notificationCode, {
        params: {
          email: PagSeguro._settings.email,
          token: PagSeguro._settings.token
        }
      });
      
      console.log(response);
      
      if (response.statusCode === 200) {
        let transactionStatus = xml2js.parseStringSync(response.content).transaction.status;

        console.log(transactionStatus);
      } else {
        throw new Meteor.Error(400, response.error);
      }
    }

    this.response.end();
  }, {where: 'server'});
});
