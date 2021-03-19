import React, { ReactElement, useState } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import { WebView } from 'react-native-webview';
import Article from '../../models/article.model';

type Props = {
    route?: any,
    navigation?: any
}
function NewsDetails(props: Props): ReactElement {
    const article: Article = props.route.params
    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: article.url }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default NewsDetails;
