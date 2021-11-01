import React, {FC, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { StockProps } from '../../components/StockPreview';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faAlignJustify, faCaretUp, faCaretDown} from '@fortawesome/free-solid-svg-icons'
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, RootTabParamList, StackRoutes, TabRoutes} from '../../routes';
import { ScrollGraphNav } from '../../components/ScrollGraphNav';
import { useNavigation } from '@react-navigation/core';
import { GlobalStyles } from '../tabpages/Settings';
import { connect } from 'react-redux';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';


interface StockContent {
    ticker: string,
    name: string,
    currentPrice: number,
    percentageMove: number,
    companyName: string,
    dayPercentMove: number,
}

type fullStockProps = NativeStackScreenProps<RootStackParamList, StackRoutes.FullStock>;


const FullStockView: FC<StockContent> = (props) => {
    const [isGreen, setIsGreen] = useState<string>('black');
    const [arrowDirection, setArrowDirection] = useState<ReactJSXElement>(<FontAwesomeIcon icon={faCaretUp} style={styles.icon}/>)

    useEffect(() => {
        if (props.dayPercentMove !== null) {
            if (props.dayPercentMove >= 0) {
                setIsGreen('green')
                setArrowDirection(<FontAwesomeIcon icon={faCaretUp} style={styles.icon}/>)
            } else {
                setIsGreen('red')
                setArrowDirection(<FontAwesomeIcon icon={faCaretDown} style={styles.icon}/>)
            }
        }
    }, [    ])

    return (
        <View style={GlobalStyles.screenBgColor}>
            <View style={styles.headContainer}>
                <View style={styles.nav}>
                    {/* <FontAwesomeIcon icon={ faCoffee }/> */}
                    <Text style={styles.textContent}>APPLE INC</Text>

                    <View style={styles.directPriceContent}>
                        <Text style={[styles.textContent, {color: isGreen}]}>$143.32</Text>
                        {arrowDirection}
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

const mapStateToProps = (state: StockContent) => {
    return {
        currentPrice: state.currentPrice,
    }
}

export default connect(mapStateToProps)(FullStockView);


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