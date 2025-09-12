import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Display({ displayValue, result }) {
  return (
    <View style={styles.display}>
      <Text style={styles.input}>{displayValue}</Text>
      <Text style={styles.result}>{result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  display: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    minHeight: 120,
    justifyContent: 'flex-end',
  },
  input: {
    fontSize: 32,
    textAlign: 'right',
    marginBottom: 10,
  },
  result: {
    fontSize: 24,
    textAlign: 'right',
    color: 'gray',
  },
});