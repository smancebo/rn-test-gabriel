import React, { ReactElement } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Article from '../../../models/article.model';
import * as colors from '../../../utils/constants/colors';
import { getFromNow, getShortDate } from '../../../utils/dateUtils';

interface Props {
    article: Article,
    navigation?: any
}
const ArticleItem = (props: Props): ReactElement => {
    const article = props.article;
    const navigation = props.navigation;
    return (
        <View style={styles.container}>
            <Text style={styles.readingTitle}>BASED ON YOUR READING HISTORY</Text>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <View style={{ flex: 3 }}>
                    <TouchableOpacity onPress={() => navigation.push('Details', { ...article })}>
                        <Text style={styles.mainTitle}>{article.title}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-end' }}>
                    <Image style={styles.picture} source={{ uri: article.urlToImage }} />
                </View>
            </View>
            <View style={{ marginVertical: 12, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: colors.primary, fontSize: 15, fontWeight: '600' }}>{article.author}</Text>
                    <Text style={{ color: colors.gray_200, fontSize: 13 }}>{getShortDate(article.publishedAt)} - {getFromNow(article.publishedAt)} read</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 10 }}>
                    <Icon name="bookmark" size={20} color={colors.gray_200} />
                    <Icon style={{ marginLeft: 24 }} name="ellipsis-v" size={20} color={colors.gray_200} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: colors.white,
        borderBottomColor: colors.gray_100,
        borderBottomWidth: 1
    },
    readingTitle: {
        color: colors.gray_200,
        fontSize: 13
    },
    mainTitle: {
        color: colors.primary,
        fontWeight: 'bold',
        fontFamily: 'calibri',
        fontSize: 17
    },
    picture: {
        height: 80,
        width: 80
    }
});

export default ArticleItem;