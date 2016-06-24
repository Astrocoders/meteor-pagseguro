PagSeguro = (settings) => {
  PagSeguro.settings(settings);

  return new PagSeguro.API(PagSeguro._settings);
}

// Used by API instances
PagSeguro.settings = (settings) => {
  if (!PagSeguro._settings) {
    PagSeguro._settings = _.extend({
      currency: 'BRL',
      charset: 'UTF-8'
    }, settings);
  }	else {
    PagSeguro._settings = _.extend(PagSeguro._settings, settings);
  }
}
