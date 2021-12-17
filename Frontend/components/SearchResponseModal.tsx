import React, { useContext, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Animated, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useDarkMode } from '../pages/mainPageFunctions';
import { toggleStates } from '../reduxPath/reducers/toggles';
import { SearchContentProvider } from './SearchProvider';


export const SearchResponseModal = () => {
    let {isDark, isLarge} = useSelector((state: any): toggleStates => state.toggleSwitches)
    let colorTheme = useDarkMode(isDark, darkStyles, lightStyles);
    const {isModalOpen} = useContext(SearchContentProvider);
    // reference to modal original position;
    const modalSlideAnim = useRef(new Animated.Value(500)).current;
    const modalzIndexVal = useRef(new Animated.Value(-1)).current;

    useEffect(() => {
        if (isModalOpen) {
            handleModal(isModalOpen);
        } else {
            
        }

    }, [isModalOpen])

    const handleModal = (modalState: boolean) => {

        if (modalState) {
            Animated.timing(modalSlideAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
    
            Animated.timing(modalzIndexVal, {
                toValue: 2,
                duration: 0,
                useNativeDriver: true,
            }) 
        } else {
            Animated.timing(modalSlideAnim, {
                toValue: 500,
                duration: 500,
                useNativeDriver: true,
            }).start();
    
            Animated.timing(modalzIndexVal, {
                toValue: -1,
                duration: 0,
                useNativeDriver: true,
            })
        }
       
    }

    return (
            <View>
                {/* <Button title='slide' onPress={() => openModal()}/> */}
                <Animated.View style={[colorTheme.modalWrapper, {transform: [{translateY: modalSlideAnim}], zIndex: modalzIndexVal}]}>
                    <ScrollView scrollEnabled>
                        <Text style={colorTheme.searchResItem}></Text>
                    </ScrollView>

                </Animated.View>
            </View>


    )

}

const darkStyles = StyleSheet.create({
    modalWrapper: {
        height: 700,
        width: '100%',
        backgroundColor: 'darkgrey',
        position: 'absolute',
        top: '100%',
        // left: '2%',
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


