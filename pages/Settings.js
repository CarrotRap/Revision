import React from "react";
import { Text, View, StyleSheet } from "react-native"

function Settings() {
    return (
        <View style={styles.settings} >
            <Text>En cours de developpement : V 1.0</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    settings: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Settings
