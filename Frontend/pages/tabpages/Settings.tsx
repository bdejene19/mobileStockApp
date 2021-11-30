import React, {FC, useEffect, useState} from 'react'
import { View, Text, StyleSheet, Switch, SwitchProps} from 'react-native';
import { toggleDarkMode, toggleLargeText } from '../../reduxPath/actions';
import {connect, useSelector, useDispatch} from 'react-redux'
import { toggleStates } from '../../reduxPath/reducers/toggles';
import { useDarkMode, useLargeText } from '../mainPageFunctions';
import { GlobalDarkStyles, GlobalLightStyles, largeFontSizes, regularFontSizes } from '../globalstyles';

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
    // implementing custom hook to handle dark mode toggle; 
    let colorTheme = useDarkMode(props.isDark, GlobalDarkStyles, GlobalLightStyles);
    let fontSize = useLargeText(props.isLarge, regularFontSizes, largeFontSizes)
    return (
        <View style={colorTheme.screenBgColor}>
            <Text style={[colorTheme.mainScreenHeaderTitle, fontSize.mainHeaderSize]}>Visuals</Text>

            <View style={colorTheme.switchContainer}>
                <Text style={[colorTheme.contentText, fontSize.contentTextSize]}>Dark Mode</Text>
                <View style={colorTheme.toggle}>
                    <Switch value={props.isDark} onValueChange={(value) => props.toggleDarkMode(value)} trackColor={{true: 'lightorange'}} ios_backgroundColor='white'></Switch>
                </View>
            </View>

            <View style={colorTheme.switchContainer}>
                <Text style={[colorTheme.contentText, fontSize.contentTextSize]}>Large Text</Text>
                <View style={colorTheme.toggle}>
                    <Switch value={props.isLarge} onValueChange={(value) => props.toggleLargeText(value)} trackColor={{true: 'lightorange'}} ios_backgroundColor='white'></Switch>
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


export default connect(mapStateToProps, {toggleDarkMode, toggleLargeText})(Settings);

