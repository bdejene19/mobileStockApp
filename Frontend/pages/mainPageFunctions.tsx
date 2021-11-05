import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faHome, faCog, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { StyleProp } from 'react-native';

// handles tab bar icons and focus event
export const handleTabIcon = (isFocused: boolean, routeName: string) => {
    let inactive = 'black';
    if (isFocused) {
        inactive = 'white';
    } else {
        inactive = 'black';
    }

    let iconComponent: IconProp = faHome;
    if (routeName === 'Home') {
        iconComponent = faHome;
    } else if (routeName === 'Supported Tickers') {
        iconComponent = faInfoCircle;
    } else if (routeName === 'Settings') {
        iconComponent = faCog;
    }
    return <FontAwesomeIcon icon={iconComponent} size={25} color={inactive}/> ;    
}

// custom hook to handle darkMode state changes
export const useDarkMode = (darkMode: boolean | undefined, darkStyle: StyleMedia, lightStyle: StyleMedia):StyleProp<any> => {
    let [currentStyle, setCurrentStyle] = useState(darkStyle);
    useEffect(() => {
        darkMode ? setCurrentStyle(darkStyle) : setCurrentStyle(lightStyle)
    }, [darkMode]);

    return currentStyle;
}