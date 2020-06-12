const config = {
  env: process.env.ENV || 'DEV',
  DEV_SERVICE: "http://localhost:3030",
  PROD_SERVICE: "http://sspeapi.devspace.ml"
};

exports.config = config;