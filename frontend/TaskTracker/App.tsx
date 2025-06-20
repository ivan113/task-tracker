import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import TaskList from "./screens/TasksList";
import CreateTask from "./screens/CreateTasks";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TasksList">
        <Stack.Screen name="TasksList" component={TaskList} />
        <Stack.Screen name="CreateTask" component={CreateTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
