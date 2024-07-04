import React, { useState, useEffect } from "react";
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

const Home = ({ route, navigation }) => {
  const { email, password } = route.params;
  const [projectname, setProjectname] = useState("");
  const [skipFlag, setSkipFlag] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSkipFlag(!!projectname);
  }, [projectname]);

  const handleProjectName = async () => {
    setLoading(true);
    navigation.navigate("QRCodeReader", { projectname, email, password });
  };

  const handleSkip = () => {
    if (!projectname) setProjectname(" ");
    navigation.navigate("QRCodeReader", { projectname, email, password });
  };

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.logo_area}>
        <Image
          source={require("../../assets/avensys_logo.png")}
          style={{ width: 230, height: 130 }}
        />
      </View>
      <View style={styles.form}>
        <View style={styles.item}>
          <Text style={styles.or_text}>Project Name</Text>
          <TextInput
            style={styles.input}
            placeholder={"Project Name"}
            value={projectname}
            onChangeText={setProjectname}
          />
        </View>
        <View style={styles.login}>
          {skipFlag ? (
            <TouchableOpacity onPress={handleProjectName} disabled={loading}>
              <Text style={styles.login_text}>
                {loading ? "Loading..." : "S U B M I T"}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleSkip} disabled={loading}>
              <Text style={styles.login_text}>
                {loading ? "Loading..." : "S K I P"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

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
