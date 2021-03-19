import React, { useState, useEffect, ReactElement } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Dimensions,
    Animated,
    Platform
} from 'react-native';
import { Loading } from '../../components/common';
import { ArticleItem, ArticleItemCard } from './components';
import { fetchHeadlines } from '../../managers/NetworkManager';
import * as SessionManager from '../../managers/SessionManager';
import Article from '../../models/article.model';
import * as colors from '../../utils/constants/colors';
import * as storageKeys from '../../utils/constants/storageKeys';

//get screen width and set item size per platform
const { width: WINDOW_SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_SIZE = Platform.OS === 'ios'
    ? WINDOW_SCREEN_WIDTH * 0.72
    : WINDOW_SCREEN_WIDTH * 0.24;

interface NewsProps {
    articles: Article[],
    navigation?: any
}
const NewsCarousel = (props: NewsProps): ReactElement => {
    return (
        <View style={{ flex: 1, backgroundColor: colors.gray_300 }}>
            <Animated.FlatList data={props.articles}
                horizontal
                bounces={false}
                removeClippedSubviews={false}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                renderToHardwareTextureAndroid
                decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
                snapToInterval={ITEM_SIZE}
                snapToAlignment='center'
                scrollEventThrottle={16}
                keyExtractor={(item, index) => `article-${index}`}
                renderItem={({ item }) => <ArticleItemCard article={item} {...props} />}
                style={{ width: WINDOW_SCREEN_WIDTH + 5, height: '100%' }} />
        </View>
    );
};

const NewsList = (props: NewsProps): ReactElement => {
    return (
        <View style={{ flex: 1 }}>
            <FlatList data={props.articles}
                keyExtractor={(_, index) => `article-${index}`}
                renderItem={({ item }) => <ArticleItem article={item}  {...props} />} />
        </View>
    );
}

interface Props {
    navigation?: any
}
function News(props: Props) {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<Boolean>(true);

    const fetchArticles = async () => {
        const _sourceFromStorage = await SessionManager.getData(storageKeys.NEWS_SOURCE_STORAGE_KEY)
        if (!_sourceFromStorage) {
            await SessionManager.initializeDefaultSource();
        }
        const { data } = await fetchHeadlines(await SessionManager.getData(storageKeys.NEWS_SOURCE_STORAGE_KEY))
        if (data) {
            setArticles(data.articles)
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            setLoading(true);
            fetchArticles();
        });
        return unsubscribe;
    }, [props.navigation]);

    return (
        <View style={styles.container}>
            {
                loading
                    ? <Loading />
                    : <View style={{ flex: 1 }}>
                        <NewsCarousel articles={articles} {...props} />
                        <NewsList articles={articles} {...props} />
                    </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray_300
    }
});

export default News;