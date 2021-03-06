const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
const contractFileName = "VotingSystem.sol";

// Delete the current build folder.
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, "contracts", contractFileName);
const source = fs.readFileSync(campaignPath, "utf8");
 
const input = {
  language: 'Solidity',
  sources: {
    'VotingSystem.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};
input.sources[contractFileName] = {
  content: source,
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
const contracts = output.contracts[contractFileName];

// Create the build folder.
fs.ensureDirSync(buildPath);

// Extract and write the JSON representations of the contracts to the build folder.
for (let contract in contracts) {
  if (contracts.hasOwnProperty(contract)) {
    fs.outputJsonSync(path.resolve(buildPath, `${contract}.json`), contracts[contract]);
  }
}