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
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import axios from "axios";

const Register = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const re = /^[0-9]{10,15}$/;
    return re.test(phoneNumber);
  };

  const handleRegister = async () => {
    if (password !== passwordConfirmation) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Invalid email format");
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert("Error", "Invalid phone number format");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://acer.avensys-srl.com/app/register",
        {
          username,
          email,
          phoneNumber,
          password,
        },
        {
          withCredentials: true,
        }
      );

      setLoading(false);

      if (response.data.message === "success") {
        navigation.navigate("Login");
      } else {
        Alert.alert(
          "Registration Failed",
          response.data.message || "Registration was not successful."
        );
      }

      console.log("Registration Response:", response.data);
    } catch (error) {
      setLoading(false);
      Alert.alert(
        "Registration Error",
        error.response?.data?.message ||
          "An error occurred during registration. Please try again later."
      );
      console.error("Registration Error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.body}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
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
              <Text style={styles.or_text}>UserName</Text>
              <TextInput
                style={styles.input}
                placeholder="UserName"
                value={username}
                onChangeText={setUsername}
              />
              <Text style={styles.or_text}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <Text style={styles.or_text}>PhoneNumber</Text>
              <TextInput
                style={styles.input}
                placeholder="PhoneNumber"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
              />
              <Text style={styles.or_text}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <Text style={styles.or_text}>Password Confirmation</Text>
              <TextInput
                style={styles.input}
                placeholder="Password Confirmation"
                value={passwordConfirmation}
                onChangeText={setPasswordConfirmation}
                secureTextEntry
              />
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.item_text}>Sign in here</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.login}>
              <TouchableOpacity onPress={handleRegister} disabled={loading}>
                <Text style={styles.login_text}>
                  {loading ? "L o a  d i n g . . ." : "REGISTER"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: "white",
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
  },
  logo_area: {
    alignItems: "center",
    gap: 25,
    marginTop: 20,
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
    marginTop: 10,
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
    borderRadius: 10,
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
});

export default Register;
