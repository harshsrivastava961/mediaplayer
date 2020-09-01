import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const DashBoard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Video')}>
          <Text style={styles.buttonText}>
            Video Screen
        </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Audio')}>
          <Text style={styles.buttonText}>
            Audio Screen
        </Text>
        </TouchableOpacity>
      </View>
    </View>);
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: '#ff8c00',
    height: '100%',
  },
  buttonContainer: {
    marginTop: 100
  },
  text: {
    fontSize: 16,
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: 15,
  },
  button: {
    padding: 15,
    alignSelf: 'center',
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 18
  }

});
export default DashBoard;