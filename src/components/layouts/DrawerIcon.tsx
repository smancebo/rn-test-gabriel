import React, { ReactElement } from 'react';
import {
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as colors from '../../utils/constants/colors';

interface Props {
    navigationProps: any
}
const DrawerIcon = (props: Props): ReactElement => {
    const toggleDrawer = () => {
        props.navigationProps.toggleDrawer();
    }
    return (
        <TouchableOpacity style={styles.container} onPress={() => toggleDrawer()}>
            <Icon name="bars" color={colors.gray_100} size={20} />
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        paddingHorizontal: 20,
        paddingVertical: 5
    }
})

export default DrawerIcon;