import React, {FC, useEffect, useState} from 'react'
import { View, Text, StyleSheet, SectionList, Linking, Button} from 'react-native';
import { connect } from 'react-redux';
import { toggleStates } from '../../reduxPath/reducers/toggles';
import { GlobalDarkStyles, GlobalLightStyles } from './Settings';
import { useDarkMode } from '../mainPageFunctions';


interface supportListProps extends toggleStates {} ;

const SupportList: FC<supportListProps> = (props) => {
    let currentStyle = useDarkMode(props.isDark, stylesDark, stylesLight);

    return (
        // <ScrollView style={stylesDark.screenContainer}>
            <View  style={props.isDark ? GlobalDarkStyles.screenBgColor : GlobalLightStyles.screenBgColor}>
                <Text style={currentStyle.contentText}>Due to TwelveData's free API tier, not all tickers are available for live-streaming data.</Text>
                <Text style={[currentStyle.contentText, {paddingTop: '5%'}]}>Here is a supported list of tickers:</Text>
                <SectionList scrollEnabled={false} style={{ maxHeight: '45%', minHeight: '45%',}} sections={supportedTickers} renderItem={({item}) => <BulletPoints listItem={item}></BulletPoints>} renderSectionHeader={({section: data}) => {
                    return (
                        <View>
                            <Text style={currentStyle.sectionHeader}>{data.title}</Text>
                            <View style={currentStyle.hr}></View>
                        </View>

                    )}}>
                </SectionList>
                <Text style={[currentStyle.contentText, {paddingBottom: '5%'}]}>For a more comprehensive list that TwelveData's free tier offers, visit:</Text>
                <View style={currentStyle.learnMore}>
                    <Button onPress={() => Linking.openURL('https://support.twelvedata.com/en/articles/5335783-trial')} title='Learn More'></Button>
                </View>
                

            </View>
        // </ScrollView>
    )
}

const mapStatetoProps = (state: any): supportListProps => {
    let {toggleSwitches} = state;
    return toggleSwitches
}

export default connect(mapStatetoProps)(SupportList);


interface bullet extends toggleStates {
    listItem: string,
}
const BulletPoints: FC<bullet> = (props) => {
    return (
        <View style={stylesDark.bulletPointContainer}>
            <Text style={props.isDark ? stylesDark.bullet : stylesLight.bullet}>{'\u2B24'}</Text>
            <Text style={props.isDark ? stylesDark.bulletContent : stylesLight.bulletContent}>{props.listItem}</Text>

        </View>

    )
}



const stylesDark = StyleSheet.create({
    contentText: {
        color: 'white',
        fontSize: 20,
    },

    sectionHeader: {
        fontSize: 20,
        color: 'orange',
        paddingTop: '5%',
        fontWeight: '700',
    },

    bulletPointContainer: {
        flexDirection: 'row',
        width: '100%',
        // justifyContent: 'center',
    },

    bullet: {
        color: 'white',
        fontSize: 8,
        alignSelf: 'center',
        paddingRight: '2%',

    },

    hr: {
      borderBottomColor: 'orange',
      borderBottomWidth: 1,
      width: '100%',
      paddingTop: '1%',  
    },

    bulletContent: {
        fontSize: 18,
        color: 'white',
    },

    learnMore: {
        backgroundColor: 'snow',
        color: 'orange',
        fontSize: 20,
        height: '10%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
   
    }
})

const stylesLight = StyleSheet.create({
    ...stylesDark,
    contentText: {
        ...stylesDark.contentText,
        color: 'lightblue',
    },

    sectionHeader: {
        ...stylesDark.sectionHeader,
        color: 'slateblue',
    },

    hr: {
        ...stylesDark.hr,
        borderBottomColor: 'slateblue',
    },

    bullet: {
        ...stylesDark.bullet,
        color: 'lightblue',
    },

    bulletContent: {
        ...stylesDark.bulletContent,
        color: 'lightblue'
    }

  
})

// note: I am defining my data for my sectionlist => however, for list of objects, attributes need to be title and data (due to typescript typechecking sections parameter)
const supportedTickers = [
    {
        title: 'USA',
        data: ["AAPL", "QQQ", "ABML", "IXIC"],
    }, {
        title: 'FOREX',
        data: ['EUR/USD'],
    }, {
        title: "CRYPTO",
        data: ['BTC/USD'],
    }
]