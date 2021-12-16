import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { useDarkMode } from '../pages/mainPageFunctions';
import { toggleStates } from '../reduxPath/reducers/toggles';


export const SearchResponseModal = () => {
    let {isDark, isLarge} = useSelector((state: any): toggleStates => state.toggleSwitches)
    let colorTheme = useDarkMode(isDark, darkStyles, lightStyles);
    
    return (
        <View style={[colorTheme.modalWrapper, {transform: [{translateX: 100}], transition: 1000}]}>
            <ScrollView scrollEnabled>
                <Text style={colorTheme.searchResItem}></Text>
            </ScrollView>
        </View>
    )
}

const darkStyles = StyleSheet.create({
    modalWrapper: {
        height: '95%',
        width: '100%',
        backgroundColor: 'darkgrey',
        position: 'absolute',
        top: '100%',
        left: '2%',
        zIndex: 2,
    },

    searchResItem: {
        color: 'white',
    }
})

const lightStyles = StyleSheet.create({
    modalWrapper: {
        ...darkStyles.modalWrapper,
        backgroundColor: 'green',
    }
})


