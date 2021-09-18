import { useFonts, Montserrat_400Regular, Montserrat_800ExtraBold } from '@expo-google-fonts/montserrat';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, TouchableHighlight } from 'react-native';
import { View } from 'react-native';
import { Button, Divider, Overlay, Text } from 'react-native-elements';

import * as utils from '../utils/utils';
import getSettingsUI from '../utils/settings'

export default function Setting(props) {
    let [fontLoaded] = useFonts({Montserrat_800ExtraBold, Montserrat_400Regular})

    const [visible, setVisible] = useState(false)

    const handleClick = () => {
        setVisible(!visible)
    }

    if(!fontLoaded) return <Text>Chargement</Text>
    return (
        <View>
            <Divider orientation="horizontal" />
            <TouchableHighlight  onPress={handleClick}>
                <View style={styles.setting}>
                    <Text style={styles.title}>{ props.type }</Text>
                    <Text style={styles.status}>{ props.status }</Text>
                </View>
            </TouchableHighlight>

            <Overlay isVisible={visible} onBackdropPress={handleClick}>

            </Overlay>

            <Divider orientation="horizontal" />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontFamily: 'Montserrat_800ExtraBold',
        fontFamily: 'Montserrat_400Regular',
        position: 'absolute',
        top: 1,
        left: 10,
        fontSize: 20
    },
    status: {
        color: 'white',
        fontFamily: 'Montserrat_800ExtraBold',
        position: 'absolute',
        bottom: 2,
        right: 2,
    },
    setting: {
        position: 'relative',
        height: 50
    }
})