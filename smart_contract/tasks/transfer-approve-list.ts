import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import { getRouterConfig } from "./utils";
import { contract_addresses } from "./constants";

task(`transfer-approve-list`,"Transfer NFT to user mocking battle win, approve contract and list on marketplace")
    .setAction(async (taskArguments: TaskArguments, hre: HardhatRuntimeEnvironment) => {
        // const 
    })