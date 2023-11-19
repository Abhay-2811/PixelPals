import { getPublicClient } from "@wagmi/core";
export const is_member=async(address)=>{
    const public_client = getPublicClient({chainId: 1});
    const data = await public_client.readContract({
        address: `0x4d224452801ACEd8B2F0aebE155379bb5D594381`,
        functionName: 'balanceOf',
        args: [address]
    })
    if(data>0){
        return true
    }
    else{
        return false
    }
}

