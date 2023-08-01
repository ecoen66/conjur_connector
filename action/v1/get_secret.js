module.exports = {

  name: "get_secret",

  title: "Get Secret",

  description: "",
  version: "v1",

  input:{
    title: "Get Secret",
    type: "object",
    properties: {
      "secretsVariable": {
        title: "Secrets variable",// displayed as field label  
        type: "string",
        description:"Secret to get",// description of field
        minLength: 1 // define as reqiured

      }

    }
  },

  output: {
    title: "output",
  	type: "object",
  	properties: {

    }
  },

  mock_input:{
    secretsVariable: 'itsasecret'
  },

  execute: async function(input,output){
    const Conjur = require("conjur");
    var temporary = input.auth.secretsLocker.split("/");
    var secretSubLocker = temporary[temporary.length - 1];

    getConjurToken().then(conjurToken => {
      getSecretData(conjurToken).then(secretData => {
        if (secretData.length === 0) {
          output(null, {})  
        } else {
          output(null, { secretData: secretData, secretSubLocker: secretSubLocker });
        }
      }).catch(error2 => {
        output(error2);
      })
    }).catch(error1 => {
      output(error1);
    })

  async function getConjurToken() {
    return new Promise( async (resolve, reject) => {
      var defaultClient = Conjur.ApiClient.instance;
      let conjurAuth = defaultClient.authentications['conjurAuth'];
      conjurAuth.apiKey = input.auth.secretsKey;
      defaultClient.basePath = input.auth.conjurBaseUrl;

      let apiInstance = await new Conjur.AuthenticationApi();
        apiInstance.getAccessToken(input.auth.conjurAccount, "host/" + input.auth.secretsLocker + "/webapp", input.auth.secretsKey, {'acceptEncoding': 'base64'}, (error, requestedToken, response) => {
          if (error) {
            reject(error);
          } else if (response.statusCode !== 200) {
            reject(new Error('Error HTTP ${response.statusCode}'));
          }
          else {
            resolve(requestedToken);
          };
        });
    });
  }
  
  async function getSecretData(aToken) {
    return new Promise((resolve, reject) => {
      var defaultClient = Conjur.ApiClient.instance;
      let conjurAuth = defaultClient.authentications['conjurAuth'];
      conjurAuth.apiKey = 'token="' + aToken + '"';
      conjurAuth.apiKeyPrefix = 'Token';
      defaultClient.basePath = input.auth.conjurBaseUrl;

      let apiInstance = new Conjur.SecretsApi();
      apiInstance.getSecret(input.auth.conjurAccount, "variable", input.auth.secretsLocker + "/" + input.secretsVariable, {}, (error, requestedSecretData, response) => {
        if (error) {
          reject(error);
        } else if (response.statusCode !== 200) {
          reject(new Error('Error HTTP ${response.statusCode}'));
        }
        else {
          resolve(requestedSecretData);
        };
      });
    });
  }
  }
}
