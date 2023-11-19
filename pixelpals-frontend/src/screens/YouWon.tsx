import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { wallet_client } from '../web3/wagmi_client';
import { abis, ca } from '../web3/constants/contants';
import { useAccount, usePublicClient } from 'wagmi';

const YouWonScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const { imageURL, tokenID } = route.params;
  const { address } = useAccount();
  const public_client = usePublicClient({ chainId: 84531 })

  const mint_nft = async () => {
    if (!address) {
      return
    }
    setLoading(true);

    try {
      const hash = await wallet_client.writeContract({
        address: ca.pixels,
        abi: abis.pixels,
        functionName: 'mintNFT',
        args: [tokenID, address]
      })
      await public_client.waitForTransactionReceipt({ hash: hash });
      navigation.navigate("Profile");
      setLoading(false);
    } catch (e) {
      navigation.navigate("Explore");
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.feedbackText}>You captued a PixelPal!</Text>

      {/* Display the NFT Image - replace with actual image URL */}
      <Image source={{ uri: imageURL }} style={styles.nftImage} />
      {
        loading ? <ActivityIndicator /> : (
          <TouchableOpacity style={styles.claimButton} onPress={() => mint_nft()}>
            <Text style={styles.buttonText}>Claim Your PixelPal</Text>
          </TouchableOpacity>
        )
      }
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
    color: 'green',
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
    backgroundColor: 'white',
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

export default YouWonScreen;
