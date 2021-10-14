import React, {FC, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { StockProps } from '../../components/StockPreview';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faAlignJustify, faCaretUp} from '@fortawesome/free-solid-svg-icons'
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, RootTabParamList, StackRoutes, TabRoutes} from '../../routes';
import { ScrollGraphNav } from '../../components/ScrollGraphNav';
import { useNavigation } from '@react-navigation/core';


interface StockContent {
    ticker: string,
    name: string,
    currentPrice: number,
    percentageMove: number,
    companyName: string,
    dayPercentMove: number,
}

type fullStockProps = NativeStackScreenProps<RootStackParamList, StackRoutes.FullStock>;


export const FullStockView: FC<StockContent> = (props) => {
    const [isGreen, setIsGreen] = useState<string>('black');
    const [arrowDirection, setArrowDirection] = useState()

    useEffect(() => {
        if (props.dayPercentMove !== null) {
            if (props.dayPercentMove >= 0) {
                setIsGreen('green')
            } else {
                setIsGreen('red')
            }
        }
    }, [    ])

    return (
        <View style={styles.headWrap}>
            <View style={styles.headContainer}>
                <View style={styles.nav}>
                    {/* <FontAwesomeIcon icon={ faCoffee }/> */}
                    <Text style={styles.textContent}>APPLE INC</Text>

                    <View style={styles.directPriceContent}>
                        <Text style={[styles.textContent, {color: isGreen}]}>$143.32</Text>
                        <FontAwesomeIcon icon={faCaretUp} style={styles.icon}></FontAwesomeIcon>
                        <Text style={[styles.percentMove, {color: isGreen}]}>1.25%</Text>
                    </View>
                </View>
                <ScrollGraphNav/>

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
        backgroundColor: 'black',


    },
    headContainer: {
        // height: 100,
        padding: '2%',
        // top: '50%',
        borderColor: 'green',
        borderWidth: 2,


    },

    nav: {
        width: '100%',
       
    },
  
    directPriceContent: {
        flexDirection: 'row',
        width: '100%',
    },

    percentMove: {
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'black'
    },
    icon: {
        fontSize: 32,
        color: 'white',
    },
    mainNavContent: {
        
    }, 

    textContent: {
        color: 'white',
        fontSize: 28,
        fontWeight: '700',
    }

})