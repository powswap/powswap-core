
module.exports = async function ({
  ethers: { getNamedSigner },
  getNamedAccounts,
  deployments,
}) {
  const { deploy } = deployments;

  const { deployer, dev } = await getNamedAccounts();

  const FACTORY_ADDRESS = (await ethers.getContract("UniswapV2Factory")).address;
  const bar = await ethers.getContract("SushiBar");
  const POW_ADDRESS = "0x02Cc78362D8124A17d3F884Dbd7476c4ec534Cdb";

  const wethAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

    /*
          address owner,
        address user,
        address factory,
        address weth,
        address _pow,
        address _sPow
        */

  await deploy("PowMaker", {
    from: deployer,
    args: [dev, dev, FACTORY_ADDRESS, wethAddress, POW_ADDRESS, bar.address],
    log: true,
    deterministicDeployment: false,
  });

};

module.exports.tags = ["PowMaker"];
module.exports.dependencies = ["SushiBar", "UniswapV2Factory", "UniswapV2Router02"];