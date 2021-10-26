import React, { FC, useState} from 'react';
import {View, TextInput, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, FetchResult} from 'react-native';



export const SearchBar: FC = () => {
    const [searchResponse, setAPIResponse] = useState();
    const [query, setQuery] = useState("");
    const handleChange = async (search: string) => {
        let apiRes = await (await fetch(`https://api.twelvedata.com/stocks?symbol:${query}`)).json();
        setAPIResponse(apiRes);
    }
    return (
        <View style={[styles.searchContainer, {marginTop: '0%', marginBottom: '2%'}]}>
            {/* <SearchIcon style={{color: 'white'}}/> */}
            <TextInput placeholder='Search' placeholderTextColor='white' value={query} onChange={() => handleChange(query)} onChangeText={setQuery} style={styles.inputSearch}></TextInput>
        </View>
        
    )
}


const styles = StyleSheet.create({
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
        color: 'green',
        fontSize: 16,
    }

})