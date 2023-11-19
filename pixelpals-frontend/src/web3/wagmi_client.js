import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts' 
import { baseGoerli } from 'viem/chains'

const private_key = process.env.EXPO_PUBLIC_PRIVATE_KEY;
const account = privateKeyToAccount(private_key);

export const wallet_client = createWalletClient({ 
    account,
    chain: baseGoerli,
    transport: http()
  });


