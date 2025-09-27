import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { user } from "../data/users";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <Text style={styles.name}>{user.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 24,
    borderWidth: 3,
    borderColor: "#19A9FF",
  },
  name: { fontSize: 22, fontWeight: "bold", color: "#333" },
});