import AsyncStorage from '@react-native-async-storage/async-storage';


//enregistrer l'id de l'user qui a réussi à se connecter dans un fichier 
module.exports.storeData = async (value) => {
    try {
        console.log("store data")
        await AsyncStorage.setItem('@storage_key', value)
    } catch (e) {
        console.log("error storage: " + e)
    }
}


//savoir si un user est déja créer 
module.exports.getData = async () => {
    try {
        
        let get = null
        const value = await AsyncStorage.getItem('@storage_key')
        if (value !== null) {
            get = value
            console.log("valer: " , get)
        }
        return get
    } catch (e) {
        console.log("error storage: " + e)
    }
}


// supprimer l'id d'un user connecter 
module.exports.removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
       console.log("error remove data: " +e)
    }

    console.log('Done.')
}