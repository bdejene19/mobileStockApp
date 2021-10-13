import React, { FC, useState} from 'react';
import {View, TextInput, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData} from 'react-native';



export const SearchBar: FC = () => {
    const [query, setQuery] = useState("");
    return (
        <View style={styles.searchContainer}>
            {/* <SearchIcon style={{color: 'white'}}/> */}
            <TextInput placeholder='Search' placeholderTextColor='white' value={query}  onChangeText={setQuery} style={styles.inputSearch}></TextInput>
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
        marginTop: '5%',
        borderRadius: 10,
        borderWidth: 2,
        flexDirection: 'row',
    }, 

    inputSearch: {
        color: 'green',
        fontSize: 16,
    }

})