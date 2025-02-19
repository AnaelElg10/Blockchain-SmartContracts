require("@nomicfoundation/hardhat-toolbox");

const file_system = require("fs");
const privateKey = file_system.readFileSync("secrets.txt").toString();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: 'localhost',
  networks: {
    hardhat: {
      chainId: 4202
    },
    BitTorrent: {
      url: 'https://pre-rpc.bt.io',
      accounts: [privateKey],
      gasPrice: 10000000000
    },

  },

  solidity: "0.8.28",
  allowUnlimitedContractSize: true,
  throwOnTransactionFailures: true,
  throwOnCallFailures: true,
  loggingEnabled: true,
};

// 0x2c599300d403da9148Ad2d4525c48706267a94f9