import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as colors from '../../utils/constants/colors';

interface Props { }
const HeaderAction = (props: Props) => {
    return (
        <View style={styles.container}>
            <Icon name='bell' size={20} color={colors.gray_200} />
            <Icon style={{ marginLeft: 30, marginTop: 3 }} name='search' size={18} color={colors.gray_200} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 20,
    }
});

export default HeaderAction;