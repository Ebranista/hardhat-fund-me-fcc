//import
//main function
//calling of main function

// function deployFunc(hre){
// console.log("HI!")
// hre.getNamedAccounts()
// hre.deployments()
// }
// module.exports.default = deployFunc

// module.exports = async (hre) => {
//     const {getNamedAccounts, deployments} = hre
// }

//const networkConfig = helperConfig.networkConfig
// const helperConfig = require("../helper-hardhat-config")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { network } = require("hardhat")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]

    let ethUsdPriceFeedAddress
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        const ethUsdPriceFeed = networkConfig[chainId]["ethUsdPriceFeed"]
        ethUsdPriceFeedAddress = ethUsdPriceFeed
    }
    log(ethUsdPriceFeedAddress)
    const args = [ethUsdPriceFeedAddress]

    const FundMe = await deploy("FundMe", {
        from: deployer,
        args: args, //price feed address here
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(FundMe.address, args)
    } else {
    }
    log(
        "_____________________________________________last 01-deploy-fund-me.js____________________________________",
    )
}

module.exports.tags = ["all", "fundme"]
