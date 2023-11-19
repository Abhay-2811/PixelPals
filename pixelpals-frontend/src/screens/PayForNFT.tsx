import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import NFTDisplayComponent from '../components/NFTDisplayComponent';
import {writeContract, getPublicClient} from '@wagmi/core'
import { abis, ca } from '../web3/constants/contants';

const PayForNFT = ({ route, navigation }) => {
  const [selectedChain, setSelectedChain] = useState('Polygon');
  const { name, rarity, imageUrl, tokenID, price } = route.params;

  // Placeholder for payment logic
  const handlePayment = async() => {
    // Implement payment logic here
    switch (selectedChain) {
      case "Polygon":
        const publicClient1 = getPublicClient({ chainId: 80001 });
        const {hash1} = await writeContract({
          address: ca.ccip_sender_matic,
          abi: abis.ccip_sender,
          functionName: 'transferTokens',
          args: [tokenID, price],
          chainId: 80001
        })
        await publicClient1.waitForTransactionReceipt({hash:hash1});
        break;
      case "Avalance":
        const publicClient2 = getPublicClient({ chainId: 43113 });
        const {hash2} = await writeContract({
          address: ca.ccip_sender_avax,
          abi: abis.ccip_sender,
          functionName: 'transferTokens',
          args: [tokenID, price],
          chainId: 43113
        })
        await publicClient2.waitForTransactionReceipt({hash:hash2});
        break;
      case "Arbitrum":
        const publicClient3 = getPublicClient({ chainId: 421613 });
        const {hash3} = await writeContract({
          address: ca.ccip_sender_arb,
          abi: abis.ccip_sender,
          functionName: 'transferTokens',
          args: [tokenID, price],
          chainId: 421613
        })
        await publicClient3.waitForTransactionReceipt({hash:hash3});
        break;
      case "Optimism":
        const publicClient4 = getPublicClient({ chainId: 420 });
        const {hash4} = await writeContract({
          address: ca.ccip_sender_op,
          abi: abis.ccip_sender,
          functionName: 'transferTokens',
          args: [tokenID, price],
          chainId:420
        })
        await publicClient4.waitForTransactionReceipt({hash:hash4});
        break;
    
      default:
        break;
    }
   
    console.log(`Paying ${price} USDT on ${selectedChain} chain for tokenID: ${tokenID}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Purchase PixelPal</Text>
      <Text style={styles.subtitle}>
        You can choose which chain you want to pay on. If you don’t have any USDT, you can grab some easily on your profile page.
      </Text>

      <NFTDisplayComponent name={name} rarity={rarity} imageUrl={imageUrl} />

      {/* Chain Selection Dropdown */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Select Chain</Text>
        <Picker
          selectedValue={selectedChain}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedChain(itemValue)}>
          <Picker.Item label="Polygon" value="Polygon" />
          <Picker.Item label="AVAX Fuji" value="Avalance" />
          <Picker.Item label="Arbitrum" value="Arbitrum" />
          <Picker.Item label="Optimism" value="Optimism" />
        </Picker>
      </View>

      {/* Purchase Button */}
      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Purchase for {price} USDT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8ffde',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: "PixelifySans",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily: "PixelifySans",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: "PixelifySans",
  },
  picker: {
    borderWidth: 1,
    borderColor: 'gray',
    fontFamily: "PixelifySans",
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#C6FF00',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'black',
    fontFamily: "PixelifySans",
    fontSize: 16,
  },
});

export default PayForNFT;
