import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { UserContext } from "./_layout";

const NOTE_IMAGE =
  "https://cdn-icons-png.flaticon.com/512/1514/1514406.png"; // sample note+pencil icon

export default function Welcome() {
  const router = useRouter();
  const { setName } = useContext(UserContext);
  const [input, setInput] = useState("");

  const onGetStarted = () => {
    setName(input || "Guest");
    router.replace("/"); // go to home
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <Image source={{ uri: NOTE_IMAGE }} style={styles.image} />
      <Text style={styles.title}>MANAGE YOUR{"\n"}TASK</Text>

      <View style={styles.inputWrap}>
        <TextInput
          placeholder="Enter your name"
          style={styles.input}
          value={input}
          onChangeText={setInput}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={onGetStarted}>
        <Text style={styles.buttonText}>GET STARTED →</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 60,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    color: "#7B2CBF",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
  },
  inputWrap: {
    width: "85%",
    borderWidth: 1,
    borderColor: "#d7d7d7",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 30,
  },
  input: {
    height: 40,
  },
  button: {
    backgroundColor: "#1FC7D4",
    paddingHorizontal: 34,
    paddingVertical: 12,
    borderRadius: 24,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});