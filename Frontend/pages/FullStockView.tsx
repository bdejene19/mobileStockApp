import React, {FC} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { StockProps } from '../components/StockPreview';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, Routes} from '../routes';
import { useNavigation } from '@react-navigation/core';


interface StockContent {
    ticker: string,
    name: string,
    currentPrice: number,
    percentageMove: number,
    companyName: string,
    dayPercentMove: number,
}

type fullStockProps = NativeStackScreenProps<RootStackParamList, Routes.FullStock>;


export const FullStockView: FC<StockContent> = (props) => {
    return (
        <View style={styles.headWrap}>
            <View style={styles.headContainer}>
                <Text>Page 2222</Text>
                <View style={styles.nav}>
                    {/* <FontAwesomeIcon icon={ faCoffee }/> */}
                    <Text style={styles.textContent}>{props.ticker}</Text>
                </View>

                <View style={styles.mainNavContent}>
                    <Text style={styles.textContent}>{props.companyName}</Text>
                    <Text>{props.dayPercentMove}</Text>
                </View>

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    headWrap: {
        backgroundColor: 'slateblue',
        height: '45%',


    },
    headContainer: {
        width: '100%',
        // height: 100,
        padding: '2%',
        top: '50%',


    },

    nav: {
        width: '100%',
        flexBasis: '35%',
        flexDirection: 'row',
       
    },
  
    mainNavContent: {
        flexBasis: '65%',
        
    }, 

    textContent: {
        color: 'white',
        fontSize: 24,
    }

})