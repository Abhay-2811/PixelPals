import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import { getRouterConfig } from "./utils";
import { LINK_ADDRESSES } from "./constants";


task(`deploy-pixel-contract`, `Deploys pixels.sol smart contract`)
    .addOptionalParam(`router`, `The address of the Router contract on the destination i.e base`)
    .setAction(async (taskArguments: TaskArguments, hre: HardhatRuntimeEnvironment) => {
        const routerAddress = taskArguments.router ? taskArguments.router : getRouterConfig(hre.network.name).address;
        const linkAddress = taskArguments.link ? taskArguments.link : LINK_ADDRESSES[hre.network.name]


        console.log(`ℹ️  Attempting to deploy Pixel smart contract on the ${hre.network.name} blockchain with the Router address ${routerAddress}`);

        const pixels = await hre.viem.deployContract("Pixels_contract",[routerAddress]);
        
        console.log(`✅ Pixel contract deployed at address ${pixels.address} and NFT at ${await pixels.read.nft_address()} on the ${hre.network.name} blockchain`);
    })