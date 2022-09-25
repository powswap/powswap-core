module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  //const sushi = await deployments.get("SushiToken")
  const POW_ADDRESS = await deploy("SushiBar", {
    from: deployer,
    args: ["0x02Cc78362D8124A17d3F884Dbd7476c4ec534Cdb"],
    log: true,
    deterministicDeployment: false,
  });
};

module.exports.tags = ["SushiBar", "UniswapV2Factory", "UniswapV2Router02"];
