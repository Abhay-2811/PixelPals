import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { WebView } from 'react-native-webview';

const BuyCrypto = ({ navigation, route }) => {

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        style={{ minWidth: "100%", minHeight: "100%" }}
        source={{ uri: 'https://onramp-sandbox.gatefi.com/' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8ffde',
  },
  feedbackText: {
    fontFamily: "PixelifySans",
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
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

export default BuyCrypto;
