import React, {FC, useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {StockPreview} from '../components/StockPreview';
import { SearchBar } from '../components/SearchBar';
import { RootStackParamList, Routes } from '../routes';
import {useNavigation} from '@react-navigation/native';
import { NativeStackScreenProps} from '@react-navigation/native-stack';


// defining screen type => takes 2 params: our list of pages, then the name of the current route;
type homeScreenProps = NativeStackScreenProps<RootStackParamList, Routes.WatchList>;




const Home: FC<homeScreenProps> = ({navigation}) => {
    // const navigation = useNavigation<homeScreenProps>();
    let socket = useRef<null | WebSocket>(null);
    // useEffect(() => {
    //     fetch('http://localhost:8000/fullStock').then(res => res.json()).then(data => console.log(data)).catch(err => console.log('there was an error'))

    // })
    const[apple, setapple] = useState<number>(0)


    useEffect(() => {
        // websockets pre-built into latest react native=> therefore dont need to rely on 3rd party libraries
        // NOTE: for react-native && websockets => need to use ip address and wss
        // socket.current = new WebSocket('ws://localhost:8000',);
        socket.current = new WebSocket('wss://ws.twelvedata.com/v1/quotes/price?apikey=6ca188086bb74ba88ddaa94c9d184322');
        
        let ws = socket.current;

        
        
        console.log
        ws.onopen = () => {
            console.log('connected')
            // HOOOORAY! this code ws.send is getting real time feed back from server => however, need to figure out how to subscrobe to multiple channels
            // ws.send('{"type":"subscribe","symbol":"AAPL"}')
            // for my api usage
            // fetch('https://api.twelvedata.com/api_usage?apikey=6ca188086bb74ba88ddaa94c9d184322').then(res => console.log(res.json()))

            // ws.send(`{
            //     "action": "subscribe", 
            //     "params": {
            //         "symbols": "AAPL",
            //     }
            //   }`)
            // ws.send('why wont this take a a message to the server');
            // fetch('https://api.twelvedata.com/stocks?symbol:NYSE').then(res => res.json()).then(res => console.log(res)).catch(e => console.log())
        } ;

        ws.onmessage = (msg) => {
            let stockObject = JSON.parse(msg.data);
            let returnedObject = {
                currPrice: stockObject.price,
                symbol: stockObject.symbol, 
                volume: stockObject.day_volume,
                exchange: stockObject.exchange,    
            }

            setapple(returnedObject.currPrice);

        };

        ws.onclose = () => console.log(ws.readyState);

        ws.onerror = e => console.log(e);
        // ws.close();

    })

    return (
        <View style={styles.homePageContainer}>
            <SearchBar></SearchBar>
            <StockPreview ticker='NKE' companyName="nike"  stockValue={apple} dayPercentMove={3} bgColor='green'></StockPreview>
            <Button title='test Nav' onPress={() => navigation.navigate(Routes.FullStock)}></Button>
        </View>
    )
}
export default Home;

const styles = StyleSheet.create({
    homePageContainer: {
        // padding: '1%',
        height: '100%',
        backgroundColor: 'black',
        borderTopColor: 'orange',
        borderWidth: 1,
    },

    search: {
        color: 'white',
        borderColor: 'white',
     

    }
})