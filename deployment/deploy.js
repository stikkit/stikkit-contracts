require('dotenv').config()
const etherlime = require('etherlime-lib');
const Badge = require('../build/Badge.json');


const deploy = async (network, secret, etherscanApiKey) => {
	const defaultConfigs = {
		gasPrice: 20000000000,
		gasLimit: 4700000
	}
	const deployer = new etherlime.InfuraPrivateKeyDeployer(
		process.env.DEPLOYER_PRIVATE_KEY,
		process.env.INFURA_NETWORK,
		process.env.INFURA_API_KEY,
		defaultConfigs
	);
	deployer.setVerifierApiKey(process.env.ETHERSCAN_API_KEY)
	const result = await deployer.deployAndVerify(Badge);
	const init = await result.initialize();
};

module.exports = {
	deploy
};
