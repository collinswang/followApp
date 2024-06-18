import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, Linking, View, Image } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import styles from "./scanStyle";

const QRCodeReader = ({ route }) => {
  const { projectname, email, password } = route.params;
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
  const [test, setTest] = useState("p");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (ScanResult) {
      handleLogin();
    }
  }, [ScanResult]);

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
      setTimestamp(Date.now().toString());
      setScanResult(true);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://acer.avensys-srl.com/app/qrcode",
        {
          device_id,
          serial_id,
          firmware_version,
          software_version,
          hardware_version,
          kts,
          counter,
          probes,
          accessoryHW0,
          accessoryHW1,
          accessoryHW2,
          accessoryHW3,
          motdep,
          alarm0,
          alarm1,
          alarm2,
          alarm3,
          alarm4,
          alarm5,
          alarm6,
          alarm7,
          alarm8,
          alarm9,
          alarm10,
          alarm11,
          alarm12,
          timestamp,
          projectname,
          email,
        },
        {
          withCredentials: true, // Ensure credentials are included
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
    } catch (error) {
      setLoading(false);
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
                <Image
                  source={require("./assets/camera.png")}
                  style={{ height: 36, width: 36 }}
                ></Image>
                <Text style={{ ...styles.buttonTextStyle, color: "#2196f3" }}>
                  Scan QR Code
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        {ScanResult && (
          <React.Fragment>
            <Text style={styles.textTitle1}>Result</Text>
            <View style={ScanResult ? styles.scanCardView : styles.cardView}>
              <Text>Captured successfully!</Text>
              {/* <Text>Device ID : {device_id}</Text>
              <Text>Result : {result.data}</Text>
              <Text numberOfLines={1}>RawData: {result.rawData}</Text> */}
              <TouchableOpacity onPress={scanAgain} style={styles.buttonScan}>
                <View style={styles.buttonWrapper}>
                  <Image
                    source={require("./assets/camera.png")}
                    style={{ height: 36, width: 36 }}
                  ></Image>
                  <Text style={{ ...styles.buttonTextStyle, color: "#2196f3" }}>
                    Click to scan again
                  </Text>
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
