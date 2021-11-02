import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Home from './pages/Home';
import Camera from './pages/Camera';
import Settings from './pages/Settings';

import Media from './utils/media';
import { useState } from 'react/cjs/react.development';

const Tab = createMaterialBottomTabNavigator();

const getIcon = (name, color) => (
  // Fonctionne avec activeColor inactiveColor
  <Ionicons name={(color == 'white') ? name : name  + '-outline'} color="white" size={20} />
)

export default function App() {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#0f0f0f" style="light" />
      <View style={styles.app}>
        <NavigationContainer>
          <Tab.Navigator
            barStyle={styles.navigator}
            labeled={false}
            activeColor="white"
            inactiveColor="black"
          >
            <Tab.Screen 
              name="home"
              component={Home}
              options={{
                tabBarIcon: ({color}) => (getIcon('home', color))
              }}
            />
            <Tab.Screen 
              name="camera"
              component={Camera}
              options={{
                tabBarIcon: ({color}) => (getIcon('camera', color))
              }}
            />
            <Tab.Screen 
              name="settings"
              component={Settings}
              options={{
                tabBarIcon: ({color}) => (getIcon('cog', color))
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </View>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  app: {
    backgroundColor: '#0f0f0f',
    width: '100%',
    height: '100%'
  },
  navigator: {
    backgroundColor: '#0f0f0f',
  }
})