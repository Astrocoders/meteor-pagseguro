Package.describe({
  name: 'astrocoders:pagseguro',
  version: '0.0.1',
  summary: 'PagSeguro API for Meteor',
  git: 'https://github.com/Astrocoders/meteor-pagseguro',
  documentation: 'README.md'
});

Npm.depends({
  'body-parser': '1.15.2',
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use([
    'ecmascript',
    'erasaur:meteor-lodash@3.10.1_1',
    'mongo',
    'peerlibrary:xml2js@0.4.8_1',
    'http',
    'random',
  ]);
  
  api.use([
    'meteorhacks:picker@1.0.3',
  ], 'server');

  api.addFiles('client/pagseguro.js', 'client');

  api.addFiles('lib/pagseguro.js', 'server');
  api.addFiles([
    'server/config.js',
    'server/pagseguro-utils.js',
    'server/postback.js',
    'server/checkout.js',
  ], 'server');

  api.export('PagSeguro', 'server');
  api.export('PagSeguroUtils', 'server');
});

Package.onTest(function(api) {
  
});
