const { WETH, Token } = require("@sushiswap/sdk");

module.exports = async function ({
  ethers: { getNamedSigner },
  getNamedAccounts,
  deployments,
}) {
  const { deploy } = deployments;

  const { deployer, dev } = await getNamedAccounts();

  const chainId = await getChainId();

  const FACTORY_ADDRESS = (await ethers.getContract("UniswapV2Factory")).address;
  const bar = await ethers.getContract("SushiBar");
  const POW_ADDRESS = "0x02Cc78362D8124A17d3F884Dbd7476c4ec534Cdb";

  let wethAddress;

  if (chainId === "31337") {
    wethAddress = (await deployments.get("WETH9Mock")).address;
  } else if (chainId === "10001") {
    wethAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  } else if (chainId in WETH) {
    wethAddress = WETH[chainId].address;
  } else {
    throw Error("No WETH!");
  }

  await deploy("SushiMaker", {
    from: deployer,
    args: [FACTORY_ADDRESS, bar.address, POW_ADDRESS, wethAddress],
    log: true,
    deterministicDeployment: false,
  });

  const maker = await ethers.getContract("SushiMaker");
  if ((await maker.owner()) !== dev) {
    console.log("Setting maker owner");
    await (await maker.transferOwnership(dev, true, false)).wait();
  }
};

module.exports.tags = ["SushiMaker"];
module.exports.dependencies = ["SushiBar", "UniswapV2Factory", "UniswapV2Router02"];
