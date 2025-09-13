import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import Calculator from './components/Calculator';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Calculator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});