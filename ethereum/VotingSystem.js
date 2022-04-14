import web3 from "./web3";
const compiledCampaign = require("./build/VotingSystem.json");

const instance = (address) => {
  return new web3.eth.Contract(
    JSON.parse(JSON.stringify(compiledCampaign.abi)),
    address
  );
};

export default instance
