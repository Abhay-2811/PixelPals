import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { wallet_client } from '../web3/wagmi_client';
import { abis, ca } from '../web3/constants/contants'
import { readContract } from '@wagmi/core';
import { useAccount, usePublicClient } from 'wagmi';
import { useNavigation } from '@react-navigation/native';
import { possible_Tokens } from '../web3/possible_token';
import { is_member } from '../web3/check_ape_membership.js';

const MintFirstNFT = ({ navigation }) => {
  // const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();
  const public_client = usePublicClient({ chainId: 84531 })
  const mint_nft = async () => {
    if (!address) {
      return
    }
    setLoading(true);
    const is_BoredApe_DAO_member = is_member(address);
    const possible_tokens: Array<number> = await possible_Tokens();
    const tokenID = possible_tokens[Math.floor(Math.random() * (possible_tokens.length - 60 + 1)) + 60]

    try {
      const hash = await wallet_client.writeContract({
        address: ca.pixels,
        abi: abis.pixels,
        functionName: 'mintNFT',
        args: [tokenID, address]
      })

      await public_client.waitForTransactionReceipt({ hash: hash });
      navigation.navigate("Home");
      setLoading(false);
    } catch (e) {
      navigation.navigate("Explore");
      setLoading(false);
    }
  }
  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://media.tenor.com/lPo9OU7hx60AAAAC/lilnouns-lil-nouns-dao.gif" }} style={styles.nftImage} />
      <Text style={styles.feedbackText}>Your first PixelPal is on us.</Text>
      <Text style={styles.subtitle}>BAYC members receive a rare PixelPal</Text>
      {/* Display the NFT Image - replace with actual image URL */}
      {/* <Image source={{ uri: imageURL }} style={styles.nftImage} /> */}

      {loading ? <ActivityIndicator /> : (
        <TouchableOpacity style={styles.claimButton} onPress={() => mint_nft()}>
          <Text style={styles.buttonText}>Claim Your PixelPal</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8ffde',
  },
  feedbackText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    fontFamily: "PixelifySans",
    padding: 10,
    paddingTop: 0
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    fontFamily: "PixelifySans",
    marginBottom: 20,
    padding: 10,
    paddingTop: 0
  },
  nftImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 20,
  },
  claimButton: {
    alignItems: "center",
    borderColor: '#333',
    borderWidth: 2,
    backgroundColor: '#C6FF00',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#333',
    fontFamily: "PixelifySans",
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MintFirstNFT;
