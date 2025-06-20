import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { Task } from "../models/Task";
import { useFocusEffect } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, "TasksList">;

export default function TasksList({ navigation }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  const fetchTasks = async () => {
    fetch("//localhost:8080/api/tasks")
      .then((res) => res.json())
      .then((data: Task[]) => setTasks(data));
  };

  const getCompletedColor = (completed: boolean) => {
    if (completed) {
      return "#90EE90";
    } else {
      return "#FFD580";
    }
  };

  const getCompletedLabel = (completed: boolean) => {
    if (completed) {
      return "Completed";
    } else {
      return "Pending";
    }
  };

  const handlePress = async (id: number) => {
    try {
      const response = await fetch(`//localhost:8080/api/tasks/${id}`, {
        method: "PUT",
      });

      const updatedTask = await response.json();

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              { backgroundColor: getCompletedColor(item.completed) },
            ]}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.completed}>
              {getCompletedLabel(item.completed)}
            </Text>
            {!item.completed && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => handlePress(item.id)}
              >
                <Text style={styles.buttonText}>Mark as completed</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
      <Button
        title="Add New Task"
        onPress={() => navigation.navigate("CreateTask")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: "bold" },
  description: { fontSize: 14, marginVertical: 4 },
  completed: { fontStyle: "italic", marginBottom: 8 },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold" },
});
