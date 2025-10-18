import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Text,
} from "react-native";
import { UserContext } from "./_layout";
import Header from "../components/Header";
import TaskItem from "../components/TaskItem";
import { fetchTasks, toggleTaskComplete, deleteTask } from "../services/api";
import { useRouter, useFocusEffect } from "expo-router";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export default function Home() {
  const { name } = React.useContext(UserContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>("");
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      let active = true;
      (async () => {
        setLoading(true);
        try {
          const data = await fetchTasks();
          if (!active) return;
          setTasks(data);
        } catch (e) {
          console.error("load error", e);
          if (active) setTasks([]);
        } finally {
          if (active) setLoading(false);
        }
      })();
      return () => {
        active = false;
      };
    }, [])
  );

  const filtered = useMemo(() => {
    if (!query) return tasks;
    return tasks.filter((t) => t.title.toLowerCase().includes(query.toLowerCase()));
  }, [tasks, query]);

  async function handleToggle(id: string) {
    try {
      const updated = await toggleTaskComplete(id);
      setTasks((prev) => prev.map((p) => (p.id === id ? updated : p)));
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Could not toggle task: " + String((e as Error).message || e));
    }
  }

  async function handleDelete(id: string) {
    console.log("Deleting id:", id);
    Alert.alert("Confirm", "Are you sure you want to delete this job?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteTask(id);
            setTasks((prev) => prev.filter((p) => p.id !== id));
          } catch (e) {
            console.error(e);
            const msg = String((e as Error).message || e);
            Alert.alert("Error", "Could not delete job: " + msg);
          }
        },
      },
    ]);
  }

  function handleEdit(id: string) {
    router.push(`/add?id=${encodeURIComponent(id)}`);
  }

  return (
    <View style={styles.container}>
      <Header name={name || "Guest"} />
      <View style={styles.searchWrap}>
        <TextInput placeholder="Search" style={styles.search} value={query} onChangeText={setQuery} />
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem task={item} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit} />
          )}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 10, paddingBottom: 140 }}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          router.push("/add");
        }}
        activeOpacity={0.8}
      >
        <Text style={styles.fabPlus}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  searchWrap: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 10,
  },
  search: { height: 44 },
  fab: {
    position: "absolute",
    alignSelf: "center",
    bottom: 34,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#10B7C9",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 50,
  },
  fabPlus: {
    color: "#fff",
    fontSize: 34,
    lineHeight: 34,
    fontWeight: "700",
  },
});