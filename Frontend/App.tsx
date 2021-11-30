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
import 'react-native-gesture-handler';

import { Provider } from 'react-redux';
import Main from './pages/Main';
import store from './reduxPath/store'
// react-native page navigator imports => similar to react-router

// redux notes:
/**
 * store => holds state
 * dispatcher => someone who sends an action ==> i.e. dispatching an action
 * action => state can be modified by actions (which are simple objects);
 * reducer => receives the action and modifies state to give updated state ==> reducer is a:
 *  - pure function
 *  - only mandatory argument is the 'type',
 * subscriber => listens for the state change to update UI
 */



// const initialState = {
//   currentPrice: 0,
//   darkMode: true,
//   largeText: false,
// } 

// creating redux store => but requires a reducer to be created
// pass intiial state as first argument
// const reducer = (state = initialState) => {
//   return state;
// }


const App = () => {


  return (
    // react-redux provider => state is now accessible throughout the app
    <Provider store={store}> 
      {/* app contents */}
      <Main></Main>
    </Provider>
  );
};

export default App;
