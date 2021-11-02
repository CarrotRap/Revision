import React from 'react';
import { useState } from 'react';

import { View, Text, Image, StyleSheet, Touchable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Modal, Portal, Provider, ToggleButton } from 'react-native-paper';

export default function (props) {
    const [d, setD] = useState({width: 1, height: 1});
    const [visible, setVisible] = useState(false);

    const showModal = async () => {
        setVisible(true)
    }

    const deleteLesson = async () => {
        props.media.removeElement(props.item);
        setVisible(false)
    }

    return (
        <Provider key={props.key}>
            <Portal>
                <Modal visible={visible} onDismiss={() => setVisible(!visible)} contentContainerStyle={styles.modal} >
                    <Button dark={true} onPress={deleteLesson} mode="contained" style={styles.deleteButton}>Etes-vous sur de vouloir supprimer</Button>
                </Modal>
            </Portal>
            <View style={{position: 'relative', width: props.dimensions.width, height: props.dimensions.height}}>
                <Text style={[styles.label, {transform: [{translateX: -d.width / 2}]}]} onLayout={e => setD({width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height})}>
                    {`${props.item.name}\nJour ${props.item.day}`}
                </Text>
                <Image            
                    style={[styles.image, {width: props.dimensions.width, height: props.dimensions.height}]}
                    source={{uri: props.item.uri}}
                    resizeMethod="scale"
                    resizeMode="contain"
                />
                <ToggleButton
                    style={[styles.icon, {right: 15}]}
                    icon={() => <Ionicons name="close" color="white" size={35} /> }
                    onPress={showModal}
                />
            </View>
        </Provider>
    )
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        color: 'white',
        fontWeight: '800',
        textAlign: 'center',
        fontSize: 25,
        position: 'absolute',
        left: '50%',
        top: 10
    },
    image: {
        borderRadius: 5
    },
    icon: {
        position: 'absolute',
        bottom: 25,
        backgroundColor: '#FF5151'
    },
    deleteButton: {
        backgroundColor: '#FF5151'
    }
})