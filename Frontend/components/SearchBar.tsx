import React, { FC, useContext, useEffect, useState} from 'react';
import {View, TextInput, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, FetchResult} from 'react-native';
import { connect } from 'react-redux';
import { useDarkMode } from '../pages/mainPageFunctions';
import { toggleStates } from '../reduxPath/reducers/toggles';
import { SearchContentProvider } from './SearchProvider';



const SearchBar: FC<toggleStates> = (props) => {
    // const [searchResponse, setAPIResponse] = useState();
    // const [query, setQuery] = useState("");
    // const handleChange = async (search: string) => {
    //     let apiRes = await (await fetch(`https://api.twelvedata.com/stocks?symbol:${query}`)).json();
    //     setAPIResponse(apiRes); 
    // }

    // custom hook to determine app colour from dark mode toggle
    const colorTheme = useDarkMode(props.isDark, darkStyles, lightStyles)

    // destructured assests from  SearchProvider Context
    const { searchItem, setItemSearch, apiResponse, setApiResponse } = useContext(SearchContentProvider);
   
    
    return (
        <View>
            {/* <SearchIcon style={{color: 'white'}}/> */}
            {/* <TextInput placeholder='Search' placeholderTextColor={props.isDark ? 'white' : '#0072CE'} value={searchItem} onChange={() => setApiResponse(`${searchItem}`)} onChangeText={setItemSearch} style={colorTheme.inputSearch}></TextInput> */}
            <TextInput  style={colorTheme.inputSearch} placeholder='Search' placeholderTextColor='white' onChange={() => console.log('hello')}/>
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