import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, Linking, View, Image } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import styles from "./scanStyle";
import moment from "moment";

const QRCodeReader = ({ route, navigation }) => {
  const { projectname, email, password, remarks, picture } = route.params;

  const [hasPermission, setHasPermission] = useState(null);
  const [scan, setScan] = useState(false);
  const [ScanResult, setScanResult] = useState(false);
  const [result, setResult] = useState(null);
  const [device_id, setDevice_id] = useState("");
  const [serial_id, setSerial_id] = useState("");
  const [firmware_version, setFirmware_version] = useState("");
  const [software_version, setSoftware_version] = useState("");
  const [hardware_version, setHardware_version] = useState("");
  const [kts, setKts] = useState("");
  const [counter, setCounter] = useState("");
  const [probes, setProbes] = useState("");
  const [accessoryHW0, setAccessoryHW0] = useState("");
  const [accessoryHW1, setAccessoryHW1] = useState("");
  const [accessoryHW2, setAccessoryHW2] = useState("");
  const [accessoryHW3, setAccessoryHW3] = useState("");
  const [motdep, setMotdep] = useState("");
  const [alarm0, setAlarm0] = useState("");
  const [alarm1, setAlarm1] = useState("");
  const [alarm2, setAlarm2] = useState("");
  const [alarm3, setAlarm3] = useState("");
  const [alarm4, setAlarm4] = useState("");
  const [alarm5, setAlarm5] = useState("");
  const [alarm6, setAlarm6] = useState("");
  const [alarm7, setAlarm7] = useState("");
  const [alarm8, setAlarm8] = useState("");
  const [alarm9, setAlarm9] = useState("");
  const [alarm10, setAlarm10] = useState("");
  const [alarm11, setAlarm11] = useState("");
  const [alarm12, setAlarm12] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [loading, setLoading] = useState(false);

  console.log(remarks, picture, projectname, email, password);
  let file;

  if (picture) {
    file = {
      uri: picture,
      name: "image.jpg",
      type: "image/jpeg",
    };
  }

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const onSuccess = (e) => {
    const check = e.data.substring(0, 4);
    console.log("scanned data " + check);
    setResult(e);
    setScan(false);
    if (check === "http") {
      Linking.openURL(e.data).catch((err) =>
        console.error("An error occurred", err)
      );
    } else {
      // Parse the QR code data and update the state
      const data = e.data.split("|");

      setDevice_id(data[0]);
      setSerial_id(data[1]);
      setFirmware_version(data[2]);
      setSoftware_version(data[3]);
      setHardware_version(data[4]);
      setKts(data[5]);
      setCounter(data[6]);
      setProbes(data[7]);
      setAccessoryHW0(data[8]);
      setAccessoryHW1(data[9]);
      setAccessoryHW2(data[10]);
      setAccessoryHW3(data[11]);
      setMotdep(data[12]);
      setAlarm0(data[13]);
      setAlarm1(data[14]);
      setAlarm2(data[15]);
      setAlarm3(data[16]);
      setAlarm4(data[17]);
      setAlarm5(data[18]);
      setAlarm6(data[19]);
      setAlarm7(data[20]);
      setAlarm8(data[21]);
      setAlarm9(data[22]);
      setAlarm10(data[23]);
      setAlarm11(data[24]);
      setAlarm12(data[25]);
      const formattedTimestamp = moment().format("DD/MM/YYYY HH:mm:ss");
      setTimestamp(formattedTimestamp);
      setScanResult(true);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const formData = new FormData();

      // Append text fields
      formData.append("device_id", device_id);
      formData.append("serial_id", serial_id);
      formData.append("firmware_version", firmware_version);
      formData.append("software_version", software_version);
      formData.append("hardware_version", hardware_version);
      formData.append("kts", kts);
      formData.append("counter", counter);
      formData.append("probes", probes);
      formData.append("accessoryHW0", accessoryHW0);
      formData.append("accessoryHW1", accessoryHW1);
      formData.append("accessoryHW2", accessoryHW2);
      formData.append("accessoryHW3", accessoryHW3);
      formData.append("motdep", motdep);
      formData.append("alarm0", alarm0);
      formData.append("alarm1", alarm1);
      formData.append("alarm2", alarm2);
      formData.append("alarm3", alarm3);
      formData.append("alarm4", alarm4);
      formData.append("alarm5", alarm5);
      formData.append("alarm6", alarm6);
      formData.append("alarm7", alarm7);
      formData.append("alarm8", alarm8);
      formData.append("alarm9", alarm9);
      formData.append("alarm10", alarm10);
      formData.append("alarm11", alarm11);
      formData.append("alarm12", alarm12);
      formData.append("timestamp", timestamp);
      formData.append("projectname", projectname);
      formData.append("email", email);
      formData.append("remarks", remarks);

      //Append file only if available
      if (file) {
        formData.append("file", file);
      }

      const response = await axios.post(
        "https://acer.avensys-srl.com/app/qrcode",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      setLoading(false);
      if (response.data.message === "success") {
        Linking.openURL(
          "https://acer.avensys-srl.com/appautologin?email=" +
            email +
            "&password=" +
            password
        );
      }
      console.log(response.data);
    } catch (error) {
      setLoading(false);
      console.error(
        "There was an error!",
        error.response ? error.response : error.message
      );
      alert("Login Error", "An error occurred during login.");
    }
  };

  const activeQR = () => {
    setScan(true);
    setScanResult(false);
  };

  const scanAgain = () => {
    setScan(true);
    setScanResult(false);
  };

  const setRemark = () => {
    //navigation.navigate("Remarks");
    navigation.navigate("Remarks", {
      email: email,
      password: password,
      projectname: projectname,
    });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.scrollViewStyle}>
      <React.Fragment>
        <View style={styles.header}>
          <Text style={styles.textTitle}>Scan QR Code</Text>
        </View>
        {!scan && !ScanResult && (
          <View style={styles.cardView}>
            <Image
              source={require("./assets/camera.png")}
              style={{ height: 36, width: 36 }}
            ></Image>
            <Text numberOfLines={8} style={styles.descText}>
              Please move your camera {"\n"} over the QR Code
            </Text>
            <Image
              source={require("./assets/qr-code.png")}
              style={{ margin: 20 }}
            ></Image>

            <TouchableOpacity onPress={activeQR} style={styles.buttonScan}>
              <View style={styles.buttonWrapper}>
                <View style={styles.iconContainer}>
                  <Image
                    source={require("./assets/camera.png")}
                    style={{ height: 36, width: 36 }}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={{ ...styles.buttonTextStyle, color: "#2196f3" }}>
                    Scan QR Code
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
        {ScanResult && (
          <React.Fragment>
            <Text style={styles.textTitle1}>Result</Text>
            <View style={ScanResult ? styles.scanCardView : styles.cardView}>
              <Text style={styles.textTitle2}>Captured successfully!</Text>
              {/* <Text>Device ID : {device_id}</Text> */}
              <Text>Result : {result.data}</Text>
              {/*<Text numberOfLines={1}>RawData: {result.rawData}</Text> */}
              <TouchableOpacity onPress={scanAgain} style={styles.buttonScan}>
                <View style={styles.buttonWrapper}>
                  <View style={styles.iconContainer}>
                    <Image
                      source={require("./assets/camera.png")}
                      style={{ height: 36, width: 36 }}
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text
                      style={{ ...styles.buttonTextStyle, color: "#2196f3" }}
                    >
                      Click to scan again
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={setRemark} style={styles.buttonScan}>
                <View style={styles.buttonWrapper}>
                  <View style={styles.iconContainer}>
                    {!picture && (
                      <Image
                        source={require("./assets/remarks.png")}
                        style={{ width: 36, height: 36 }}
                      />
                    )}
                    {picture && (
                      <Image
                        source={{ uri: picture }}
                        style={{ width: 36, height: 36 }}
                      />
                    )}
                  </View>
                  <View style={styles.textContainer}>
                    {!remarks && (
                      <Text
                        style={{ ...styles.buttonTextStyle, color: "#2196f3" }}
                      >
                        Picture and Remark
                      </Text>
                    )}
                    {remarks && (
                      <Text
                        style={{ ...styles.buttonTextStyle, color: "#2196f3" }}
                      >
                        {remarks}
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleLogin} style={styles.buttonScan}>
                <View style={styles.buttonWrapper}>
                  <View style={styles.iconContainer}>
                    <Image
                      source={require("./assets/icon.png")}
                      style={{ height: 35, width: 35 }}
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text
                      style={{ ...styles.buttonTextStyle, color: "#2196f3" }}
                    >
                      Click to visit ACER
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </React.Fragment>
        )}
        {scan && (
          <BarCodeScanner onBarCodeScanned={onSuccess} style={{ flex: 1 }}>
            <View style={styles.centerText}>
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: "500",
                  textAlign: "center",
                  color: "#0EACF9",
                  marginTop: 10,
                }}
              >
                Please move your camera {"\n"} over the QR Code
              </Text>
            </View>
            <View style={styles.bottomContent}>
              <TouchableOpacity
                style={styles.buttonScan2}
                onPress={() => setScan(false)}
              >
                <Image source={require("./assets/camera2.png")}></Image>
              </TouchableOpacity>
            </View>
          </BarCodeScanner>
        )}
      </React.Fragment>
    </View>
  );
};

export default QRCodeReader;
