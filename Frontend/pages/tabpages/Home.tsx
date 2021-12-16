
import React, {FC, useEffect, useState, useRef, createContext, Suspense} from 'react';

import {View, Text, StyleSheet, Button} from 'react-native';
import {StockPreview, StockProps} from '../../components/StockPreview';
import { RootTabParamList, TabRoutes, StackRoutes, RootStackParamList } from '../../routes';
import { NativeStackScreenProps} from '@react-navigation/native-stack';
import  FullStockView  from '../stackpages/FullStockView';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { GlobalDarkStyles, GlobalLightStyles, largeFontSizes, regularFontSizes } from '../globalstyles';
import { toggleStates } from '../../reduxPath/reducers/toggles';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { useDarkMode } from '../mainPageFunctions';
import { connect } from 'react-redux';
import { watchlistState } from '../../reduxPath/reducers/watchlistHandles';
import { fullScreenNavOptions, navigationOptions } from '../navStyleOptions';
import Stock from '../../reduxPath/reducers/stockClass';
import { SearchProvider } from '../../components/SearchProvider';





// defining screen type => takes 2 params: our list of pages, then the name of the current route;
type homeScreenProps = NativeStackScreenProps<RootStackParamList, StackRoutes.WatchList>;

// homepage component is a screen. this is defined through its type
// pass navigation deconstruction to allow navigation to separate pages

interface homeComponentProps extends toggleStates, watchlistState {}
const Home: FC<homeComponentProps> = (props) => {
    let MyContext = createContext<watchlistState>({myList: props.myList});

    const RootStack = createNativeStackNavigator<RootStackParamList>();
    let socket = useRef<null | WebSocket>(null);
    
    const[stockContent, setStockContent] = useState<StockProps>({
                                                                    currentPrice: 0,
                                                                    companyName: null,
                                                                    ticker: null,
                                                                    dayPercentMove: 0,
                                                                    graphData: [],

                                                                });
    let currentStyle = useDarkMode(props.isDark, GlobalDarkStyles, GlobalLightStyles);

    const HomePage: FC<homeScreenProps> = ({navigation}):ReactJSXElement => {
        return (
            
            <View style={currentStyle.screenBgColor}>
                <SearchProvider/>
                {props.myList?.map((stock, index)=> {
                    stock.setCurrentPrice(stockContent.currentPrice);
                    console.log((new Date().getSeconds()))
                    stock.addDataPointToGraphData({x: 2.343432, y: stockContent.currentPrice})
                    console.log(stock.openPrice);
                    return  <StockPreview key={stock.ticker} ticker={stock.ticker} companyName={stock.getStockName()}  currentPrice={stock.getCurrentPrice()} dayPercentMove={stock.getDayDollarMove()} graphData={stock.getGraphData()}></StockPreview>
                } )}
                {/* <StockPreview ticker={stockContent.ticker} companyName="APPLE INC."  currentPrice={stockContent.currentPrice} dayPercentMove={3}></StockPreview> */}
                <Button title='test Nav' onPress={() => navigation.navigate(StackRoutes.FullStock)}></Button>
            </View>
 
    
        )
    }
    let returnedObject: StockProps = {
        ticker: null,
        currentPrice: 0,
        companyName: null,
        dayPercentMove: 0,
        volume: 0,
        graphData: [],
        exchange: null,
    }


    const [allPrices, setSubscribedPrices] = useState({prices: [{}]});
    useEffect(() => {
        // websockets pre-built into latest react native=> therefore dont need to rely on 3rd party libraries
        // NOTE: for react-native && websockets => need to use ip address and wss
        // socket.current = new WebSocket('ws://localhost:8000',);
        socket.current = new WebSocket('wss://ws.twelvedata.com/v1/quotes/price?apikey=d71724ce43e342f19aa946ce9d197a8a');
        
        let ws = socket.current;

        let followedTickers = props.myList?.map(item => item.ticker).join(',');
        ws.onopen = async  () => {
            console.log('connected');

                ws.send(`{
                    "action": "subscribe", 
                    "params": {
                    "symbols": "${followedTickers}"
                    }
                }`);
                let res = await ((await fetch(`https://api.twelvedata.com/quote?symbol=${followedTickers}&apikey=d71724ce43e342f19aa946ce9d197a8a`)).json());
        };  

        // initial stockobject => getting immediate data => rest of data will be determined by stock quote API call
        

        
        ws.onmessage = (msg) => {
            let stockObject = JSON.parse(msg.data);
            let currPrice = stockObject.price;                
            
            // generating initial object

            if (typeof(stockObject.price) === 'number') {
                currPrice = currPrice.toFixed(2);
            }
            returnedObject = {
                ticker: stockObject.symbol,
                currentPrice: currPrice,
                dayPercentMove: stockObject.price,
                volume: stockObject.day_volume,
                exchange: stockObject.exchange,  
                companyName: stockObject.ticker,  
                graphData: []
            }  


            return returnedObject
            
           
        }  
        
        // NOTE: set interval in my useEffect causes entire page refresh, not just stock preview
        // let checkPrices = setInterval(() => {

        //     // returnedObject['currentPrice'] = returnedObject.currentPrice
        //     setSubscribedPrices({prices: [...allPrices.prices, returnedObject]})
        //     // console.log('this is all my prices: ', allPrices);
        //     // setSubscribedPrices([...allPrices, {ticker: returnedObject['ticker'], currPrice: returnedObject.currentPrice}])
        //     // setSubscribedPrices({price: {returnedObject['ticker']: returnedObject['currentPrice']}})
        //     setStockContent(returnedObject);
        //     // console.log(stockContent)
        // },5000)
    
        // ws.onclose = () => clearInterval(checkPrices);

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


