import React, {FC, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { StockProps } from '../../components/StockPreview';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faAlignJustify, faCaretUp, faCaretDown} from '@fortawesome/free-solid-svg-icons'
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, RootTabParamList, StackRoutes, TabRoutes} from '../../routes';
import { ScrollGraphNav } from '../../components/ScrollGraphNav';
import { useNavigation } from '@react-navigation/core';
import { GlobalDarkStyles, GlobalLightStyles, largeFontSizes, regularFontSizes } from '../globalstyles';
import { connect } from 'react-redux';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { toggleStates } from '../../reduxPath/reducers/toggles';
import { useDarkMode } from '../mainPageFunctions';
import { AreaChart, dataPlot } from '../../components/AreaChart';


interface StockContent extends toggleStates, StockProps {}

type fullStockProps = NativeStackScreenProps<RootStackParamList, StackRoutes.FullStock>;


const FullStockView: FC<StockContent> = (props) => {
    const [isGreen, setIsGreen] = useState<string>('black');

    let currentStyle = useDarkMode(props.isDark, darkStyles, lightStyles);
    const [arrowDirection, setArrowDirection] = useState<ReactJSXElement>(<FontAwesomeIcon icon={faCaretUp} size={28} color='green'/>)

    const [graphData, setGraphData] = useState<dataPlot[]>([]);
    useEffect(() => {
        let apiRes =  fetch('https://api.twelvedata.com/time_series?symbol=AAPL&interval=1day&apikey=d71724ce43e342f19aa946ce9d197a8a').then(res => res.json()).then(res => {
            let graphicalValues = res.values;
            let dataList: dataPlot[] = [];
            
            graphicalValues.map((data: any) => {
                let xValue = data.datetime.split('-');
                console.log('my day: ', new Date().getDay() - xValue[xValue.length - 1]);
                dataList?.push({x:  parseInt(xValue[xValue.length-1]), y: parseFloat(data.close)})
            })
            setGraphData(dataList)
            return graphData
        })
    }, [])
    
    return (
        <View style={{backgroundColor: 'black', height: '100%',}}>
            <View style={currentStyle.headContainer}>
                <View style={currentStyle.nav}>
                    {/* <FontAwesomeIcon icon={ faCoffee }/> */}
                    <Text style={currentStyle.textContent}>APPLE INC.</Text>
                    <View style={currentStyle.directPriceContent}>
                        <Text style={currentStyle.currPrice}>205</Text>
                        {arrowDirection}
                        <Text style={[currentStyle.percentMove]}>$2.29</Text>

                        <Text style={[currentStyle.percentMove]}>(1.25%)</Text>
                    </View>
                </View>
                <ScrollGraphNav/>

                <View style={currentStyle.mainNavContent}>
                    <Text style={currentStyle.textContent}>{props.companyName}</Text>
                    <Text>{props.dayPercentMove}</Text>
                </View>
                <AreaChart height='50%' width='100%' xAxisVisible={true} yAxisVisible={true} data={[
                { x: parseInt('-1'), y: 10 },

            ]} xTickValue={graphData.map(data => data.x)}></AreaChart>
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
    headContainer: {
        // height: 100,
        padding: '2%',
        backgroundColor: 'darkred',
    },

    nav: {
        width: '100%', 
    },
  
    directPriceContent: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },


    currPrice: {
        fontSize: 32    ,
        fontWeight: '800',
        color: 'white',
    },
    percentMove: {
        fontSize: 16,
        fontWeight: '800',
        color: 'green',
    },
 
    mainNavContent: {
        
    }, 

    textContent: {
        color: 'white',
        fontSize: 16,
        // fontWeight: '700',
    }

})

const lightStyles = StyleSheet.create({
    ...darkStyles,
    headContainer: {
        ...darkStyles.headContainer,
        backgroundColor: '#43A6C6',
    },
    
    textContent: {
        ...darkStyles.textContent,
        color: 'lightblue',
    },

})