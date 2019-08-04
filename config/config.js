const config = {
  env: process.env || 'DEV',
  DEV_SERVICE: "http://localhost:3030",
  PROD_SERVICE: "https://sspe-project.vickodev.now.sh"
};

exports.config = config;