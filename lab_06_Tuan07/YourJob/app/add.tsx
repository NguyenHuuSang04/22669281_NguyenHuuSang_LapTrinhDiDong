import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { UserContext } from "./_layout";
import { addTask, updateTask, fetchTaskById } from "../services/api";
import { useRouter, useLocalSearchParams } from "expo-router";

const NOTE_IMAGE = "https://cdn-icons-png.flaticon.com/512/1514/1514406.png";

export default function Add() {
  const { name } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useLocalSearchParams<{ id?: string }>();
  const id = params?.id;
  const router = useRouter();

  useEffect(() => {
    if (id) {
      (async () => {
        setLoading(true);
        try {
          const t = await fetchTaskById(String(id));
          if (t) setTitle(t.title);
        } catch (e) {
          console.error("fetchTaskById error", e);
          Alert.alert("Error", "Could not load job to edit: " + String((e as Error).message || e));
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id]);

  const onFinish = async () => {
    if (!title.trim()) {
      Alert.alert("Validation", "Please input your job");
      return;
    }
    try {
      setLoading(true);
      if (id) {
        await updateTask(String(id), { title: title.trim() });
      } else {
        await addTask({ title: title.trim() });
      }
      router.back();
    } catch (e) {
      console.error("onFinish error", e);
      Alert.alert("Error", String((e as Error).message || e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <View style={styles.headerRow}>
        <Text style={styles.greet}>Hi {name || "Guest"}</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: "#888" }}>←</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.bigTitle}>{id ? "EDIT YOUR JOB" : "ADD YOUR JOB"}</Text>

      <View style={styles.inputWrap}>
        <TextInput
          placeholder="input your job"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={onFinish} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>FINISH →</Text>}
      </TouchableOpacity>

      <Image source={{ uri: NOTE_IMAGE }} style={styles.image} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", paddingTop: 40, backgroundColor: "#fff" },
  headerRow: {
    width: "92%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greet: { fontWeight: "700", fontSize: 18, marginVertical: 8 },
  bigTitle: { fontSize: 28, fontWeight: "800", marginTop: 18, textAlign: "center" },
  inputWrap: {
    width: "86%",
    borderWidth: 1,
    borderColor: "#d7d7d7",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 28,
  },
  input: { height: 44 },
  button: {
    marginTop: 28,
    backgroundColor: "#1FC7D4",
    paddingHorizontal: 34,
    paddingVertical: 12,
    borderRadius: 18,
  },
  buttonText: { color: "#fff", fontWeight: "600" },
  image: { width: 160, height: 160, resizeMode: "contain", marginTop: 36, opacity: 0.9 },
});