import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CalcButton({ title, onPress, isOperation }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isOperation ? styles.operationButton : styles.numberButton,
      ]}
      onPress={onPress}
    >
      <Text 
        style={[
          styles.buttonText,
          isOperation ? styles.operationText : styles.numberText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
    height: 70,
  },
  numberButton: {
    backgroundColor: 'white',
  },
  operationButton: {
    backgroundColor: '#FF9500',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  numberText: {
    color: '#000',
  },
  operationText: {
    color: '#fff',
  },
});