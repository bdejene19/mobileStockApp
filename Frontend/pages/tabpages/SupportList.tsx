import React, {FC} from 'react'
import { View, Text, StyleSheet, SectionList, Linking, Button} from 'react-native';
import { GlobalStyles } from './Settings';

export const SupportList: FC = () => {
    return (
        // <ScrollView style={styles.screenContainer}>
            <View  style={GlobalStyles.screenBgColor}>
                <Text style={styles.contentText}>Due to TwelveData's free API tier, not all tickers are available for live-streaming data.</Text>
                <Text style={[styles.contentText, {paddingTop: '5%'}]}>Here is a supported list of tickers:</Text>
                <SectionList scrollEnabled={false} style={{ maxHeight: '45%', minHeight: '45%',}} sections={supportedTickers} renderItem={({item}) => <BulletPoints listItem={item}></BulletPoints>} renderSectionHeader={({section: data}) => {
                    return (
                        <View>
                            <Text style={styles.sectionHeader}>{data.title}</Text>
                            <View style={styles.hr}></View>
                        </View>

                    )}}>
                </SectionList>
                <Text style={[styles.contentText, {paddingBottom: '5%'}]}>For a more comprehensive list that TwelveData's free tier offers, visit:</Text>
                <View style={styles.learnMore}>
                    <Button onPress={() => Linking.openURL('https://support.twelvedata.com/en/articles/5335783-trial')} title='Learn More'></Button>


                </View>
                

            </View>
        // </ScrollView>
    )
}

type bullet = {
    listItem: string,
}
const BulletPoints: FC<bullet> = (props) => {
    return (
        <View style={styles.bulletPointContainer}>
            <Text style={styles.bullet}>{'\u2B24'}</Text>
            <Text style={styles.bulletContent}>{props.listItem}</Text>

        </View>

    )
}



const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: 'black',
        height: '100%',
        padding: '5%',
    },

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