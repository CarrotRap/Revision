import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native"

import { Camera } from 'expo-camera';
import { useIsFocused } from "@react-navigation/native";
import Media from '../utils/media';
import { Button, List } from "react-native-paper";

import config from '../config.json';

function CameraComponent() {
    const [hasPermission, setHasPermission] = useState(null);
    const [camera, setCamera] = useState(null)
    const [media, setMedia] = useState(new Media())
    const [isTake, setIsTake] = useState(false);
    const [picture, setPicture] = useState(null);
    const [name, setName] = useState(null);
    const [finish, setFinish] = useState(false);
    const [schema, setSchema] = useState(0);

    const isFocused = useIsFocused();

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();


    })

    const takePhoto = async () => {
        if(camera) {
            setPicture(await camera.takePictureAsync());

            setIsTake(true);
        }
    }

    const saveLesson = async () => {
        if(name === '' || !name) return;
        await media.putImage(picture, name, schema)

        setFinish(true)

        setTimeout(() => {
            setName(null);
            setIsTake(false);
            setPicture(null);
            setFinish(false)
            setSchema(0)
        }, 1500)
    }

    const reload = () => {
        setName(null);
        setIsTake(false);
        setPicture(null);
        setFinish(false)
        setSchema(0)
    }

    if(hasPermission === null || !isFocused) { return <View /> }
    if(hasPermission === false) { return <Text>Pas d'accés à la caméra</Text> }
    return (
        <View style={styles.cameraComponent} >
            {(!isTake) ?
                <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={ref => {setCamera(ref)}} >
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={takePhoto}
                    />
                </Camera>
            :
                <View style={styles.name}>
                    <TextInput
                        placeholder="Nom du cours"
                        value={name}
                        onChangeText={setName}
                        placeholderTextColor="black"
                        style={styles.input}
                    />
                    <Button 
                        mode="contained"
                        dark={true}
                        color="#FF5151"
                        style={styles.validNameBtn}
                        onPress={saveLesson}
                    >Valider</Button>
                    <Text style={[styles.label, {color: (finish) ? 'white' : 'transparent'}]}>Votre cours a été sauvegarder</Text>

                    <View>
                        {config.SCHEMA.map((value, index) => (
                            <List.Item
                                title={"Schema " + (index + 1)}
                                description={JSON.stringify(value) + ' jours'}
                                titleStyle={styles.schema}
                                descriptionStyle={styles.schema}
                                style={[styles.schemaContainer, (schema == index) ? {backgroundColor: '#FF5151', padding: 5} : {backgroundColor: 'black'}]}
                                onPress={(e) => setSchema(index)}
                            />
                        ))}
                    </View>

                    <Button
                        color="#FF5151"
                        mode="contained"
                        dark={true}
                        onPress={reload}
                        style={{marginTop: 10}}
                    >Annuler</Button>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    cameraComponent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f0f0f'
    },
    camera: {
        width: '100%',
        height: '100%',
        position: 'relative'
    },
    button: {
        width: 60,
        height: 60,
        backgroundColor: 'white',
        borderRadius: 100,
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: [ {translateX: -30}, {translateY: -30} ]
    },
    name: {
        width: '80%'
    },
    input: {
        width: '100%',
        backgroundColor: 'white',
        height: 50,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 10
    },
    validNameBtn: {
        borderRadius: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    label: {
        textAlign: 'center',
        marginTop: 10,
        fontWeight: "800"
    },
    schema: {
        color: 'white'
    },
    schemaContainer: {
        borderRadius: 5,
        marginBottom: 10,
        marginTop: 5
    }
})

export default CameraComponent
