import React, {FC, useEffect, useState} from 'react'
import { View, Text } from 'react-native';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home  from './tabpages/Home';
import { RootTabParamList,TabRoutes } from '../routes';
import { faHome, faCog, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import SupportList from './tabpages/SupportList';
import Settings  from './tabpages/Settings';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { toggleStates } from '../reduxPath/reducers/toggles';
import { connect } from 'react-redux';
import { handleTabIcon } from './mainPageFunctions';



const Main: FC<toggleStates> = (props) => {
    // creating stack data structure to navigate between pages
    const RootTab = createBottomTabNavigator();
    const darkTabScreenOptions: BottomTabNavigationOptions = {
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

    const lightTabScreenOptions: BottomTabNavigationOptions = {
        ...darkTabScreenOptions, 
        tabBarStyle: {
            backgroundColor: 'slateblue',
        },
        headerStyle: {
            backgroundColor: 'slateblue',
        }
    }

    const [currentTabSelection, setTabStyle] = useState<BottomTabNavigationOptions>(darkTabScreenOptions);

    useEffect(() => {
        if (props.isDark) {
            setTabStyle(darkTabScreenOptions);
        } else {
            setTabStyle(lightTabScreenOptions);
        }

     },[props.isDark])
     
    return (
        //  Note: navigation container needs to be at top level to render => simple issue but causes problems 
        <NavigationContainer>
            {/* This is similar to creating a switch with react-router => it holds our different routes for our screens */}
            <RootTab.Navigator screenOptions={({route}) => ({tabBarIcon: ({focused, size, color}) => {
                return handleTabIcon(focused, route.name);
                }, ...currentTabSelection})}>
                <RootTab.Screen name={TabRoutes.Home} component={Home} options={{tabBarAllowFontScaling: true,}}/>
                <RootTab.Screen name={TabRoutes.SupportedTickers} component={SupportList} options={{tabBarAllowFontScaling: true}}/>
                <RootTab.Screen name={TabRoutes.Settings} component={Settings} options={{tabBarAllowFontScaling: true}}/>
            </RootTab.Navigator>
        </NavigationContainer>
    )
}

const mapStateToProps = (state: any): toggleStates => {
    let {toggleSwitches} = state;
    return toggleSwitches;
}

export default connect(mapStateToProps)(Main);
