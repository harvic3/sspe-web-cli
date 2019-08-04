const config = {
  env: process.env || 'DEV',
  DEV_SERVICE: "http://localhost:3030",
  PROD_SERVICE: "sspe-project-api.vickodev.now.sh"
};

exports.config = config;