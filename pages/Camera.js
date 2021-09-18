import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import * as db from '../utils/db';
import * as ImagePicker from 'expo-image-picker'

export default function CameraPages(props) {
    const pickImage = async () => {
        const result = await ImagePicker.launchCameraAsync()
        if(result.cancelled) return;//props.pagerView.current.setPage(0)

        await db.addAssetToAlbum(result.uri)
    }

    return (
        <View style={styles.camera}>
            <Button title="Ajouter cours" type="outline" titleStyle={styles.buttonText} buttonStyle={styles.button} onPress={pickImage} />
        </View>
    )
}

const styles = StyleSheet.create({
    camera: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: '80%',
        borderRadius: 10,
    },
    buttonText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})