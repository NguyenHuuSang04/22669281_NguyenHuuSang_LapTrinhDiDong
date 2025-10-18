import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type Props = {
  name: string;
};

const AVATAR =
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&s=9f3f6b30e7b0c8db99b0a7b3d4a4b8a9";

export default function Header({ name }: Props) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: AVATAR }} style={styles.avatar} />
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.hi}>Hi {name}</Text>
        <Text style={styles.sub}>Have a grate day a head</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", padding: 16 },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  hi: { fontWeight: "700", fontSize: 18 },
  sub: { color: "#888", fontSize: 12 },
});