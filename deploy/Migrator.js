
module.exports = async function ({
  getNamedAccounts,
  getChainId,
  deployments,
}) {
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const MASTERCHEF_ADDRESS = "0xb5B6B46EE6f6c93c41123F8edFD3F9506Fef6bf8"
  const OLD_UNISWAP_FACTORY = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"
  const POW_FACTORY = (await ethers.getContract("UniswapV2Factory")).address;

  const NOT_BEFORE_BLOCK = 0


  /*
          address _chef,
        address _oldFactory,
        IUniswapV2Factory _factory,
        uint256 _notBeforeBlock
        */


  await deploy("Migrator", {
    from: deployer,
    args: [MASTERCHEF_ADDRESS, OLD_UNISWAP_FACTORY, POW_FACTORY, NOT_BEFORE_BLOCK],
    log: true,
    deterministicDeployment: false,
  });
};

module.exports.tags = ["Migrator"];
module.exports.dependencies = ["UniswapV2Factory", "UniswapV2Router02"];