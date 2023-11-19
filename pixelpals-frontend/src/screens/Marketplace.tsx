import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { get_listings } from '../web3/get_listings_covalant';
import { useAccount } from 'wagmi';
import { img_uri } from '../web3/constants/img_url';
import { useFocusEffect } from '@react-navigation/native';

const get_nft_rarity = (token_id) => {
  if (token_id >= 0 && token_id < 10) {
    return "Ultra-Rare";
  }
  else if (token_id >= 10 && token_id < 60) {
    return "Rare";
  }
  else {
    return "Common";
  }
}

const NFTComponent = ({ name, rarity, imageUrl, tokenID, price, navigation }) => {

  return (
    <View style={styles.nftContainer}>
      <Image source={{ uri: imageUrl }} style={styles.nftImage} />
      <Text style={styles.nftName}>{name}</Text>
      <Text style={styles.nftRarity}>{rarity}</Text>
      <TouchableOpacity style={styles.marketplaceButton} onPress={() => navigation.navigate("PayForNFT", { name: name, rarity: rarity, imageUrl: imageUrl, tokenID: tokenID, price: price })}>
        <Text style={styles.buttonText}>Buy for {price} USDT</Text>
      </TouchableOpacity>
    </View>
  );
};

const Marketplace = ({ navigation }) => {
  const { address } = useAccount();
  const [nftData, setNftData] = useState([]);
  useEffect(() => {
    const get_data = async () => {
      const data = await get_listings();
      setNftData(data)
    }
    get_data();
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      const get_data = async () => {
        const data = await get_listings();
        setNftData(data)
      }

      get_data();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Marketplace</Text>
          <Text style={styles.subtitle}>This is a public marketplace for users to buy and sell their
            PixelPals</Text>
        </View>
      </View>
      {!nftData || nftData.length === 0 && <ActivityIndicator />}
      <FlatList
        data={nftData}
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{ height: 100 }}
        renderItem={({ item }) => (
          <NFTComponent
            navigation={navigation}
            name={`Pixel#${item.id}`}
            rarity={get_nft_rarity(item.id)}
            imageUrl={img_uri[item.id - 1]}
            price={item.sale_price}
            tokenID={item.id}
          />
        )}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.nftList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8ffde',
  },
  header: {
    fontFamily: "PixelifySans",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontFamily: "PixelifySans",
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontFamily: "PixelifySans",
    paddingTop: 5,
    fontSize: 16,
    color: 'gray',
  },
  addButton: {
    backgroundColor: '#C6FF00',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    fontFamily: "PixelifySans",
    color: 'white',
    fontSize: 16,
  },
  nftList: {
    paddingHorizontal: 10,
  },
  nftContainer: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 2,
    maxWidth: "48%",
  },
  nftImage: {
    width: '100%',
    height: 150,
    borderRadius: 5,
    marginBottom: 10,
  },
  nftName: {
    fontWeight: 'bold',
    fontFamily: "PixelifySans",
    fontSize: 16,
  },
  nftRarity: {
    fontSize: 14,
    fontFamily: "PixelifySans",
    color: 'gray',
    marginBottom: 10,
  },
  marketplaceButton: {
    backgroundColor: '#C6FF00',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: "PixelifySans",
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Marketplace;
