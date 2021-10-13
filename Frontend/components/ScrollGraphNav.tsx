import React, {FC, useState, useEffect, useMemo} from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView, Button, TouchableOpacity} from 'react-native';


export const ScrollGraphNav: FC = () => {
    const [graphOption, setGraphOption] = useState<string>();
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
                    <Text style={graphOption === navOptions.oneDay ? {color: 'orange'}: null}>{navOptions.oneDay}</Text>
                </TouchableOpacity>
            
                <TouchableOpacity onPress={() => setGraphOption(navOptions.pre)} style={styles.navItem}>
                    <Text style={graphOption === navOptions.pre ? {color: 'orange'}: null}>{navOptions.pre}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => setGraphOption(navOptions.post)} style={[styles.navItem, {borderRightColor: 'transparent'}]}>
                    <Text style={graphOption === navOptions.post ? {color: 'orange'}: null}>{navOptions.post}</Text>
                </TouchableOpacity>
            </ScrollView>

        </SafeAreaView>
     
    )
}

const styles = StyleSheet.create({
    navContainer: {
        width: '100%',
        padding: '1%',
        flexDirection: 'row',
        borderColor: 'white',
        borderRadius: 5,
        borderWidth: 2,
        
    },
    
    navItem: {
       
        width: 150,
        alignItems: 'center',
        borderRightColor: 'white',
        borderRightWidth: 1,
    }
})