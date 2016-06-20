Package.describe({
  name: 'astrocoders:pagseguro',
  version: '0.0.1',
  summary: 'PagSeguro API for Meteor',
  git: 'https://github.com/Astrocoders/meteor-pagseguro',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use([
    'ecmascript',
    'underscore@1.0.3',
    'mongo@1.1.0',
    'frozeman:persistent-minimongo@0.1.4',
    'peerlibrary:xml2js@0.4.8_1',
    'iron:router@1.0.8',
    'http@1.1.0',
    'random'
  ]);

  api.addFiles('lib/pagseguro.js', ['client', 'server']);
  api.addFiles('server/pagseguro-utils.js', ['server']);
  api.addFiles('server/config.js', ['server']);

  api.addFiles('client/pagseguro.js', ['client']);

  api.export('PagSeguro', ['client', 'server']);
  api.export('PagSeguroUtils', ['client', 'server']);
  api.export('CartItems', ['server']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('gbit:faker@0.0.3');
  api.use('gbit:pagseguro');
  api.use('frozeman:persistent-minimongo');
  api.use('xolvio:http-interceptor@0.5.1');
  api.use('iron:router');
  api.use('random');
  
  api.addFiles('tests/_preps.js', ['client', 'server']);
  api.addFiles('tests/pagseguro-server.js', ['server']);
  api.addFiles('tests/pagseguro-client.js', ['client']);
});
