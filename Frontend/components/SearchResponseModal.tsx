import React, { useContext, useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, Animated, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useDarkMode } from '../pages/mainPageFunctions';
import Stock from '../reduxPath/reducers/stockClass';
import { toggleStates } from '../reduxPath/reducers/toggles';
import { SearchContentProvider } from './SearchProvider';


export const SearchResponseModal = () => {
    let {isDark, isLarge} = useSelector((state: any): toggleStates => state.toggleSwitches)
    let colorTheme = useDarkMode(isDark, darkStyles, lightStyles);
    const {isModalOpen, apiResponse} = useContext(SearchContentProvider);
    // reference to modal original position;
    const modalSlideAnim = useRef(new Animated.Value(500)).current;
    const modalOpacityVal = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isModalOpen) {
            handleModal(isModalOpen);
            setModalIndex(2)
        } else {
            handleModal(isModalOpen);
            setModalIndex(-1);
        }

    }, [isModalOpen])

    const handleModal = (modalState: boolean) => {

        // handling modal open
        if (modalState) {
            Animated.timing(modalSlideAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();

            Animated.timing(modalOpacityVal, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start()
        //  handle modal close
        } else {
            Animated.timing(modalSlideAnim, {
                toValue: 500,
                duration: 500,
                useNativeDriver: true,
            }).start();

            Animated.timing(modalOpacityVal, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
    
        }
       
    }
    const [modalindex, setModalIndex] = useState(-1)
    return (
            <View style={{zIndex: modalindex}}>
                {/* <Button title='slide' onPress={() => openModal()}/> */}
                <Animated.View style={[colorTheme.modalWrapper, {transform: [{translateY: modalSlideAnim}], opacity: modalOpacityVal}]}>
                    <ScrollView scrollEnabled>
                        <Text style={colorTheme.searchResItem}></Text>
                        <View>
                        {apiResponse.map((item: any) => {
                        })}
                    </View>
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


