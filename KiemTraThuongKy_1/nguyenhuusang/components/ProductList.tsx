import React from 'react';
import { FlatList } from 'react-native';
import ProductItem from './ProductItem';

type Product = {
  id: number;
  name: string;
  price: number;
};

type Props = {
  products: Product[];
  onAddToCart: (product: Product) => void;
};

const ProductList: React.FC<Props> = ({ products, onAddToCart }) => {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <ProductItem product={item} onAddToCart={onAddToCart} />
      )}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ paddingVertical: 8 }}
    />
  );
};

export default ProductList;