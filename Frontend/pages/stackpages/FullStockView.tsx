import React, {FC, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { StockProps } from '../../components/StockPreview';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faAlignJustify, faCaretUp, faCaretDown} from '@fortawesome/free-solid-svg-icons'
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, RootTabParamList, StackRoutes, TabRoutes} from '../../routes';
import { ScrollGraphNav } from '../../components/ScrollGraphNav';
import { useNavigation } from '@react-navigation/core';
import { GlobalDarkStyles, GlobalLightStyles } from '../tabpages/Settings';
import { connect } from 'react-redux';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { toggleStates } from '../../reduxPath/reducers/toggles';


interface StockContent extends toggleStates {
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
    const [arrowDirection, setArrowDirection] = useState<ReactJSXElement>(<FontAwesomeIcon icon={faCaretUp} style={darkStyles.icon}/>)
    let [currentStyle, setCurrentStyle] = useState(darkStyles);

    useEffect(() => {
        // if (props.dayPercentMove !== null) {
        //     if (props.dayPercentMove >= 0) {
        //         setIsGreen('green')
        //         setArrowDirection(<FontAwesomeIcon icon={faCaretUp} style={darkStyles.icon}/>)
        //     } else {
        //         setIsGreen('red')
        //         setArrowDirection(<FontAwesomeIcon icon={faCaretDown} style={darkStyles.icon}/>)
        //     }
        // }
        props.isDark ? setCurrentStyle(darkStyles) : setCurrentStyle(lightStyles)

    }, [])

    return (
        <View style={props.isDark ? GlobalDarkStyles.screenBgColor : GlobalLightStyles.screenBgColor}>
            <View style={currentStyle.headContainer}>
                <View style={currentStyle.nav}>
                    {/* <FontAwesomeIcon icon={ faCoffee }/> */}
                    <Text style={currentStyle.textContent}>APPLE INC</Text>

                    <View style={currentStyle.directPriceContent}>
                        <Text style={[currentStyle.textContent, {color: isGreen}]}>$143.32</Text>
                        {arrowDirection}
                        <Text style={[currentStyle.percentMove, {color: isGreen}]}>1.25%</Text>
                    </View>
                </View>
                <ScrollGraphNav/>

                <View style={currentStyle.mainNavContent}>
                    <Text style={currentStyle.textContent}>{props.companyName}</Text>
                    <Text>{props.dayPercentMove}</Text>
                </View>

            </View>
        </View>
    )
}

const mapStateToProps = (state: any) => {
    let {toggleSwitches} = state;
    return toggleSwitches;
}

export default connect(mapStateToProps)(FullStockView);


const darkStyles = StyleSheet.create({
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

const lightStyles = StyleSheet.create({
    headWrap: {
        backgroundColor: 'aqua',
    },
    headContainer: {
        // height: 100,
        padding: '2%',
        // top: '50%',
        borderColor: 'blue',
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
        color: 'green',
    },
    mainNavContent: {
        
    }, 

    textContent: {
        color: 'lightblue',
        fontSize: 28,
        fontWeight: '700',
    }

})