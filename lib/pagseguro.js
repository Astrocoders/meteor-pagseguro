PagSeguro = {
  _settings: {
    currency: 'BRL',
    charset: 'UTF-8',
  },

  settings: settings => {
    PagSeguro._settings = {
      ...PagSeguro._settings,
      ...settings,
    };
  },
};
