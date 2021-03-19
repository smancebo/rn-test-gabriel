import React, { ReactElement, useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { Loading } from '../../components/common';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { fetchSources } from '../../managers/NetworkManager';
import Source from '../../models/source.model';
import * as SessionManager from '../../managers/SessionManager';
import * as storageKeys from '../../utils/constants/storageKeys';
import * as colors from '../../utils/constants/colors';

interface Props {
    navigation?: any
}
function SettingsScreen(props: Props) {
    const [loading, setLoading] = useState<Boolean>(true);
    const [sources, setSources] = useState<Source[]>([]);

    const SourceRowItem = (source: Source): ReactElement => {
        return (
            <View style={styles.sourceItemContainer}>
                <TouchableOpacity style={styles.sourceItemRow} onPress={() => updateSource(source.id)}>
                    <Icon name='globe' size={25} />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={styles.title}>{source.name}</Text>
                        <Text>{source.description}</Text>
                    </View>
                    <View style={styles.defaultItemStyle}>
                        {source.default && <Icon name="check" size={20} color={colors.green} />}
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    const getSources = async () => {
        const sourceFromStorage = await SessionManager.getData(storageKeys.NEWS_SOURCE_STORAGE_KEY);
        const { data } = await fetchSources();
        if (data) {
            const mappedData = data.sources.map((item: Source) => ({
                ...item,
                default: item.id === sourceFromStorage
            }));
            setSources(mappedData);
            setLoading(false);
        }
    }

    const updateSource = async (value: string) => {
        Alert.alert(
            'Update Default Source',
            'Are you sure you want to change the default source?"',
            [
                { text: 'NO', onPress: () => { }, style: 'cancel' },
                {
                    text: 'YES', onPress: async () => {
                        setLoading(true);
                        await SessionManager.setData(storageKeys.NEWS_SOURCE_STORAGE_KEY, value);
                        getSources();
                    }
                },
            ]
        );
    }

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getSources();
        });
        return unsubscribe;
    }, [props.navigation]);

    return (
        <View style={styles.container}>
            {
                loading
                    ? <Loading />
                    : <FlatList data={sources}
                        keyExtractor={({ id }) => id}
                        renderItem={({ item }) => <SourceRowItem key={item.id} {...item} />} />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    sourceItemContainer: {
        borderBottomColor: colors.gray_100,
        borderBottomWidth: 1
    },
    sourceItemRow: {
        flexDirection: 'row',
        padding: 10
    },
    defaultItemStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    title: {
        color: colors.primary,
        fontWeight: 'bold',
        fontFamily: 'calibri',
        fontSize: 17
    }
});

export default SettingsScreen;