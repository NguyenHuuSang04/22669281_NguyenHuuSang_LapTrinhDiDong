import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Product = {
  id: number;
  name: string;
  price: number;
};

type Props = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

const ProductItem: React.FC<Props> = ({ product, onAddToCart }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{product.price}₫</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => onAddToCart(product)}>
        <Text style={styles.buttonText}>Thêm vào giỏ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  price: {
    marginTop: 4,
    color: '#888'
  },
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});

export default ProductItem;