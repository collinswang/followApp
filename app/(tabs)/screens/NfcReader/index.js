import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, Button, Linking, View, Image } from 'react-native';
import NfcManager, { NfcEvents, NfcTech, Ndef } from 'react-native-nfc-manager';

const NfcReader = ({ route, navigation }) => {

  const [supported, setSupported] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [tag, setTag] = useState(null);
  const [sectors, setSectors] = useState([]);
  const [page, setPage] = useState('4'); // 默认页码为4
  const [data, setData] = useState(''); // 数据输入框
  const [readResult, setReadResult] = useState('');

  useEffect(() => {
    async function initNfc() {
      const isSupported = await NfcManager.isSupported();
      setSupported(isSupported);
      if (isSupported) {
        await NfcManager.start();
        const isEnabled = await NfcManager.isEnabled();
        setEnabled(isEnabled);
      }
    }
    initNfc();

    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      // NfcManager.close();
    };
  }, []);

  // 读取NFC标签
  const readNfcTag = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      setTag(tag);
      const info = tag.split(',')
      if (info[0] && info[1]) {
        Linking.openURL(
          "https://acer.avensys-srl.com/appautologin?email=" + info[0] + "&password=" + info[1]
        );
      }
    } catch (ex) {
      console.warn(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  async function writeNdef({ value }) {
    let result = false;

    try {
      // STEP 1
      await NfcManager.requestTechnology(NfcTech.Ndef);

      const bytes = Ndef.encodeMessage([Ndef.textRecord(value)]);

      if (bytes) {
        await NfcManager.ndefHandler // STEP 2
          .writeNdefMessage(bytes); // STEP 3
        result = true;
      }
    } catch (ex) {
      console.warn(ex);
    } finally {
      // STEP 4
      NfcManager.cancelTechnologyRequest();
    }

    return result;
  }

  // // Android读取所有扇区，ios不支持
  // const readAllSectors = async () => {
  //   try {
  //     await NfcManager.requestTechnology(NfcTech.NfcA);
  //     const sectorCount = 16; // 根据NFC标签类型调整扇区数量
  //     let sectorsData = [];
  //     for (let i = 0; i < sectorCount; i++) {
  //       let response;
  //       response = await NfcManager.transceive([0x30, i]); // 0x30 是MIFARE读扇区命令
  //       // 格式化数据
  //       const formattedData = formatData(response);
  //       sectorsData.push({sector: i, data: formattedData});
  //     }
  //     setSectors(sectorsData);
  //   } catch (ex) {
  //     console.warn(ex);
  //     Alert.alert('Error', 'Failed to read sectors');
  //   } finally {
  //     NfcManager.cancelTechnologyRequest();
  //   }
  // };

  // const formatData = data => {
  //   return data.map(byte => ('00' + byte.toString(16)).slice(-2)).join(' ');
  // };

  // // Android读取特定页
  // async function readPage(page) {
  //   try {
  //     await NfcManager.requestTechnology(NfcTech.NfcA);
  //     const response = await NfcManager.transceive([0x30, page]);
  //     console.log(`Page ${page} content:`, response);
  //     const formattedData = formatData(response);
  //     setReadResult(formattedData);
  //   } catch (ex) {
  //     console.warn(ex);
  //   } finally {
  //     NfcManager.cancelTechnologyRequest();
  //   }
  // }

  // // Android写入特定页
  // async function writePage(page, data) {
  //   try {
  //     await NfcManager.requestTechnology(NfcTech.NfcA);
  //     const payload = [0xa2, page, ...data];
  //     await NfcManager.transceive(payload);
  //     console.log(`Page ${page} written`);
  //     Alert.alert(`Page ${page} 写入成功`);
  //   } catch (ex) {
  //     console.warn(ex);
  //   } finally {
  //     NfcManager.cancelTechnologyRequest();
  //   }
  // }
  // // ios写入特定页
  // const writeIosNfcTag = async (page, data) => {
  //   try {
  //     await NfcManager.requestTechnology([
  //       NfcTech.NfcA,
  //       NfcTech.Ndef,
  //       NfcTech.IsoDep,
  //     ]);

  //     const tagData = await NfcManager.getTag();
  //     if (tagData) {
  //       console.log('Tag found', tagData);

  //       // 示例命令，根据标签文档调整
  //       const command = [0xa2, page, ...data]; // 示例写入命令
  //       const response = await NfcManager.sendMifareCommandIOS(command);
  //       console.log('Response:', response);
  //       Alert.alert(`Page ${page} 写入成功`);
  //     }
  //   } catch (ex) {
  //     console.warn(ex);
  //   } finally {
  //     NfcManager.cancelTechnologyRequest();
  //   }
  // };

  // // iOS 读取特定页
  // const readIosNfcPageTag = async page => {
  //   try {
  //     await NfcManager.requestTechnology([
  //       NfcTech.NfcA,
  //       NfcTech.Ndef,
  //       NfcTech.IsoDep,
  //     ]);
  //     const tagData = await NfcManager.getTag();
  //     if (tagData) {
  //       const command = [0x30, page];
  //       const response = await NfcManager.sendMifareCommandIOS(command);
  //       console.log(`Page ${page} content:`, response);
  //       const formattedData = formatData(response);
  //       setReadResult(formattedData);
  //       // const decodedResponse = response
  //       //   .map(byte => String.fromCharCode(byte))
  //       //   .join('');
  //       // console.log('Decoded Response:', decodedResponse);
  //     }
  //   } catch (ex) {
  //     console.warn(ex);
  //   } finally {
  //     NfcManager.cancelTechnologyRequest();
  //   }
  // };

  return (
    <SafeAreaView>
      <Text>NFC Support: {supported ? 'Yes' : 'No'}</Text>
      <Text>NFC Enabled: {enabled ? 'Yes' : 'No'}</Text>
      <Text>Tag: {tag ? JSON.stringify(tag) : 'None'}</Text>
      <Button title="Read NFC" onPress={readNfcTag} />
      {/* <Button title="Read All" onPress={readAllSectors} /> */}

      {/* <Text>读取NFC标签特定页</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginVertical: 10,
        }}
        placeholder="输入页码"
        value={page}
        onChangeText={setPage}
        keyboardType="numeric"
      />
      <Button
        title="读取页"
        onPress={() =>
          Platform.OS === 'ios'
            ? readIosNfcPageTag(parseInt(page, 10))
            : readPage(parseInt(page, 10))
        }
      />
      <Text>读取结果: {readResult.toString()}</Text> */}

      <Text>Write Nfc Data</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginVertical: 10,
        }}
        placeholder="please input like this: 'username,password'"
        value={data}
        onChangeText={setData}
      />
      <Button
        title="Write"
        onPress={() => {
          writeNdef(data)
          // const byteArray = data.split(',').map(val => {
          //   const byte = parseInt(val, 10);
          //   if (isNaN(byte) || byte < 0 || byte > 255) {
          //     Alert.alert('Invalid Input', '请确保输入的每个字节在0-255范围内');
          //     throw new Error('Invalid input');
          //   }
          //   return byte;
          // });
          // if (byteArray.length !== 4) {
          //   Alert.alert('Invalid Input', '请确保输入4个字节数据');
          //   return;
          // }

          // Platform.OS === 'ios'
          //   ? writeIosNfcTag(parseInt(page, 10), byteArray)
          //   : writePage(parseInt(page, 10), byteArray);
        }}
      />
    </SafeAreaView>
  );
}

export default NfcReader;