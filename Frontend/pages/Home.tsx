import React, {FC} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {StockPreview} from '../components/StockPreview';
import { SearchBar } from '../components/SearchBar';
import { RootStackParamList, Routes } from '../routes';
import {useNavigation} from '@react-navigation/native';
import { NativeStackScreenProps} from '@react-navigation/native-stack';

// defining screen type => takes 2 params: our list of pages, then the name of the current route;
type homeScreenProps = NativeStackScreenProps<RootStackParamList, Routes.Home>;


const Home: FC = () => {
    const navigation = useNavigation<homeScreenProps>();
    
    return (
        <View>
            <SearchBar></SearchBar>
            <StockPreview ticker='NKE' companyName="nike"  stockValue={1.3} dayPercentMove={3} bgColor='green'></StockPreview>
            <Button title='test Nav' onPress={() => navigation.navigation.navigate(Routes.Test) }></Button>
        </View>
    )
}
export default Home;

