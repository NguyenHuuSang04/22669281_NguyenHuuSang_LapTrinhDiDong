import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Product = {
  id: number;
  name: string;
  price: number;
};

type Props = {
  cart: Product[];
};

const CartSummary: React.FC<Props> = ({ cart }) => {
  const totalItems = cart.length;
  const totalPrice = cart.reduce((sum, p) => sum + p.price, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{totalItems} sản phẩm</Text>
      <Text style={styles.text}>Tổng tiền: {totalPrice}₫</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f0f3f7',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default CartSummary;