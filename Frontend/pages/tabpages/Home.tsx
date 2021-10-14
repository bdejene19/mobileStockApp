import React, {FC, useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {StockPreview} from '../../components/StockPreview';
import { SearchBar } from '../../components/SearchBar';
import { RootTabParamList, TabRoutes, StackRoutes, RootStackParamList } from '../../routes';
import {useNavigation} from '@react-navigation/native';
import { NativeStackScreenProps} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FullStockView } from '../stackpages/FullStockView';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';




// defining screen type => takes 2 params: our list of pages, then the name of the current route;
type homeScreenProps = NativeStackScreenProps<RootStackParamList, StackRoutes.WatchList>;

const navigationOptions: NativeStackNavigationOptions = {
    title: 'Watchlist',
    headerStyle: {
      backgroundColor: 'black',
    }
,
    headerTitleStyle: {
      fontWeight: '700',
      color: 'white',
      fontSize: 28,
    },
    headerBackTitleVisible: false,
    

    headerTitleAlign: 'left',
    headerTintColor:'white',   
    // header: () => null,
    
   
}
const HomePage: FC<homeScreenProps> = ({navigation}) => {

    return (
        <View style={styles.homePageContainer}>
            <Text>Test</Text>
                <SearchBar></SearchBar>
                <StockPreview ticker='NKE' companyName="nike"  stockValue={1} dayPercentMove={3} bgColor='green'></StockPreview>
                    <Button title='test Nav' onPress={() => navigation.navigate(StackRoutes.FullStock)}></Button>
        </View> 

    )
}

const Home: FC = () => {
    const RootStack = createNativeStackNavigator<RootStackParamList>();
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
        // <RootTab.Navigator>
        //     <RootTab.Screen name={Routes.WatchList} component={HomePage}/>
        //     <RootTab.Screen name={Routes.FullStock} component={FullStockView}/>

        // </RootTab.Navigator>
        <RootStack.Navigator initialRouteName={StackRoutes.WatchList}>
              <RootStack.Screen 
                name={StackRoutes.WatchList} component={HomePage} options={navigationOptions}></RootStack.Screen>
              <RootStack.Screen name={StackRoutes.FullStock} component={FullStockView}></RootStack.Screen>
        </RootStack.Navigator> 
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