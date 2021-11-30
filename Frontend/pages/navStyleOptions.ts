import { NativeStackNavigationOptions } from '@react-navigation/native-stack';


export const navigationOptions: NativeStackNavigationOptions = {
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

export const fullScreenNavOptions: NativeStackNavigationOptions = {
    headerShown: true, 
    headerStyle: {
        backgroundColor: 'maroon',
    },

    headerBackTitleVisible: false,

    headerTitleStyle: {
        color: 'white',
    }
}