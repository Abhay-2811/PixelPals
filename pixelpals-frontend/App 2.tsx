// import '@walletconnect/react-native-compat';
// import { WagmiConfig } from 'wagmi'
// import { mainnet, polygon, arbitrum } from 'viem/chains'
// import { createWeb3Modal, defaultWagmiConfig, Web3Modal } from '@web3modal/wagmi-react-native'

// // 1. Get projectId
// const projectId = 'bebf01c8b9bb3c00967b5841bbe3300f'

// // 2. Create config
// const metadata = {
//   name: 'Web3Modal RN',
//   description: 'Web3Modal RN Example',
//   url: 'https://web3modal.com',
//   icons: ['https://avatars.githubusercontent.com/u/37784886'],
//   redirect: {
//     native: 'YOUR_APP_SCHEME://',
//     universal: 'YOUR_APP_UNIVERSAL_LINK.com'
//   }
// }

// const chains = [mainnet];

// const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// // 3. Create modal
// createWeb3Modal({
//   projectId,
//   chains,
//   wagmiConfig
// })

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Wallet from './screens/Wallet';
import ProfileScreen from './screens/ProfileScreen';
import Marketplace from './screens/Marketplace';
import ListOnMarketplace from './screens/ListOnMarketplace';
// ... import other screens

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Welcome" component={Wallet} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Marketplace" component={Marketplace} />
      {/* ... other tab screens */}
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={MyTabs} options={{ headerShown: false }} />
        <Stack.Screen name="ListOnMarketPlace" component={ListOnMarketplace} options={{ title: "", headerBackTitle: "Profile" }} />
        {/* ... other non-tab screens */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
