import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import QRCodeReader from "./screens/QRCodeReader";
import Remarks from "./screens/Remarks";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="QRCodeReader"
        component={QRCodeReader}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Remarks"
        component={Remarks}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
