module.exports = function() {
  switch (process.env.NODE_ENV) {
    case 'development':
      return require('./development.json');
    case 'staging':
      return require('./staging.json');
    case 'production':
      return require('./production.json');
    default:
      return require('./local.json');
  }
};
