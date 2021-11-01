import React, {FC, useState, useEffect, useMemo} from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView, Button, TouchableOpacity} from 'react-native';


export const ScrollGraphNav: FC = () => {
    const [graphOption, setGraphOption] = useState<string>('1D');
    const navOptions = useMemo(() => {
        return {
            oneDay: '1D',
            pre: 'Pre-Market',
            post: 'Post-Market',
        }
    }, [])

    let navBtnStyle = 

    useEffect(() => {

    }, [graphOption])


    return (
        <SafeAreaView>
            <ScrollView style={styles.navContainer} horizontal scrollEnabled disableIntervalMomentum scrollToOverflowEnabled={true}>
                <TouchableOpacity onPress={() => setGraphOption(navOptions.oneDay)} style={styles.navItem}>
                    <Text style={graphOption === navOptions.oneDay ? {color: 'orange'}: {color: 'white'}}>{navOptions.oneDay}</Text>
                </TouchableOpacity>
            
                <TouchableOpacity onPress={() => setGraphOption(navOptions.pre)} style={styles.navItem}>
                    <Text style={graphOption === navOptions.pre ? {color: 'orange'}: {color: 'white'}}>{navOptions.pre}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => setGraphOption(navOptions.post)} style={[styles.navItem, {borderRightColor: 'transparent'}]}>
                    <Text style={graphOption === navOptions.post ? {color: 'orange'}: {color: 'white'}}>{navOptions.post}</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    navContainer: {
        width: '100%',
        height: '20%',
        flexDirection: 'row',
        borderWidth: 1.5,
        borderColor: 'white',
        borderRadius: 7,
        
    },
    
    navItem: {
        width: 150,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRightColor: 'white',
        borderRightWidth: 1,
        textTransform: 'none',
    }
})