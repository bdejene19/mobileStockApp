import React, {FC, useEffect, useState, useRef, createContext, Suspense} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {StockPreview, StockProps} from '../../components/StockPreview';
import { SearchBar } from '../../components/SearchBar';
import { RootTabParamList, TabRoutes, StackRoutes, RootStackParamList } from '../../routes';
import {useNavigation} from '@react-navigation/native';
import { NativeStackScreenProps} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  FullStockView  from '../stackpages/FullStockView';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { GlobalDarkStyles, GlobalLightStyles } from './Settings';
import { toggleStates } from '../../reduxPath/reducers/toggles';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { useDarkMode } from '../mainPageFunctions';
import { connect } from 'react-redux';
import { watchlistState } from '../../reduxPath/reducers/watchlistHandles';




// defining screen type => takes 2 params: our list of pages, then the name of the current route;
type homeScreenProps = NativeStackScreenProps<RootStackParamList, StackRoutes.WatchList>;

// homepage component is a screen. this is defined through its type
// pass navigation deconstruction to allow navigation to separate pages

const MyContext = createContext({});
interface homeComponentProps extends toggleStates, watchlistState {}
const Home: FC<homeComponentProps> = (props) => {
    const RootStack = createNativeStackNavigator<RootStackParamList>();
    let socket = useRef<null | WebSocket>(null);
    
    const[stockContent, setStockContent] = useState<StockProps>({
                                                                    currentPrice: 0,
                                                                    companyName: null,
                                                                    ticker: null,
                                                                    dayPercentMove: 0,

                                                                });
    let currentStyle = useDarkMode(props.isDark, GlobalDarkStyles, GlobalLightStyles);

    const HomePage: FC<homeScreenProps> = ({navigation}):ReactJSXElement => {
        return (
            
            <View style={currentStyle.screenBgColor}>
                <SearchBar></SearchBar>
                {props.myList?.map(stock => {
                    let content= stock.getDayQuote();
                    console.log('my content: ',content);
                    return <StockPreview ticker={stock.ticker} companyName={stock.stockName}  currentPrice={stock.currentPrice} dayPercentMove={4}></StockPreview>
                } )}
                {/* <StockPreview ticker={stockContent.ticker} companyName="APPLE INC."  currentPrice={stockContent.currentPrice} dayPercentMove={3}></StockPreview> */}
                <Button title='test Nav' onPress={() => navigation.navigate(StackRoutes.FullStock)}></Button>
            </View>
 
    
        )
    }


    useEffect(() => {
        // websockets pre-built into latest react native=> therefore dont need to rely on 3rd party libraries
        // NOTE: for react-native && websockets => need to use ip address and wss
        // socket.current = new WebSocket('ws://localhost:8000',);
        socket.current = new WebSocket('wss://ws.twelvedata.com/v1/quotes/price?apikey=d71724ce43e342f19aa946ce9d197a8a');
        
        let ws = socket.current;

        
        ws.onopen = () => {
            console.log('connected')
            ws.send(`{
                "action": "subscribe", 
                "params": {
                  "symbols": "AAPL"
                }
              }`);
        };
        let returnedObject: StockProps = {
            ticker: null,
            currentPrice: 0,
            companyName: null,
            dayPercentMove: 0,
            volume: 0,
            exchange: null,
        }
        ws.onmessage = (msg) => {
            let stockObject = JSON.parse(msg.data);
            returnedObject = {
                ticker: stockObject.symbol,
                currentPrice: stockObject.price,
                dayPercentMove: stockObject.price,
                volume: stockObject.day_volume,
                exchange: stockObject.exchange,  
                companyName: stockObject.ticker,  
            }  
            
            return returnedObject
            
           
        }  
        
        let checkPrices = setInterval(() => {
            setStockContent(returnedObject);
        }, 10000)
    
        ws.onclose = () => clearInterval(checkPrices);

        ws.onerror = e => console.log('my error: ', e);
    }, [])
    return (
        <RootStack.Navigator initialRouteName={StackRoutes.WatchList} screenOptions={{headerShown: false}}>
                <RootStack.Screen 
                name={StackRoutes.WatchList} component={HomePage} options={navigationOptions}></RootStack.Screen>
                <RootStack.Screen name={StackRoutes.FullStock} component={FullStockView} options={props.isDark ? fullScreenNavOptions : {...fullScreenNavOptions, headerStyle: {backgroundColor: '#43A6C6'}}}></RootStack.Screen>
        </RootStack.Navigator> 
    )
}

const mapStateToProps = (state: any):any => {
    let {toggleSwitches, userWatchList} = state;
    return {
        isDark: toggleSwitches.isDark,
        isLarge: toggleSwitches.isLarge,
        myList: userWatchList.myList

    };
}
export default connect(mapStateToProps)(Home);

const navigationOptions: NativeStackNavigationOptions = {
    headerStyle: {
      backgroundColor: 'black',
    },
    headerShown: false,
    headerShadowVisible: false,
    headerTitleStyle: {
      fontWeight: '700',
      color: 'white',
      fontSize: 28,
    },
    headerBackTitleVisible: false,
    headerTitleAlign: 'left',
    headerTintColor:'white',       
}

const fullScreenNavOptions: NativeStackNavigationOptions = {
    headerShown: true, 
    headerStyle: {
        backgroundColor: 'maroon',
    },

    headerBackTitleVisible: false,

    headerTitleStyle: {
        color: 'white',
    }
}
