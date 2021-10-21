import React, {FC, useEffect, useState} from 'react'
import { View, Text, StyleSheet, Switch} from 'react-native'
let bblack: string = ""
export const Settings: FC = () => {
    const [darkMode, setDarkMode] = useState<boolean>(true);
    const [largeText, setLargeText] = useState<boolean>(false);

    // NEED to figure out how to pass the state of settings through the rest of app
    // Should I call GlobalStyles at top level in App.tsx file => however, that doesn't stop the fact I need to access state 
    // alternatives would be using context.provider and useReducer => or redux
    // however, would using redux allow me to pass state sideways?

    return (
        <View style={GlobalStyles.screenBgColor}>
            <Text style={GlobalStyles.mainScreenHeaderTitle}>Visuals</Text>

            <View style={GlobalStyles.switchContainer}>
                <Text style={[GlobalStyles.contentText]}>Dark Mode</Text>
                <View style={GlobalStyles.toggle}>
                    <Switch value={darkMode} onValueChange={(value) => setDarkMode(value)} trackColor={{true: 'lime'}} ios_backgroundColor='white'></Switch>
                </View>
            </View>

            <View style={GlobalStyles.switchContainer}>
                <Text style={[GlobalStyles.contentText]}>Large Text</Text>
                <View style={GlobalStyles.toggle}>
                    <Switch value={largeText} onValueChange={(value) => setLargeText(value)} trackColor={{true: 'lime'}} ios_backgroundColor='white'></Switch>
                </View>
            </View>
        </View>
    )
}

export const GlobalStyles = StyleSheet.create({
    screenBgColor: {
        backgroundColor: 'black',
        height: '100%',
        padding: '5%',
    },
    
    mainScreenHeaderTitle: {
        fontSize: 28,
        color: 'orange',   
        marginBottom: '5%',
        fontWeight: '700',

    },

    switchContainer: {
        flexDirection: 'row',
        // marginTop: '5%',
        height: '10%',
        alignItems: 'center',
        borderTopColor: 'white',
        borderTopWidth: 3,
    },

    contentText: {
        color: 'white',
        fontSize: 20,
        flexBasis: '60%',
     
    },

    toggle: {
        textAlign: 'right',
        flexBasis: '40%',
        alignItems: 'flex-end',
    }

})