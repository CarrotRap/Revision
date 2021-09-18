import * as MediaLibrary from 'expo-media-library';
import AsyncStorage from '@react-native-async-storage/async-storage';

const name = 'Revision'

export async function createAlbum(albumName, firstAsset) {
    const album = await MediaLibrary.getAlbumAsync(albumName);

    if(!album) {
        return {result: await MediaLibrary.createAlbumAsync(albumName, firstAsset), isCreate: true}
    }
    return {result: album, isCreate: false};
}

export async function addAssetToAlbum(assetURI) {
    const asset = await MediaLibrary.createAssetAsync(assetURI)
    
    const album = await createAlbum(name, asset);
    if(!album.isCreate) {
        await MediaLibrary.addAssetsToAlbumAsync(asset, album.result)
    }

    console.log(await MediaLibrary.getAssetsAsync({album: album.result}))
}

const defaultSettings = {
    preset: 'test'
}
export async function getSettings() {
    const settings = await AsyncStorage.getItem('settings')
    //if(!settings) {
        await AsyncStorage.setItem('settings', JSON.stringify(defaultSettings))
    //}

    return (settings) ? JSON.parse(settings) : defaultSettings
}