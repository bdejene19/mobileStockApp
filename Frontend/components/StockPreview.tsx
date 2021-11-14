import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/core";
import React, {FC, ReactNode, useState, Suspense} from "react";
import {View, StyleSheet, Text,} from 'react-native';
import 'react-native-gesture-handler';

// import { Swipeable } from "react-native-gesture-handler";
import TestLineChart from "./TestLineChart";

export interface StockProps {
    ticker: string | null,
    currentPrice: number,
    companyName: string | null,
    dayPercentMove: number | string,
    volume?: number,
    exchange?: string | null,
}



export const StockPreview: FC<StockProps> = (props) => {

    const deleteButton: ReactNode = <View style={styles.deleteWrapper}>
                                        <FontAwesomeIcon icon={faMinusCircle} size={30} style={{color: 'white'}}/>
                                    </View>
    return (
        <Suspense fallback={<Text>hi</Text>}>

            <View style={styles.container}>
                <View style={styles.companyNameWrapper}>
                    <Text style={styles.header}>{props.ticker}</Text>
                    <Text style={styles.subHeader}>{props.companyName}</Text>
                </View>

                <View style={styles.dayGraph}>
                    <TestLineChart></TestLineChart>
                </View>
                
                <View style={styles.numbersContainer}>
                    <Text style={styles.stockPrice}>{props.currentPrice}</Text>
                    <View style={styles.dependentBG}>
                        <Text>{props.dayPercentMove}%</Text>
                    </View>
                </View>

            </View>
        </Suspense>

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
        width: '100%',
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