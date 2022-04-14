import web3 from "./web3";
const compiledFactory = require("./build/VotingFactory.json");
// console.log(JSON.stringify(compiledFactory.abi));
const instance = new web3.eth.Contract(JSON.parse(JSON.stringify(compiledFactory.abi)),'0x06Ccd3B4BB9a8587323c2f20035210643EFF0004')
export default instance;
