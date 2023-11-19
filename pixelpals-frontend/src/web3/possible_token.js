export const possible_Tokens = async()=>{
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
                      value: '0xd4997d8c2ddf898f69d90c2d5b7d4566039b90a2',
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
      console.log(data.result);
      const arr = data.result.rows;
      let res_ids = [];
      for (let index = 0; index < arr.length; index++) {
          const element = arr[index].tokens;
          res_ids.push(Number(element));
      }

      let allPossible = Array.from({length:160},(v,k)=>k+1);
      console.log({ res_ids})
      allPossible = allPossible.filter( function( el ) {
        return !res_ids.includes( el );
      } );
      // res_ids.forEach((i) => allPossible[i] = null);
      console.log(allPossible);
      return allPossible;
}

