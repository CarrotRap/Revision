import { useIsFocused } from "@react-navigation/native";
import React from "react";
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { useEffect, useState } from "react/cjs/react.development";
import Lesson from "../components/Lesson";

import Media from '../utils/media';

import config from '../config.json';

function Home() {
    const [media, setMedia] = useState(new Media())
    const [images, setImages] = useState([]);
    const [dimensions, setDimensions] = useState({width: 1, height: 1});

    if(useIsFocused()) {
        (async () => {
            const list = await media.getInDB('list');
            if(list) {
                const img = [];
            
                for(var e of list) {
                    const date = new Date(e.date);
                    const actualDate = new Date(media.formattedDate());
    
                    const day = Math.round((actualDate-date)/(1000*60*60*24));
                    if(config.SCHEMA[e.schema].indexOf(day) !== -1) {
                        e.day = day;
                        img.push(e);
                    }
                }
    
                setImages(img);
            }
        })();
    }

    if(images.length === 0) return <Text style={[styles.home, {color: 'white', width: '100%', height: '100%', textAlign: 'center', textAlignVertical: 'center', fontWeight: '800'}]}>Veuillez ajouter vos premiers cours</Text>
    return (
        <FlatList
            style={styles.home} 
            onLayout={(e) => setDimensions({width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height})}
            data={images}
            renderItem={({item}) => <Lesson key={item.id} item={item} dimensions={dimensions} media={media} />}
            showsHorizontalScrollIndicator={false}
            snapToInterval={Dimensions.get('window').height - 48}
            snapToAlignment={'start'}
            decelerationRate="fast"
        />
    );
}

const styles = StyleSheet.create({
    home: {
        backgroundColor: '#0f0f0f',
    }
})

export default Home