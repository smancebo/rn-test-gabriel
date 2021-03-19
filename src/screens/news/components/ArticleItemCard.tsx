import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React, { ReactElement } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Animated,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import Article from '../../../models/article.model';
import * as colors from '../../../utils/constants/colors';
import { getFromNow, getShortDate } from '../../../utils/dateUtils';

const { width: WINDOW_SCREEN_WIDTH } = Dimensions.get('window');

interface Props {
    article: Article,
    navigation?: any
}
const NewCardItem = (props: Props) => {
    const article = props.article
    const navigation = props.navigation;
    return (
        <Animated.View style={styles.container}>
            <View style={styles.card}>
                <View style={{ flex: 1 }}>
                    <Image style={styles.picture} source={{ uri: article.urlToImage }} resizeMode="cover" />
                </View>
                <View style={{ flex: 1, padding: 10 }}>
                    <TouchableOpacity onPress={() => navigation.push('Details', { ...article })}>
                        <Text style={styles.mainTitle}>{article.title}</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <Text style={{ color: colors.primary, fontSize: 15, fontWeight: '600' }}>{article.author}</Text>
                        <Text style={{ color: colors.gray_200, fontSize: 13 }}>{getShortDate(article.publishedAt)}  - {getFromNow(article.publishedAt)} read</Text>
                    </View>
                </View>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: colors.gray_300
    },
    card: {
        flex: 1,
        width: WINDOW_SCREEN_WIDTH - 80,
        height: '100%',
        flexDirection: 'column',
        backgroundColor: colors.white,
        borderRadius: 10,
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 8,
    },
    picture: {
        flex: 1,
        height: '100%',
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    mainTitle: {
        color: colors.primary,
        fontWeight: 'bold',
        fontFamily: 'calibri',
        fontSize: 17
    },
});

export default NewCardItem;