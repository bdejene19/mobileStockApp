import React, {FC, useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {StockPreview} from '../components/StockPreview';
import { SearchBar } from '../components/SearchBar';
import { RootStackParamList, Routes } from '../routes';
import {useNavigation} from '@react-navigation/native';
import { NativeStackScreenProps} from '@react-navigation/native-stack';


// defining screen type => takes 2 params: our list of pages, then the name of the current route;
type homeScreenProps = NativeStackScreenProps<RootStackParamList, Routes.WatchList>;
const finnhub= require('finnhub');




const Home: FC<homeScreenProps> = ({navigation}) => {
    // const navigation = useNavigation<homeScreenProps>();
    let socket = useRef<null | WebSocket>(null);
    // useEffect(() => {
    //     fetch('http://localhost:8000/fullStock').then(res => res.json()).then(data => console.log(data)).catch(err => console.log('there was an error'))

    // })


    useEffect(() => {
        // websockets pre-built into latest react native=> therefore dont need to rely on 3rd party libraries
        // NOTE: for react-native && websockets => need to use ip address and wss
        socket.current = new WebSocket('ws://localhost:8000',);
        let ws = socket.current;
        

        ws.onopen = () => {
            console.log('ws is now open ');
            ws.send('why wont this take a a message to the server');
        } ;

        ws.onmessage = (msg) => console.log('this is my message FROM my server: ', msg.data);

        ws.onclose = () => console.log(ws.readyState);

        ws.onerror = e => console.log(e);

    })

    return (
        <View>
            <SearchBar></SearchBar>
            <StockPreview ticker='NKE' companyName="nike"  stockValue={1.3} dayPercentMove={3} bgColor='green'></StockPreview>
            <Button title='test Nav' onPress={() => navigation.navigate(Routes.FullStock)}></Button>
        </View>
    )
}
export default Home;

