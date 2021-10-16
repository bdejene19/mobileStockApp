import React, {FC} from 'react'
import { View, Text, StyleSheet, SectionList, Linking} from 'react-native';

export const SupportList: FC = () => {
    return (
        // <ScrollView style={styles.screenContainer}>
            <View  style={styles.screenContainer}>
                <Text style={styles.contentText}>Due to TwelveData's free API tier, not all tickers are available for live-streaming data.</Text>
                <Text style={[styles.contentText, {paddingTop: '5%'}]}>Here is a supported list of tickers:</Text>
                <SectionList scrollEnabled={false} style={{borderColor: 'green', borderWidth: 1, maxHeight: '45%', minHeight: '45%', height: '50%',}} sections={supportedTickers} renderItem={({item}) => <BulletPoints listItem={item}></BulletPoints>} renderSectionHeader={({section: data}) => {
                    return (
                        <View>
                            <Text style={styles.sectionHeader}>{data.title}</Text>
                            <View style={styles.hr}></View>
                        </View>

                    )}}>
                </SectionList>
                <Text style={styles.contentText}>For a more comprehensive list that TwelveData's free tier offers, visit:</Text>
                <Text onPress={() => Linking.openURL('https://support.twelvedata.com/en/articles/5335783-trial')} style={styles.learnMore}>Learn More</Text>
                

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
        fontSize: 10,
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
        backgroundColor: 'darkgrey',
        color: 'orange',
        fontSize: 20,
        textAlign: 'center',
        height: '10%',
        borderRadius: 5,
        textAlignVertical: 'center',
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