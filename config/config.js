const environment = !process.env.NODE_ENV ? 'production' : process.env.NODE_ENV;
console.log("env: ", environment);
console.log("service: ", process.env.API_SERVICE);

const settings = {
  env: environment,
  api_service: environment == "development" 
    ? "http://localhost:7500" 
    : "https://sspeapi.devspace.ml",
};

console.log("env: ", settings.env);
console.log("service: ", settings.api_service);

exports.config = settings;