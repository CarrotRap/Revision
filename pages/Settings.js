import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

import * as db from '../utils/db'

import Setting from "../components/Setting";

export default function Settings() {
    const [settings, setSettings] = useState([]);

    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            setSettings(await db.getSettings())

            setLoading(false)
        })();
    })

    if(isLoading) return <Text>Chargement</Text>
    return (
        <SafeAreaView>
            <View style={styles.settings}>
                <Text style={{color: 'white'}}>test</Text>
                {Object.keys(settings).map((value) => 
                    <Setting type={ value } data={settings[value]} status="test" key={value} />
                )}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    settings: {

    }
})