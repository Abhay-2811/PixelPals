import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const NFTDisplayComponent = ({ name = "Loading...", rarity = "Loading...", imageUrl = "https://placehold.it/100x100" }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.rarity}>{rarity}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  rarity: {
    fontSize: 14,
    color: 'gray',
  },
});

export default NFTDisplayComponent;