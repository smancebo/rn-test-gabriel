import React, { useEffect, ReactElement, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as SessionManager from '../../managers/SessionManager';
import * as colors from '../../utils/constants/colors';
import * as storageKeys from '../../utils/constants/storageKeys';

type DrawerItemProps = {
    icon: string
    title: string
    onPress?(): any
}
function DrawerItem(props: DrawerItemProps) {
    return (
        <View style={styles.drawerItemContainer}>
            <TouchableOpacity style={styles.drawerItemContent} onPress={props.onPress}>
                <Icon style={{ marginRight: 10 }} name={props.icon} size={30} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={{ fontSize: 20 }}>{props.title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

type Props = {
    navigation?: any
    state?: any
}
function DrawerContent(props: Props): ReactElement {
    const [source, setSource] = useState();

    useEffect(() => {
        const init = async () => {
            const sourceFromStorage = await SessionManager.getData(storageKeys.NEWS_SOURCE_STORAGE_KEY);
            setSource(sourceFromStorage);
        }
        init();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon name="newspaper" size={80} color={colors.white} />
                <Text style={styles.sourceTitle}>{source}</Text>
            </View>
            <View style={styles.content}>
                <DrawerItem icon="home" title="Home" onPress={() => props.navigation.navigate('Home')} />
                <DrawerItem icon="globe" title="Sources" onPress={() => props.navigation.navigate('Sources')} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    header: {
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: 'center',
        paddingTop: 30
    },
    sourceTitle: {
        color: colors.white
    },
    content: {
        flex: 4
    },
    drawerItemContainer: {
        borderBottomColor: colors.gray_100,
        borderBottomWidth: 1,
        flexDirection: 'row'
    },
    drawerItemContent: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: 10
    }
})

export default DrawerContent;