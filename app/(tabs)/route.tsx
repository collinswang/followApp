import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import Remarks from "./screens/Remarks";
import QRCodeReader from "./screens/QRCodeReader";

const Stack = createStackNavigator();

const Route = () => {
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
        name="Remarks"
        component={Remarks}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="QRCodeReader"
        component={QRCodeReader}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Route;
