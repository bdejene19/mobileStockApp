import React, { FC, useState} from 'react';
import {View, TextInput, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData} from 'react-native';
import SearchIcon from '@mui/icons-material/Search';



export const SearchBar: FC = () => {
    const [query, setQuery] = useState("");
    return (
        <View style={styles.searchContainer}>
            <TextInput placeholder='Search' value={query} onChangeText={setQuery}></TextInput>
        </View>
        
    )
}


const styles = StyleSheet.create({
    searchContainer: {
        width: '100%',
        // height: 10,
        padding: '2%',
        alignSelf:'center',
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 2,
        flexDirection: 'row',
    }


})