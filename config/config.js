const environment = "production";
const remoteService = environment == "production" ? "https://sspeapi.devspace.ml" : "http://localhost:7500";
console.log("environment: ", environment);

const settings = {
  env: environment,
  api_service: remoteService,
  remoteService: remoteService,
  apikey: '-remote-sspe-cli-web-',
};

exports.config = settings;