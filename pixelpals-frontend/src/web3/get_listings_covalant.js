import { getPublicClient } from "@wagmi/core";
import { abis, ca } from "./constants/contants";
export const get_listings = async ()=>{
    const public_client = getPublicClient({chainId: 84531});
    const query = new URLSearchParams({offset: '0', limit: '10'}).toString();
    const link = `https://wwf3tteys5dnfnctucw7rqjtya.multibaas.com/api/v0/queries?${query}`;
    const resp = await fetch(link,
    {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzAwMzU3NjU4LCJqdGkiOiIyOGQ5NDk3NS04NTdlLTRhODEtYjMxYS0wYTkwYWZhNzRiZTYifQ.ArqvCLl8wloEoVe1GqlpxmijCGigxMGPFjzFlSozHAk'
        },
        body: JSON.stringify({
            "order": "ASC",
            "events": [
            {
                "select": [
                {
                    "name": "owner",
                    "type": "input",
                    "alias": "owner",
                    "inputIndex": 0
                },
                {
                    "name": "token_id",
                    "type": "input",
                    "alias": "id",
                    "inputIndex": 1
                },
                {
                    "name": "triggered_at",
                    "type": "triggered_at",
                    "alias": "listing_time"
                },
                {
                    "name": "price_in_usdt",
                    "type": "input",
                    "alias": "sale_price",
                    "inputIndex": 2
                }
                ],
                "eventName": "listing_added(address,uint256,uint256)"
            }
            ],
            "orderBy": "listing_time"
        })
    }
    );

    const data = await resp.json();
    const arr = data.result.rows;
    let final_arr = arr.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i);
    for (let index = 0; index < final_arr.length; index++) {
        const tokenId = Number(final_arr[index].id);

       const data = await public_client.readContract({
            address: ca.pixels,
            abi: abis.pixels,
            functionName: 'listings',
            args: [tokenId]
                })
        if(data[2] == true){
            delete final_arr[index];
        }        
    }

    return final_arr.filter((e) => e);
}

// {
//     id: '5',
//     listing_time: '2023-11-18 17:22:10+00',
//     owner: '0x72d2f62a93305752cc57d48ea217ca687ea43dc0',
//     sale_price: '1000'
//   },