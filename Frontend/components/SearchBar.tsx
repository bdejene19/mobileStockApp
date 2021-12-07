import React, { FC, useState} from 'react';
import {View, TextInput, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, FetchResult} from 'react-native';
import { connect } from 'react-redux';
import { useDarkMode } from '../pages/mainPageFunctions';
import { toggleStates } from '../reduxPath/reducers/toggles';



const SearchBar: FC<toggleStates> = (props) => {
    const [searchResponse, setAPIResponse] = useState();
    const [query, setQuery] = useState("");
    // const colorTheme = useDarkMode()
    const colorTheme = useDarkMode(props.isDark, darkStyles, lightStyles)
    const handleChange = async (search: string) => {
        let apiRes = await (await fetch(`https://api.twelvedata.com/stocks?symbol:${query}`)).json();
        setAPIResponse(apiRes); 
    }
    return (
        <View style={[colorTheme.searchContainer, {marginTop: '0%', marginBottom: '2%'}]}>
            {/* <SearchIcon style={{color: 'white'}}/> */}
            <TextInput placeholder='Search' placeholderTextColor={props.isDark ? 'white' : '#0072CE'} value={query} onChange={() => handleChange(query)} onChangeText={setQuery} style={darkStyles.inputSearch}></TextInput>
        </View>
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

export default connect(mapStateToProps)(SearchBar)


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
        borderColor: '#0072CE'
    },

    inputSearch: {
        ...darkStyles.inputSearch,
        color: '#0072CE',
    }
})