import React, { FC, useState} from 'react';
import {View, TextInput, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, FetchResult} from 'react-native';
import { useDarkMode } from '../pages/mainPageFunctions';



export const SearchBar: FC = () => {
    const [searchResponse, setAPIResponse] = useState();
    const [query, setQuery] = useState("");
    // const colorTheme = useDarkMode()

    const handleChange = async (search: string) => {
        let apiRes = await (await fetch(`https://api.twelvedata.com/stocks?symbol:${query}`)).json();
        setAPIResponse(apiRes);
    }
    return (
        <View style={[darkStyles.searchContainer, {marginTop: '0%', marginBottom: '2%'}]}>
            {/* <SearchIcon style={{color: 'white'}}/> */}
            <TextInput placeholder='Search' placeholderTextColor='white' value={query} onChange={() => handleChange(query)} onChangeText={setQuery} style={darkStyles.inputSearch}></TextInput>
        </View>
    )
}


const darkStyles = StyleSheet.create({
    searchContainer: {
        width: '100%',
        // height: 10,
        padding: '2%',
        alignSelf:'center',
        borderColor: 'white',
        borderRadius: 10,
        borderWidth: 2,
        flexDirection: 'row',
    }, 

    inputSearch: {
        color: 'white',
        fontSize: 16,
    }
})

const lightStyles = StyleSheet.create({
    searchContainer: {
        ...darkStyles.searchContainer,
        borderColor: 'slateblue'
    },

    inputSearch: {
        ...darkStyles.inputSearch,
        color: 'slateblue',
    }
})