const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/VotingFactory.json");
const mnemonicPhrase = 'risk wild smooth crack equal top picture tennis begin mutual come patient';
const network = 'HTTP://127.0.0.1:7545';

const provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase
  },
  providerOrUrl: network
});

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: "0x" + compiledFactory.evm.bytecode.object })
    .send({ from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};

deploy();