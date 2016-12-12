Meteor.startup(function() {
  const bodyParser = Npm.require('body-parser');

  Picker.middleware( bodyParser.json() );
  Picker.middleware( bodyParser.urlencoded( { extended: false } ) );

  Picker.route(PagSeguro.config.cbUrls.notifications, function(params, req, res, next){
    console.log('[PagSeguro]', 'Receiving a postback');
    console.log('[PagSeguro]', 'And this is the request body', req.body);
    console.log('[PagSeguro]', 'And this is the whole request', req);

    const data = req.body;

    if (req.method === 'GET') {
      res.end('Aguarde um momento...');
      return;
    }

    if(!data) {
      res.end();
      return;
    }

    let response;
    try {
      response = HTTP.get(PagSeguro.config.API_NOTIFICATION_URL + data.notificationCode, {
        params: {
          email: PagSeguro._settings.email,
          token: PagSeguro._settings.token,
        },
      });
    } catch (e) {
      console.log('[PagSeguro] Postback error', e);
      res.end(`[PagSeguro] Postback error: ${e} `);
      return;
    }

    if (response.statusCode !== 200) {
      return;
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Something went wrong');
    }

    const { transaction } = xml2js.parseStringSync(response.content);
    PagSeguro.config._notificationHandler(transaction);

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('okay');
  });
});
