import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import { getRouterConfig } from "./utils";
import { LINK_ADDRESSES, contract_addresses } from "./constants";

task(`deploy-source-ccip-contract`, `Deploys ccip_source.sol smart contract`)
    .addOptionalParam(`router`, `The address of the Router contract on the destination i.e base`)
    .setAction(async (taskArguments: TaskArguments, hre: HardhatRuntimeEnvironment) => {
        const routerAddress = taskArguments.router ? taskArguments.router : getRouterConfig(hre.network.name).address;
        const linkAddress = taskArguments.link ? taskArguments.link : LINK_ADDRESSES[hre.network.name]
        const pixels_add = contract_addresses[`Pixels_contract`];

        console.log(`ℹ️  Attempting to deploy CCIPTokenSender smart contract on the ${hre.network.name} blockchain with the Router address ${routerAddress}, Pixels address ${pixels_add} and LINK address ${linkAddress} provided as constructor arguments`);

        const ccip_sender = await hre.viem.deployContract("CCIPTokenSender",[routerAddress, linkAddress, pixels_add]);
        
        console.log(`✅ Pixel contract deployed at address ${ccip_sender.address} on the ${hre.network.name} blockchain`);
    })