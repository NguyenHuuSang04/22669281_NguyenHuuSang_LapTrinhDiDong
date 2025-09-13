import React, { useState } from 'react';
import { SafeAreaView, View, StatusBar, StyleSheet } from 'react-native';
import ProductList from './components/ProductList';
import CartSummary from './components/CartSummary';

type Product = {
  id: number;
  name: string;
  price: number;
};


const PRODUCTS: Product[] = [
  { id: 1, name: 'Iphone 15 Promax', price: 10000 },
  { id: 2, name: 'Nokia', price: 20000 },
  { id: 3, name: 'Samsung', price: 15000 },
  { id: 4, name: 'Sony', price: 25000 },
  { id: 5, name: 'Sony', price: 25000 },
];

export default function App() {
  const [cart, setCart] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <CartSummary cart={cart} />
      <View style={{ flex: 1 }}>
        <ProductList products={PRODUCTS} onAddToCart={handleAddToCart} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f6f8fa'
  }
});