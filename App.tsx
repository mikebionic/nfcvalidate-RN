import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import NfcManager from 'react-native-nfc-manager';
import Game from './src/Game';
// import AndroidPrompt from './src/AndroidPrompt';

function App() {
  const [hasNfc, setHasNfc] = React.useState(false);
  const [enabled, setEnabled] = React.useState(false);

  useEffect(() => {
    async function checkNfc() {
      const supported = await NfcManager.isSupported();
      if (supported) {
        await NfcManager.start();
        setEnabled(await NfcManager.isEnabled());
      }
      setHasNfc(supported);
    }
    checkNfc();
  }, []);

  // async function readNdef() {
  //   try {
  //     await NfcManager.requestTechnology(NfcTech.Ndef);
  //     const tag = await NfcManager.getTag();
  //     console.warn('Tag found', tag);
  //   } catch (ex) {
  //     console.warn('Oops!', ex);
  //   } finally {
  //     NfcManager.cancelTechnologyRequest();
  //   }
  // }

  if (hasNfc) {
    return null;
  } else if (!hasNfc) {
    return (
      <View style={styles.wrapper}>
        <Text>Your device doesn't support NFC</Text>
        {/* <TouchableOpacity
          onPress={() => {
            promptRef.current.setVisible(true);
          }}>
          <Text>Test</Text>
        </TouchableOpacity>
        <AndroidPrompt ref={promptRef} /> */}
      </View>
    );
  } else if (!enabled) {
    return (
      <View style={styles.wrapper}>
        <Text> Your NFC is not enabled </Text>
        <TouchableOpacity
          onPress={() => {
            NfcManager.goToNfcSetting();
          }}>
          <Text>Go To Settings</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    // <SafeAreaView style={styles.wrapper}>
    //   <TouchableOpacity onPress={readNdef}>
    //     <Text>Scan a Tag</Text>
    //   </TouchableOpacity>
    // </SafeAreaView>
    <Game />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
