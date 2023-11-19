export const isNew = async(user_address)=>{
    const query = new URLSearchParams({offset: '0', limit: '10'}).toString();

    const hostname = 'wwf3tteys5dnfnctucw7rqjtya.multibaas.com';
    const resp = await fetch(
        `https://${hostname}/api/v0/queries?${query}`,
    {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzAwMzQ2MDgzLCJqdGkiOiJkMDcxMjk3Ni1jNmYzLTRjMjctOTE0ZC04YTE5YjdiOGU4YTcifQ._4Nwsl_9V-IE0goFH3m9BgvkoSJTcQB6fpjE-znaN0c'
        },
        body: JSON.stringify({
        events: [
            {
            filter: {
                rule: 'and',
                children: [
                {
                    value: `${user_address}`,
                    operator: 'Equal',
                    fieldType: 'input',
                    inputIndex: 0
                }
                ]
            },
            select: [
                {
                name: 'from',
                type: 'input',
                alias: '',
                inputIndex: 0
                },
                {
                name: 'to',
                type: 'input',
                alias: '',
                inputIndex: 1
                },
                {
                name: 'tokens',
                type: 'input',
                alias: '',
                inputIndex: 2
                }
            ],
            eventName: 'Transfer(address,address,uint256)'
            }
        ]
    })
  }
);

const data = await resp.json();
const arr = data.result.rows;
if(arr.length != 0){
    console.log(false);
    return false;
}
console.log(true);
return true;
}
