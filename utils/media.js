import * as MediaLibrairy from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

const albumName = 'Revision';

export default class media {
    constructor() {
        (async () => {
            await this.getPermissions()
        })();
    }

    async getPermissions() {
        var status = '';
        while (status !== 'granted') {
            status = await (await MediaLibrairy.requestPermissionsAsync()).status;
        }
    }

    async putImage(image, name, schema) {
        const asset = await MediaLibrairy.createAssetAsync(image.uri);

        var album = await MediaLibrairy.getAlbumAsync(albumName)
        if (album) {
            await MediaLibrairy.addAssetsToAlbumAsync(asset, album);
        } else {
            album = await MediaLibrairy.createAlbumAsync(albumName, asset);
        }

        await FileSystem.deleteAsync(image.uri);

        const { assets } = await MediaLibrairy.getAssetsAsync({album,});
        await this.addToList({
            name,
            date: this.formattedDate(),
            id: assets[assets.length - 1].id,
            uri: assets[assets.length - 1].uri,
            schema,
        })

        //await AsyncStorage.removeItem('list')
    }

    async addToList(el) {
        var list = await this.getInDB('list');
        if(list) list.push(el);
        else list = [el]

        // Delete
        for(var e of list) {
            const { exists } = await FileSystem.getInfoAsync(e.uri);
            if(!exists) {
                const index = list.indexOf(e);
                if (index > -1) {
                    list.splice(index, 1);
                }
            }
        }
console.log(list)
        await this.saveInDB('list', list)
    }

    async removeElement(el) {
        var list = await this.getInDB('list');
        var index = -1
        for(var i in list) {
            if(list[i].uri === el.uri) {
                index = i;
            }
        }

        if (index > -1) {
            list.splice(index, 1);
        }
        
        await this.saveInDB('list', list);
        const asset = await MediaLibrairy.getAssetInfoAsync({id: el.id});
        await MediaLibrairy.removeAssetsFromAlbumAsync(asset, await MediaLibrairy.getAlbumAsync(albumName));
    }

    async saveInDB(key, value) {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    }

    async getInDB(key) {
        return JSON.parse(await AsyncStorage.getItem(key));
    }

    formattedDate(d = new Date) {
        let month = String(d.getMonth() + 1);
        let day = String(d.getDate());
        const year = String(d.getFullYear());
      
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
      
        return `${month}/${day}/${year}`;
    }
}