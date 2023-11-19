import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import HealthBar from '../components/HealthBar';

const BattleScreen = ({ navigation, route }) => {
  const [nftHealth, setNftHealth] = useState(100); // Assuming max health is 100
  const [movesLeft, setMovesLeft] = useState(4);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const timerRef = useRef(null);
  const {imageURL, tokenID} = route.params;

  // Attack move details
  const attackMoves = [
    { name: 'Smash', damage: 50, accuracy: 30 },
    { name: 'Strike', damage: 30, accuracy: 60 },
    { name: 'Jab', damage: 10, accuracy: 90 },
  ];

  useEffect(() => {
    setFeedbackMsg("WILD PIXELPAL APPEARED");

    timerRef.current = setTimeout(() => {
      setFeedbackMsg("");
    }, 1750)
  }, [])

  useEffect(() => {
    if (nftHealth <= 0 || movesLeft <= 0) {
      const outcomePage = nftHealth <= 0 ? 'YouWon' : 'YouLost';

      if (outcomePage === "YouWon")
        setFeedbackMsg("You Won!");
      if (outcomePage === "YouLost")
        setFeedbackMsg("You Lost");

      timerRef.current = setTimeout(() => {
        setFeedbackMsg("");
        navigation.navigate(outcomePage,{imageURL: imageURL, tokenID: tokenID});
      }, 1750)
    }
  }, [nftHealth, movesLeft])

  const performAttack = (move) => {
    if (movesLeft > 0) {
      const hitChance = Math.random() * 100;
      if (hitChance <= move.accuracy) {
        setNftHealth(prev => Math.max(prev - move.damage, 0));
        setFeedbackMsg(move.damage === 50 ? "CRITICAL HIT" : "SOLID MOVE");
      } else {
        setFeedbackMsg("YOU MISSED!");
      }

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        setFeedbackMsg("");
      }, 1750)
      setMovesLeft(prev => prev - 1);
    }
  };

  return (
    <View style={styles.container}>
      {
        feedbackMsg && (
          <Text style={[styles.feedbackText, { transform: [{ rotate: `${10}deg` }] }]}>{feedbackMsg}</Text>
        )
      }

      {/* NFT Image and Health Bar */}
      {/* Replace 'nftImageUrl' with actual NFT image URL */}
      <Image source={{ uri: imageURL }} style={styles.nftImage} />
      <HealthBar health={nftHealth} />

      {/* Moves Left Counter */}
      <MoveCounter movesLeft={movesLeft} />

      {/* Attack Moves */}
      <View style={styles.movesContainer}>
        {attackMoves.map(move => (
          <AttackButton key={move.name} move={move} onAttack={performAttack} />
        ))}
      </View>

    </View>
  );
};

const AttackButton = ({ move, onAttack }) => (
  <TouchableOpacity
    style={styles.attackButton}
    onPress={() => onAttack(move)}
  >
    <Text style={{ fontFamily: "PixelifySans", fontWeight: "bold" }}>{move.name}</Text>
  </TouchableOpacity>
);

const MoveCounter = ({ movesLeft }) => (
  <>
    {
      movesLeft === 1 && (
        <Text style={{ marginBottom: 10, fontWeight: "bold", fontFamily: "PixelifySans" }}>Just 1 Move Left</Text>
      )
    }
    {
      movesLeft > 1 && (
        <Text style={{ marginBottom: 10, fontWeight: "bold", fontFamily: "PixelifySans" }}>Moves Remaining: {movesLeft}</Text>
      )
    }
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8ffde', // Light blue background for a sky-like feel
  },
  title: {
    fontSize: 28,
    fontFamily: "PixelifySans",
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  nftImage: {
    width: 200,
    height: 200,
    borderRadius: 10, // Circular image
    borderWidth: 3,
    borderColor: 'black', // Matching the button color
    marginBottom: 20,
  },
  healthBar: {
    width: '80%',
    height: 20,
    borderColor: '#333',
    borderWidth: 2,
    borderRadius: 10, // Rounded corners
    marginBottom: 20,
    overflow: 'hidden', // Ensures the fill doesn't spill out
  },
  healthFill: {
    height: '100%',
    backgroundColor: 'red',
    borderRadius: 10, // Match the bar's border radius
  },
  movesContainer: {
    width: '100%',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  attackButton: {
    alignItems: "center",
    marginVertical: 5,
    borderColor: '#333',
    borderWidth: 2,
    backgroundColor: '#C6FF00', // Consistent blue theme
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 3, // Shadow effect for depth
  },
  buttonText: {
    color: '#fff',
    fontFamily: "PixelifySans",
    fontSize: 16,
    fontWeight: 'bold',
    width: "100%",
    textAlign: 'center',
  },
  feedbackText: {
    fontSize: 25,
    position: "absolute",
    zIndex: 10000,
    top: 150,
    fontFamily: "PixelifySans",
    backgroundColor: "white",
    padding: 20,
    fontWeight: 'bold',
    color: 'black',
    paddingBottom: 20,
    borderColor: 'black', // Matching the button color
    borderWidth: 3
  },
  // ... other styles ...
});


export default BattleScreen;