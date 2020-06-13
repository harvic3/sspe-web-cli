const config = {
  env: process.env.NODE_ENV || 'development',
  DEV_SERVICE: "http://localhost:3030",
  PROD_SERVICE: "https://sspeapi.devspace.ml"
};

exports.config = config;