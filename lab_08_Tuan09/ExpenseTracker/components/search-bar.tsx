import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (text: string) => void;
  onClearSearch: () => void;
  placeholder?: string;
  backgroundColor?: string;
}

export default function SearchBar({ 
  searchTerm, 
  onSearchChange, 
  onClearSearch, 
  placeholder = "Tìm kiếm...",
  backgroundColor = "#fff"
}: SearchBarProps) {
  return (
    <View style={[styles.searchContainer, { backgroundColor }]}>
      <View style={styles.searchInputContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={onSearchChange}
          placeholder={placeholder}
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchTerm.length > 0 && (
          <TouchableOpacity onPress={onClearSearch} style={styles.clearButton}>
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
    color: '#666',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 5,
  },
  clearButton: {
    padding: 5,
    marginLeft: 5,
  },
  clearIcon: {
    fontSize: 16,
    color: '#999',
    fontWeight: 'bold',
  },
});