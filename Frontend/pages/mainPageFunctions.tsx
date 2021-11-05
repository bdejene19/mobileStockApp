import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faHome, faCog, faInfoCircle } from '@fortawesome/free-solid-svg-icons';


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