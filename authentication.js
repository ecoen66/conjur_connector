module.exports = {
	label: "Connect to CCO Lookup",
	mock_input: {
        conjurBaseUrl: "https://conjur.somewhere.com",
        conjurAccount: "account",
        secretsLocker: "sales/myapp/subfolder",
        secretsKey: 'webapp_api_key',
           },
    input: {
        type: "object",
        properties: {
            conjurBaseUrl: {
                title: "conjurBaseUrl",
                displayTitle: "Conjur Base URL",
                description: "Conjur base URL for your company",
                type: "string",
                minLength: 10,
                propertyOrder: 1
            },
            conjurAccount: {
                title: "conjurAccount",
                displayTitle: "Conjur Secrets Account",
                description: "Conjur account for for API use",
                type: "string",
                minLength: 3,
                propertyOrder: 2
            },
            secretsLocker: {
                title: "secretsLocker",
                displayTitle: "Conjur Secrets Locker",
                description: "Conjur specific locker for your secrets",
                type: "string",
                minLength: 10,
                propertyOrder: 3
            },
            secretsKey: {
                title: "secretsKey",
                displayTitle: "Secrets Key",
                description: "Conjur webapp API Key",
                type: "string",
                minLength: 40,
                propertyOrder: 4
            }
        }
    },
	validate: async function (input, output) {

		// auth data will be available in input.auth
		// var orgUrl = input.auth.orgUrl
		// var clientId = input.auth.clientId
		// var conjurBaseUrl = input.auth.conjurBaseUrl
		// var secretsAccount = input.auth.secretsAccount
		// var secretsLocker = input.auth.secretsLocker
		// var secretsKey = input.auth.secretsKey
		// for sending success use standard node callback
		// output(null, "Success")
        output(null, true);

		// output("Invalid Connection", null);
	}
}