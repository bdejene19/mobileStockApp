/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */


/** Key command line code to start running app: 
 * Terminal 1) npx react-native start (to start metro bundler => similar to webpack, but for mobile)
 * Terminal 2) npx react-native run-ios (to run app on Xcode simulator/emulator)
 */
import React from 'react';
// import 'react-native-gesture-handler';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import 'react-native-gesture-handler';

// react-native page navigator imports => similar to react-router
import {NavigationContainer} from '@react-navigation/native';
import Home  from './pages/tabpages/Home';
import { FullStockView } from './pages/stackpages/FullStockView';
import { RootTabParamList,TabRoutes } from './routes';
import { green } from '@mui/material/colors';
import { Tab } from '@mui/material';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SupportList } from './pages/tabpages/SupportList';
import { Settings } from './pages/tabpages/Settings';


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // creating stack data structure to navigate between pages
  const RootTab = createBottomTabNavigator();

  return (
    
        // Note: navigation container needs to be at top level to render => simple issue but causes problems
        <NavigationContainer>
            
            {/* This is similar to creating a switch with react-router => it holds our different routes for our screens */}
            {/* <RootStack.Navigator initialRouteName={Routes.WatchList}>
              <RootStack.Screen 
                name={Routes.WatchList} component={Home}></RootStack.Screen>
              <RootStack.Screen name={Routes.FullStock} component={FullStockView} options={navigationOptions}></RootStack.Screen>
            </RootStack.Navigator> */}
          <RootTab.Navigator>
            <RootTab.Screen name={TabRoutes.Home} component={Home}/>
            <RootTab.Screen name={TabRoutes.SupportedTickers} component={SupportList}/>
            <RootTab.Screen name={TabRoutes.Settings} component={Settings}></RootTab.Screen>

        </RootTab.Navigator>
        </NavigationContainer>




  );
};

const styles = StyleSheet.create({
  globalWrapper: {
    margin: '3%',
    top: '5%',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
