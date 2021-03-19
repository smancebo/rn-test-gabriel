import React, { ReactElement } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Article from '../../models/article.model';
import * as colors from '../../utils/constants/colors';

interface Props {
    onBackPress?(): any
    article?: Article
    navigation?: any
}

function HeaderDetails(props: Props) {
    const article = props.article;
    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 10 }} onPress={props.onBackPress}>
                <Icon name="arrow-left" size={22} color={colors.primary} />
                <View style={{ flexDirection: 'row' }}>
                    <Image style={styles.thumbnail} source={{ uri: article?.urlToImage }} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.headingOne}>PART OF</Text>
                        <Text style={styles.headingTwo}>{article?.source.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <Icon name="font" size={22} color={colors.gray_200} />
                <Icon name="bookmark" size={22} color={colors.gray_200} />
                <Icon name="ellipsis-v" size={22} color={colors.gray_200} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        flexDirection: 'row',
        backgroundColor: colors.gray_300,
        elevation: 5
    },
    thumbnail: {
        height: 40,
        width: 30,
        marginLeft: 15
    },
    headingOne: {
        color: colors.gray_200,
        fontSize: 14,
    },
    headingTwo: {
        color: colors.primary,
        fontSize: 15,
        fontWeight: 'bold'
    }
});

export default HeaderDetails;