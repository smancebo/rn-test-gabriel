import 'react-native-gesture-handler';
import React from 'react';
import {
    StyleSheet,
    View,
    StatusBar
} from 'react-native';
import AppNavigation from './navigation'
import * as colors from './utils/constants/colors';
import * as SessionManager from '../src/managers/SessionManager';
import * as storageKeys from '../src/utils/constants/storageKeys';

//set x-api-key in app storage
SessionManager.setData(storageKeys.X_API_KEY_STORAGE_KEY, "2a2bd21377bd4cb1a3657052986ebc91");

//customize statusbar
StatusBar.setBackgroundColor(colors.primary);

interface Props { }
function App(props: Props) {
    return (
        <View style={styles.container}>
            <AppNavigation />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default App;