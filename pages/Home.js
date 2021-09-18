import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native'
import { Calendar } from 'react-native-calendars';
import { Button } from 'react-native-elements';


export default function Home() {
    return (
        <View style={styles.home}>
            <Calendar
                minDate={'2020-01-30'}
                maxDate={'2022-01-30'}
            />
            <Button title="test" />
        </View>
    )
}

const styles = StyleSheet.create({
    home: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },

})