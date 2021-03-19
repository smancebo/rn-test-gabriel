import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import * as colors from '../utils/constants/colors';

//screens and components
import { DrawerIcon, HeaderAction, HeaderDetails, DrawerContent } from '../components/layouts'
import NewsScreen from '../screens/news/News';
import DetailsScreen from '../screens/news/NewsDetails'
import SourceScreen from '../screens/source/SourceScreen'

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

type TypeStackProp = StackNavigationProp<{
    StackNavigation: undefined,
    Home: undefined,
    Details: undefined
}, 'StackNavigation'>

interface StackProps {
    navigation: TypeStackProp,
    route?: any
}

//stack navigation
function HomeStackNavigation({ navigation }: StackProps) {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: colors.primary
            },
            headerTintColor: colors.white,
            headerLeft: () => <DrawerIcon navigationProps={navigation} />,
            headerRight: () => <HeaderAction />,
        }}>
            <Stack.Screen
                name="Home"
                component={NewsScreen} />
            <Stack.Screen
                name="Details"
                component={DetailsScreen}
                options={{
                    header: ({ scene, navigation }) => <HeaderDetails
                        onBackPress={() => navigation.goBack()}
                        article={scene.route.params} />
                }} />
        </Stack.Navigator>
    );
}

function SourceStackNavigation({ navigation }: StackProps) {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: colors.primary
            },
            headerTintColor: colors.white,
            headerLeft: () => <DrawerIcon navigationProps={navigation} />
        }}>
            <Stack.Screen
                name="Sources"
                component={SourceScreen} />
        </Stack.Navigator>
    );
}

//drawer navigation
function DrawerNavigation() {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={({ navigation, state }) => <DrawerContent navigation={navigation} state={state} />}>
            <Drawer.Screen name="Home" component={HomeStackNavigation} />
            <Drawer.Screen name="Sources" component={SourceStackNavigation} />
        </Drawer.Navigator>
    )
}

export const AppNavigation = () => (
    <NavigationContainer>
        <DrawerNavigation />
    </NavigationContainer>
);

export default AppNavigation;