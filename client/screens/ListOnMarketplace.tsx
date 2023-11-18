import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import NFTDisplayComponent from '../components/NFTDisplayComponent';

const ListOnMarketplace = ({ nft }) => {
  const [listPrice, setListPrice] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List PixelPal on Market</Text>

      {/* NFT Display Component - Use actual NFT data */}
      <NFTDisplayComponent {...nft} />

      {/* Price Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>List Price in USDT</Text>
        <TextInput
          style={styles.input}
          value={listPrice}
          onChangeText={setListPrice}
          keyboardType="numeric"
          placeholder="Enter price"
        />
      </View>

      {/* Action Buttons */}
      <TouchableOpacity style={styles.button} onPress={() => {/* Listing logic */ }}>
        <Text style={styles.buttonText}>List on Market</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  nftContainer: {
    marginBottom: 20,
    // Add styles for your NFT component
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
  button: {
    backgroundColor: '#4e9af1',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ListOnMarketplace;
