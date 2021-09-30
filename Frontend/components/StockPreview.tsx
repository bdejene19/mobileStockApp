import React, {FC, useState} from "react";
import {View, StyleSheet, Text} from 'react-native';

export interface StockProps {
    ticker: string,
    companyName: string,
    stockValue: number,
    dayPercentMove: number,
    bgColor?: string,
}

export const StockPreview: FC<StockProps> = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.companyNameWrapper}>
                <Text style={styles.header}>{props.ticker}</Text>
                <Text style={styles.subHeader}>{props.companyName}</Text>

            </View>

            <View style={styles.dayGraph}>
            </View>
            
            <View style={styles.numbersContainer}>
                <Text style={styles.stockPrice}>{props.stockValue}</Text>
                <View style={styles.dependentBG}>
                    <Text>{props.dayPercentMove}%</Text>
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: 'center',
        backgroundColor: 'skyblue',
        shadowColor: 'black',
        shadowOffset: {width: 299, height: 300},
        height: 70,
        padding: '1%',
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
        borderWidth: 3,
        borderColor: '#f0fc',
    },

    numbersContainer: {
        width: '20%',
        height: '100%',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#f0fc'
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
        width: 40,
        padding: '1%',
        paddingTop: '5%',
        paddingBottom: '5%',
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 5,
        
    }
    
})