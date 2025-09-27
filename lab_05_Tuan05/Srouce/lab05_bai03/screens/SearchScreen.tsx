import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

export default function SearchScreen() {
  const [keyword, setKeyword] = useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nhập từ khóa tìm kiếm:</Text>
      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Nhập từ khóa..."
        style={styles.input}
      />
      <Text style={styles.result}>Từ khóa: {keyword}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16, justifyContent: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginVertical: 12,
  },
  label: { fontSize: 16, marginBottom: 8 },
  result: { fontSize: 16, marginTop: 20, color: "#333" },
});