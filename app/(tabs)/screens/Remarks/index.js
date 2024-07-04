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
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

const Remarks = ({ route, navigation }) => {
  const { email, password, projectname } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [picture, setPicture] = useState(null);
  const [remark, setRemark] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPicture(result.assets[0].uri);
    }
  };

  const handleAdd = () => {
    navigation.navigate("QRCodeReader", {
      remarks: remark,
      picture: picture,
      email: email,
      password: password,
      projectname: projectname,
    });
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
          <Text style={styles.or_text}>Please type the remark(1~3 words)</Text>
          <TextInput
            style={styles.input}
            placeholder={"Remark"}
            value={remark}
            onChangeText={setRemark}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={takePicture} style={styles.button}>
            <Text style={styles.buttonText}>
              {picture ? "Take a Picture Again" : "Take a Picture"}
            </Text>
          </TouchableOpacity>
        </View>
        {picture && (
          <View style={styles.previewContainer}>
            <Text style={styles.previewText}>Preview:</Text>
            <Image source={{ uri: picture }} style={styles.previewImage} />
          </View>
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleAdd} style={styles.button}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Remarks;

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
  buttonContainer: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#0EACF9",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  previewContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  previewText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
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
