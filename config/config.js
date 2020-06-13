const environment = !process.env.NODE_ENV ? 'production' : process.env.NODE_ENV;
console.log("env: ", environment);
console.log("service: ", process.env.API_SERVICE);

const settings = {
  env: environment,
  api_service: environment == "development" || !process.env.API_SERVICE 
    ? "http://localhost:7500" 
    : process.env.API_SERVICE,
};

exports.config = settings;