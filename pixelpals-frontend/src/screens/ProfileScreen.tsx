import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi-react-native';
import { useFocusEffect } from '@react-navigation/native';

const get_nft_data = async (user_add) => {
  const options = { method: 'GET', headers: { accept: 'application/json' } };

  await fetch(`https://base-goerli.g.alchemy.com/nft/v3/AUZvnXkKIjSqOHnc1GfSwHUM-43pGIm1/getNFTsForOwner?owner=${user_add}&contractAddresses[]=0x1268dAf5764992Fa620c6B70f0FEfF5FEc79dbc5&withMetadata=true&pageSize=100`, options)
    .then(response => response.json())
    .then(response => {
      console.log(response.ownedNfts);
      return response.ownedNfts;
    })
    .catch(err => console.error(err));

}

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

const NFTComponent = ({ name, rarity, imageUrl, tokenID, navigation }) => {
  return (
    <View style={styles.nftContainer}>
      <Image source={{ uri: imageUrl }} style={styles.nftImage} />
      <Text style={styles.nftName}>{name}</Text>
      <Text style={styles.nftRarity}>Rarity: {rarity}</Text>
      <TouchableOpacity style={styles.marketplaceButton} onPress={() => navigation.navigate("ListOnMarketPlace", { name: name, rarity: rarity, imageUrl: imageUrl, tokenID: tokenID })}>
        <Text style={styles.buttonText}>List on Market</Text>
      </TouchableOpacity>
    </View>
  );
};

const ProfileScreen = ({ navigation }) => {
  const { address } = useAccount();
  const [nftData, setNftData] = useState(null);
  const { open } = useWeb3Modal();

  const fetch_data = async () => {
    const options = { method: 'GET', headers: { accept: 'application/json' } };
    await fetch(`https://base-goerli.g.alchemy.com/nft/v3/AUZvnXkKIjSqOHnc1GfSwHUM-43pGIm1/getNFTsForOwner?owner=${address}&contractAddresses[]=0x1268dAf5764992Fa620c6B70f0FEfF5FEc79dbc5&withMetadata=true&pageSize=100`, options)
      .then(response => response.json())
      .then(response => {
        setNftData(response.ownedNfts);
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    if (address) {
      fetch_data();
    }
  }, [address])


  useFocusEffect(
    React.useCallback(() => {
      fetch_data();
    }, [])
  );


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>My PixelPals</Text>
          {address ? <Text style={styles.subtitle}>{address.slice(0, 4) + '...' + address.slice(-4, -1)}</Text> : <></>}
        </View>
        <View style={{}}>
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("BuyCrypto")}>
            <Text style={styles.addButtonText}>Buy USDT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText} onPress={() => open()}>Disconnect</Text>
          </TouchableOpacity>
        </View>
      </View>
      {nftData && <FlatList
        data={nftData}
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{ height: 100 }}
        renderItem={({ item }) => (
          <NFTComponent
            navigation={navigation}
            name={item.name}
            rarity={get_nft_rarity(item.tokenId)}
            tokenID={item.tokenId}
            imageUrl={item.image.cachedUrl} />
        )}
        keyExtractor={item => item.tokenId}
        numColumns={2}
        contentContainerStyle={styles.nftList}
      />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8ffde',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    fontFamily: "PixelifySans",
    marginBottom: 10
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: "PixelifySans",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "PixelifySans",
    color: 'gray',
  },
  addButton: {
    backgroundColor: '#C6FF00',
    padding: 10,
    borderRadius: 5,
    marginBottom: 6,
    alignItems: "center"
  },
  addButtonText: {
    color: 'black',
    fontFamily: "PixelifySans",
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
    maxWidth: "48%",
    borderWidth: 2
  },
  nftImage: {
    width: '100%',
    height: 150,
    borderRadius: 5,
    marginBottom: 10,
  },
  nftName: {
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: "PixelifySans",
  },
  nftRarity: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
    fontFamily: "PixelifySans",
  },
  marketplaceButton: {
    backgroundColor: '#C6FF00',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontFamily: "PixelifySans",
    textAlign: 'center',
  },
});

export default ProfileScreen;
