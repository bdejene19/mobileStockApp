import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import 'react-native-gesture-handler';

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/core";
import React, {FC, ReactNode, useState, Suspense} from "react";
import {View, StyleSheet, Text,} from 'react-native';

import { Swipeable} from "react-native-gesture-handler";
import {dataPlot, AreaChart} from "./AreaChart";
import { useAnimatedGestureHandler } from "react-native-reanimated";

export interface StockProps {
    ticker: string | null,
    currentPrice: number,
    companyName: string | null,
    dayPercentMove: number | string,
    volume?: number,
    exchange?: string | null,
    graphData: dataPlot[],
}




export const StockPreview: FC<StockProps> = (props) => {

    const DeleteButton: FC = () => {
        return (
            <View style={styles.deleteWrapper}>
                <FontAwesomeIcon icon={faMinusCircle} size={30} style={{color: 'white'}}/>
            </View>)
    } 
    return (
        <Swipeable  renderRightActions={() => <DeleteButton/>}>

        <Suspense fallback={<Text>hi</Text>}>
            <View style={styles.container}>
                <View style={styles.companyNameWrapper}>
                    <Text style={styles.header}>{props.ticker}</Text>
                    <Text style={styles.subHeader}>{props.companyName}</Text>
                </View>

                <View style={styles.dayGraph}>
                    {/* <AreaChart data={props.graphData.map(data => data)} height='100%' width='100%'></AreaChart> */}
                    <AreaChart data={props.graphData} height='100%' width='100%' xAxisVisible={true} yAxisVisible={false}></AreaChart>
                    {/* [  { x: -2.34, y: 15 },
                { x: -1, y: 10 },
                { x: 0, y: 12 },
                { x: 1, y: 7 },
                { x: 2, y: 6 },
                { x: 3, y: 3 },
                { x: 4, y: 5 },
                { x: 5, y: 8 },
                { x: 6, y: 12 },
                { x: 7, y: 14 },
                { x: 8, y: 12 },
                { x: 9, y: 13.5 },
                { x: 10, y: 18 },] */}
                </View>
                
                <View style={styles.numbersContainer}>
                    <Text style={styles.stockPrice}>{props.currentPrice}</Text>
                    <View style={[styles.dependentBG, props.dayPercentMove < 0 ? {backgroundColor: 'red'} : {backgroundColor: 'green'}]}>
                        <Text>{(props.dayPercentMove)}%</Text>
                    </View>
                </View>

            </View>
        </Suspense>
        </Swipeable>


    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: 'center',
        backgroundColor: 'skyblue',
        shadowColor: 'white',
        height: 70,
        borderRadius: 15,
        
        
        // height: 500,
    },

    companyNameWrapper: {
        width: "30%",
        fontWeight: "600",
        height: '100%',
        borderStyle: "solid",
        paddingLeft: '3%',
        // alignItems: 'left',
        justifyContent: 'center',
        // marginBottom: '5%',
        
    },
    
    dayGraph: {
        alignItems: 'center',
        justifyContent: 'center',
        height: "100%",
        width: '50%',
    },

    numbersContainer: {
        width: '20%',
        height: '100%',
        alignItems: 'center',
    },

    header: {
        fontSize: 20,
        fontWeight: '800',
        justifyContent: 'flex-start',

    },

    subHeader: {
        fontSize: 12,
        fontWeight: "600",
    },

    stockPrice: {
        fontSize: 20,
        fontWeight: "700",
    },

    dependentBG: {
        width: '80%',
        padding: '1%',
        paddingTop: '5%',
        paddingBottom: '5%',
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 5,
        
    }, 

    deleteWrapper: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // width: '40%',
        padding: '5%',
    }
    
})