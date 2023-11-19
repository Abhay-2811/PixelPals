import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useWeb3Modal } from '@web3modal/wagmi-react-native';
import { useAccount, useDisconnect } from 'wagmi';
import { readContract } from '@wagmi/core'
import { abis, ca } from '../web3/constants/contants'

const Wallet = ({ navigation }) => {
  const { open } = useWeb3Modal();
  const { address } = useAccount()

  return (
    <View style={styles.container}>
      {
        address ? (
          <>
            <Text style={styles.title}>Hey there!</Text>
            <Text style={styles.subtitle}>{address}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => { open() }}>
              <Text style={styles.buttonText}>Disconnect</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.title}>Welcome to PixelPals</Text>
            <Text style={styles.subtitle}>Your Adventure Awaits</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => { open() }}>
              <Text style={styles.buttonText}>Connect your Wallet</Text>
            </TouchableOpacity>
          </>

        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8ffde',
  },
  title: {
    fontSize: 32,
    fontFamily: "PixelifySans",
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: "PixelifySans",
    padding: 20,
    paddingTop: 0,
    textAlign: "center",
    fontSize: 20,
    color: 'gray',
  },
  button: {
    backgroundColor: '#C6FF00',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontFamily: "PixelifySans",
    fontSize: 18,
  },
});

export default Wallet;
