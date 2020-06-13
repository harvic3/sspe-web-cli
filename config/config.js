const environment = process.env.NODE_ENV || 'development'; 

const config = {
  env: environment,
  api_service: environment == "development" || !process.env.API_SERVICE 
    ? "http://localhost:7500" 
    : process.env.API_SERVICE,
};

exports.config = config;