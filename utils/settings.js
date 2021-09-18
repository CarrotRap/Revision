import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native";

import React from "react";

const settings = {
    preset: () => {
        return(
            <Text>caca</Text>
        )
    }
}

export default function getSettingsUI(setting) {
    return settings[setting]
}