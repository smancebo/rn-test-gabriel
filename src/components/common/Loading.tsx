import React, { ReactElement } from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    Text
} from 'react-native';
import * as colors from '../../utils/constants/colors';

type Props = {
    text?: string
}
function Loading(props: Props): ReactElement {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text>{props.text ?? 'Loading, please wait...'}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Loading;