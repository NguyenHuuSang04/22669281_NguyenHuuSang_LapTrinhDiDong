import React from 'react';
import { View, StyleSheet } from 'react-native';
import Display from './Display';
import ButtonPad from './ButtonPad';
import useCalculator from '../hooks/useCalculator';

export default function Calculator() {
  const { displayValue, result, handleButtonPress } = useCalculator();
  
  return (
    <View style={styles.container}>
      <Display displayValue={displayValue} result={result} />
      <ButtonPad onPress={handleButtonPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
});