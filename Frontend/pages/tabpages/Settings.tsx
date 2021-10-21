import React, {FC, useState} from 'react'
import { View, Text, StyleSheet, Switch} from 'react-native'

export const Settings: FC = () => {
    const [darkMode, setDarkMode] = useState<boolean>(true);
    const [largeText, setLargeText] = useState<boolean>(false);
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


const GlobalStyles = StyleSheet.create({
    screenBgColor: {
        backgroundColor: 'black',
        height: '100%',
        padding: '5%',
    },
    
    mainScreenHeaderTitle: {
        fontSize: 28,
        color: 'white',   
        marginBottom: '5%',

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