import React, {FC, useEffect, useState} from 'react'
import { View, Text, StyleSheet, Switch, SwitchProps} from 'react-native';
import { toggleDarkMode, toggleLargeText } from '../../reduxPath/actions';
import {connect, useSelector, useDispatch} from 'react-redux'
import { toggleStates } from '../../reduxPath/reducers/toggles';

// this is my COMPONENT interface => i am inheriting the toggleStates interface from my toggles reducer 
// by doing so, I can map my state and dispatch actions using proops
interface settingsProps extends toggleStates {
    toggleDarkMode: (value: boolean) => void,
    toggleLargeText: (value: boolean) => void,
}

// note: for my props type => it needs to extend the types for my states from redux, my dispatch types, and other types for the component itself
/** e.g. interface Props extends ReduxStateProps, DispactActionProps
 * - the interface for Props is where you would put your component specific types
 * 
 */
const Settings: FC<settingsProps> = (props) => {
    // const [darkMode, setDarkMode] = useState<boolean>(darkTheme);
    // const [largeText, setLargeText] = useState<boolean>(largeTextTheme);


    // NEED to figure out how to pass the state of settings through the rest of app
    // Should I call GlobalDarkStyles at top level in App.tsx file => however, that doesn't stop the fact I need to access state 
    // alternatives would be using context.provider and useReducer => or redux
    // however, would using redux allow me to pass state sideways?

    return (
        <View style={[props.isDark ? GlobalDarkStyles.screenBgColor : GlobalLightStyles.screenBgColor]}>
            <Text style={[GlobalDarkStyles.mainScreenHeaderTitle, props.isDark ? {color: 'orange'} : {color: 'slateblue'}]}>Visuals</Text>

            <View style={[props.isDark ? GlobalDarkStyles.switchContainer : GlobalLightStyles.switchContainer]}>
                <Text style={[props.isDark ? GlobalDarkStyles.contentText : GlobalLightStyles.contentText]}>Dark Mode</Text>
                <View style={GlobalDarkStyles.toggle}>
                    <Switch value={props.isDark} onValueChange={(value) => props.toggleDarkMode(value)} trackColor={{true: 'lime'}} ios_backgroundColor='white'></Switch>
                </View>
            </View>

            <View style={[props.isDark ? GlobalDarkStyles.switchContainer : GlobalLightStyles.switchContainer]}>
                <Text style={[GlobalDarkStyles.contentText, props.isDark ? {color: 'white'} : {color: 'lightblue'}]}>Large Text</Text>
                <View style={GlobalDarkStyles.toggle}>
                    <Switch value={props.isLarge} onValueChange={(value) => props.toggleLargeText(value)} trackColor={{true: 'lime'}} ios_backgroundColor='white'></Switch>
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
 const mapStateToProps = (state: any): settingsProps => {
     let {toggleSwitches} = state;
    return toggleSwitches
    
}


const mapDispatchToProps = (state: any): toggleStates => {return state}

export default connect(mapStateToProps, {toggleDarkMode, toggleLargeText})(Settings);

export const GlobalDarkStyles = StyleSheet.create({
    screenBgColor: {
        height: '100%',
        padding: '2%',
        backgroundColor: 'black',
    },
    
    mainScreenHeaderTitle: {
        fontSize: 28,
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


export const GlobalLightStyles = StyleSheet.create({
    screenBgColor: {
        ...GlobalDarkStyles.screenBgColor,
        backgroundColor: 'white'
    },

    switchContainer: {
        ...GlobalDarkStyles.switchContainer,
        borderTopColor: 'lightblue',
    }, 
    
    contentText: {
        ...GlobalDarkStyles.contentText, 
        color: 'lightblue',
    }
})