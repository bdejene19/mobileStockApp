import React, {FC, useEffect, useState} from 'react'
import { View, Text, StyleSheet, Switch} from 'react-native';
import { toggleDarkMode, toggleLargeText } from '../../reduxPath/actions';
import {connect} from 'react-redux'

interface settingsProps {
    darkTheme: boolean ,
    largeTextTheme: boolean,
}
const Settings: FC<settingsProps> = ({darkTheme = true, largeTextTheme }) => {
    const [darkMode, setDarkMode] = useState<boolean>(darkTheme);
    const [largeText, setLargeText] = useState<boolean>(largeTextTheme);

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

// mapStateToProps => used for connecting necessary data from store into component
/**
 *  Takes in 2 parameters => 1) state (the entire redux store - however,calling it store would be 'incorrect' since it is a state value)
 *  the Second parameter is ownProps (optional) -> used if a component requires its own props to retrieve data from the store
 * 
 * NOTE: mapStateToProps => return a plain object that contains the data the component needs
 * 
 */
//  const mapStateToProps = (state: settingsProps) => {
//     let { settings } = state;
//     console.log(settings);
//     return {
//         settings
//     }
    
// }

export default connect(null, { toggleDarkMode, toggleLargeText}, )(Settings);

export const GlobalStyles = StyleSheet.create({
    screenBgColor: {
        backgroundColor: 'black',
        height: '100%',
        padding: '2%',
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