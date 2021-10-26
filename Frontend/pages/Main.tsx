import React from 'react'
import { View, Text } from 'react-native';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home  from './tabpages/Home';
import { RootTabParamList,TabRoutes } from '../routes';
import { faHome, faCog, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { SupportList } from './tabpages/SupportList';
import Settings  from './tabpages/Settings';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';



export default function Main() {
    // creating stack data structure to navigate between pages
    const RootTab = createBottomTabNavigator();
    const screenOptions: BottomTabNavigationOptions = {
        tabBarStyle: {
            backgroundColor: 'orangered'
        }, 
        tabBarInactiveTintColor: 'black', 
        tabBarActiveTintColor: 'white', 
        headerStyle: { 
            backgroundColor: 'orangered'
        }, 
        headerTitleStyle: {
            // backgroundColor: 'black',
            color: 'white',
            fontSize: 24,
            fontWeight: '700',

        },
    }
    return (


        //  Note: navigation container needs to be at top level to render => simple issue but causes problems 
        <NavigationContainer>
            {/* This is similar to creating a switch with react-router => it holds our different routes for our screens */}
            <RootTab.Navigator screenOptions={({route}) => ({tabBarIcon: ({focused, size, color}) => {
            let inactive = 'black';
            if (focused) {
                inactive = 'white';
            } else {
                inactive = 'black';
            }

            let iconComponent: IconProp = faHome;
            if (route.name === 'Home') {
                iconComponent = faHome;
            } else if (route.name === 'Supported Tickers') {
                iconComponent = faInfoCircle;
            } else if (route.name === 'Settings') {
                iconComponent = faCog;
            }
            return <FontAwesomeIcon icon={iconComponent} size={25} color={inactive}/> ;
            }, ...screenOptions})}>
            <RootTab.Screen name={TabRoutes.Home} component={Home} options={{tabBarAllowFontScaling: true,}}/>
            <RootTab.Screen name={TabRoutes.SupportedTickers} component={SupportList} options={{tabBarAllowFontScaling: true}}/>
            <RootTab.Screen name={TabRoutes.Settings} component={Settings} options={{tabBarAllowFontScaling: true}}/>
            </RootTab.Navigator>
        </NavigationContainer>
    )
}
