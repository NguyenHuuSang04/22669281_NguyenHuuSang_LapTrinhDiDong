import React from 'react';
import { View, StyleSheet } from 'react-native';
import CalcButton from './CalcButton';

const buttons = [
  ['7', '8', '9', '/'],
  ['4', '5', '6', '*'],
  ['1', '2', '3', '-'],
  ['C', '0', '=', '+'],
];

export default function ButtonPad({ onPress }) {
  return (
    <View style={styles.buttonPad}>
      {buttons.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((button) => (
            <CalcButton 
              key={button} 
              title={button} 
              onPress={() => onPress(button)}
              isOperation={['+', '-', '*', '/', '=', 'C'].includes(button)}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonPad: {
    flex: 1,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});