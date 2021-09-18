import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Image, Icon } from 'react-native-elements';
import PagerView from 'react-native-pager-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';

import Home from './pages/Home';
import Camera from './pages/Camera';
import Settings from './pages/Settings';

const icons = ['cog', 'home-variant', 'calendar-blank']

export default function App() {
  const pagerView = React.createRef();

  const [icon, setIcon] = useState(1)

  useEffect(() => {
    (async () => {
      await ImagePicker.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync()
    })()
  })

  const handlePage = (e) => {
    const position = e.nativeEvent.position | 0;

    setIcon(icons[position]);
  }

  const renderIcon = () => {
    return (
      <View style={styles.icon}>
        { icons.map((value) => 
          <Button buttonStyle={{backgroundColor: 'transparent'}} key={value} onPress={() => pagerView.current.setPage(icons.indexOf(value))} icon={
            <Icon 
              type="material-community" 
              color={(icon == value) ? '#FFB830' : '#FFF'} 
              name={value} 
              size={(icon == value) ? 32: 26}
            />
          } />
        )}
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <StatusBar style="light" />
        <PagerView style={{flex: 1}} initialPage={1} ref={pagerView} onPageSelected={handlePage} >
          <View key="0">
            <Settings />
          </View>
          <View key="1">
            <Home />
          </View>
          <View key="2">
            <Camera pagerView={pagerView} />
          </View>
        </PagerView>

        { renderIcon() }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222222',
    height: '100%',
    width: '100%'
  },
  icon: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexWrap: 'nowrap',
    flexDirection: 'row'
  }
});
