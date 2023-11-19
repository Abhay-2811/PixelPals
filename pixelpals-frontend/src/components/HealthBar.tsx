import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const HealthBar = ({ health }) => {
  return (
    <View style={styles.healthBarContainer}>
      <Text style={styles.healthBarLabel}>HP:</Text>
      <View style={styles.healthBar}>
        <View style={[styles.healthFill, { width: `${health}%`, backgroundColor: health > 50 ? 'limegreen' : 'red' }]} />
      </View>
      <Text style={styles.healthText}>{health}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... existing styles ...
  healthBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
  },
  healthBarLabel: {
    fontWeight: 'bold',
    color: '#333',
    fontFamily: "PixelifySans",
    marginRight: 5,
  },
  healthBar: {
    flex: 1,
    height: 20,
    borderColor: '#333',
    borderWidth: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  healthFill: {
    height: '100%',
    borderRadius: 10,
  },
  healthText: {
    fontWeight: 'bold',
    fontFamily: "PixelifySans",
    color: '#333',
    marginLeft: 5,
  },
  // ... other styles ...
});

export default HealthBar;