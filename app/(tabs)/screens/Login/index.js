import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
axios.defaults.withCredentials = true;

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://acer.avensys-srl.com/app/login",
        {
          email,
          password,
        },
        {
          withCredentials: true, // Ensure credentials are included
        }
      );
      setLoading(false);
      console.log(response.data); // Log the entire response data to inspect its structure
      if (response.data.message === "success") {
        navigation.navigate("Home", { email: email, password: password });
        console.log("success");
      } else {
        Alert.alert("Response", response.data.message || "Unexpected response");
      }
    } catch (error) {
      setLoading(false);

      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.logo_area}>
        <Image
          source={require("../../assets/avensys_logo.png")}
          style={{ width: 230, height: 130 }}
        />
        <Image
          source={require("../../assets/logo.png")}
          style={{ width: 170, height: 70 }}
        />
      </View>
      <View style={styles.form}>
        <View style={styles.item}>
          <Text style={styles.or_text}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder={"Email"}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.or_text}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder={"Password"}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.item_text}>Create an Account</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.login}>
          <TouchableOpacity onPress={handleLogin} disabled={loading}>
            <Text style={styles.login_text}>
              {loading ? "L o a d i n g . . ." : "L O G I N"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  body: {
    backgroundColor: "white",
    flex: 1,
  },
  logo_area: {
    alignItems: "center",
    gap: 25,
  },
  form: {
    marginTop: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: "#B0B0C3",
    backgroundColor: "#F7F7F7",
    padding: 17,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
  },
  item_text: {
    color: "#0EACF9",
    fontWeight: "700",
    textAlign: "right",
    marginRight: 10,
    marginTop: 10,
  },
  login: {
    backgroundColor: "#0EACF9",
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
  },
  login_text: {
    textAlign: "center",
    color: "white",
    fontWeight: "700",
    fontSize: 14,
  },
  or_text: {
    textAlign: "left",
    color: "#525464",
    fontSize: 18,
    marginLeft: 15,
    marginTop: 10,
    fontWeight: "600",
  },
  register: {
    textDecorationLine: "underline",
    color: "#FFB19D",
  },
});
