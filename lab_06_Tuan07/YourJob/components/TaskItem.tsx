import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  onEdit,
}: {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}) {
  return (
    <View style={styles.wrap}>
      <TouchableOpacity
        style={[styles.checkbox, task.completed && styles.checkboxChecked]}
        onPress={() => onToggle(task.id)}
      >
        {task.completed ? <Text style={styles.checkMark}>✓</Text> : null}
      </TouchableOpacity>

      <Text style={[styles.title, task.completed && { textDecorationLine: "line-through" }]}>
        {task.title}
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(task.id)} style={styles.iconButton}>
          <Text style={styles.editIcon}>✎</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.iconButton}>
          <Text style={styles.deleteIcon}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#efefef",
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 30,
    justifyContent: "space-between",
  },
  checkbox: {
    width: 34,
    height: 34,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#bbb",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: "#dff3ef",
    borderColor: "#10B7C9",
  },
  checkMark: { color: "#10B7C9", fontWeight: "700" },
  title: { flex: 1, fontWeight: "600", marginHorizontal: 10 },
  actions: { flexDirection: "row", alignItems: "center" },
  iconButton: {
    padding: 10,
    marginLeft: 6,
    borderRadius: 8,
  },
  editIcon: {
    fontSize: 20,
    color: "#e65b6b",
  },
  deleteIcon: {
    fontSize: 20,
    color: "#c0392b",
  },
});