import React, {FC} from "react";
import {View, StyleSheet, Text} from 'react-native';

interface StockProps {
    ticker: string,
    companyName: string,
    stockValue: number,
    dayPercentMove: number,
}

export const StockPreview: FC<StockProps> = (props) => {
    return (
        <View style={styles.container}>
                        <Text style={{flexBasis: '45%', paddingLeft:'8%'}}>Second</Text>

            <View style={styles.textWrapper}>
            <Text>This should be my first div</Text>
            

            </View>

            <View style={styles.textWrapper}>
            <Text>Hello  {props.ticker}</Text>


            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: 'center',
        // height: 500,
    },

    textWrapper: {
        flexBasis: "55%",
        fontWeight: "600",
        borderStyle: "solid",
        marginBottom: '5%',
        height: 70,

        
        borderWidth: 3,
        borderColor: '#f0fc',
    }
})