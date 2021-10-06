
// names of the routes I am making for different screens => RootStackParamList defines the screens on root 
// note: enum is better when defining routes
import { NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';

export enum Routes {
    WatchList = 'Home',
    FullStock = 'FullStock',
}

// for typescript => need to create an interface since create "createStackNavigataor()" accepts a type argument
// type argument describes interface where keys are the "screen names" and the VALUES are the params (props?) required in each screen
export type RootStackParamList = {
    [Routes.WatchList]: undefined; // home screen does not require any navigation params
    [Routes.FullStock]: undefined; 
};

export type ProfileProps = NativeStackScreenProps<RootStackParamList>;

// note: for each screen need to make screenProps using 'NativeStackScreenProps' to toss useNavigation() hook




