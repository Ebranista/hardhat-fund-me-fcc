require("@nomicfoundation/hardhat-toolbox")

//require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
// require("@nomiclabs/hardhat-etherscan")
require("dotenv").config()
require("solidity-coverage")
require("hardhat-deploy")
require("@nomiclabs/hardhat-ethers")

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""
const SEPOLIA_RPC_URL =
    process.env.SEPOLIA_RPC_URL ||
    "https://eth-sepolia.g.alchemy.com/v2/h8Ec7SyOALkwmNGN3OaGR-4OVxhbEZAE"
const PRIVATE_KEY =
    process.env.PRIVATE_KEY ||
    "28216e51c8e4f6311889aa06764a16841d4790e60e6d99fae20e668c9e65d642"
const ETHERSCAN_API_KEY =
    process.env.ETHERSCAN_API_KEY || "R64JKX9APZ4A6AFR8AAGA619U71AYRH7C1"
console.log(`private key: ${process.env.PRIVATE_KEY}`)
console.log(`private key: ${process.env.SEPOLIA_RPC_URL}`)
console.log(`private key: ${process.env.ETHERSCAN_API_KEY}`)
console.log(`private key: ${process.env.COINMARKETCAP_API_KEY}`)

//const chainId = network.config.chainId

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        // hardhat: {
        //     chainId: 31337,
        //     allowUnlimitedContractSize: true,
        //     // gasPrice: 130000000000,
        // },
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 11155111,
            blockConfirmations: 6,
            allowUnlimitedContractSize: true,
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.8.8",
            },
            {
                version: "0.6.6",
            },
        ],
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
        customChains: [], // uncomment this line if you are getting a TypeError: customChains is not iterable
    },
    namedAccounts: {
        deployer: {
            default: 0,
            1: 0,
        },
        user: {
            default: 1,
        },
    },
    gasReporter: {
        enabled: true,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        coinmarketcap: COINMARKETCAP_API_KEY,
        token: "MATIC",
    },

    mocha: {
        timeout: 500000,
    },
}
