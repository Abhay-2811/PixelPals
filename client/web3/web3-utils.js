import {contract_addresses} from '../../smart_contract/tasks/constants'
import {useContractRead, useAccount} from 'wagmi'
import { contract_data } from './constants/contract_data';

//entire function has to be called in react component
export const check_if_user_exists = async()=>{
    const {address} = useAccount();
    if(!address){
      console.error("User isn't connected")
    }
    const { data, isError, isLoading } = useContractRead({
        address: contract_data('My_NFT').ca,
        abi: contract_data('My_NFT').abi,
        functionName: 'balanceOf',
        args: [address],
        chainId: 84531,
        onError(err){
          console.error(err.message);
        }
      });
    
    if(data !== 0){
      return false
    }
    return true;
}

// B : 61->160 - 61-80 type B1, 81-100 type B2