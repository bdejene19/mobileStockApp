import React, {createContext, useState, useEffect, FC, useRef} from 'react'
import { View, Text, StyleSheet, TextInput, Animated } from 'react-native'
import { SearchBar } from 'react-native-screens';
import { useSelector } from 'react-redux';
import { useDarkMode } from '../pages/mainPageFunctions';
import { toggleStates } from '../reduxPath/reducers/toggles';
import { SearchResponseModal } from './SearchResponseModal';





export const SearchProvider: FC = () => {

    // Defining context of what will be passed down to children
    // defining search and api response
    const [apiResponse, setGetResponse] = useState(SearchContextDefaultValaues.apiResponse);
    const [searchItem, setQuery] = useState(SearchContextDefaultValaues.searchItem);

    const setItemSearch = (newSearch: string) => setQuery(newSearch);
    const setApiResponse = async (itemSearched: string) => {
        let res = (await (await fetch(`https://api.twelvedata.com/symbol_search?symbol=${itemSearched}`)).json())
        setGetResponse(res.data);
        console.log(res.data);
        return res.data;
    }

    // defining modal movement depending on search focus
    const [isModalOpen, setSearchModal] = useState<boolean>(SearchContextDefaultValaues.isModalOpen);



    // redux for global state changes
    const {isDark, isLarge} = useSelector((state: any):toggleStates => state.toggleSwitches)
    const colorTheme = useDarkMode(isDark, darkStyles, lightStyles);

    useEffect(() => {
        // handleChange(query).then(e => setAPIResponse(e));
        // setApiResponse('ap')
    }, [searchItem])
    return (
        <SearchContentProvider.Provider value={{setItemSearch, searchItem, apiResponse, setApiResponse, isModalOpen}}>
            <View style={[colorTheme.searchContainer, {marginTop: '0%', marginBottom: '2%'}]}>
                <TextInput placeholder='Search' placeholderTextColor={isDark ? 'white' : '#0072CE'} value={searchItem} onChange={() => setApiResponse(`${searchItem}`)} onChangeText={setItemSearch} style={colorTheme.inputSearch} onFocus={() => setSearchModal(true)} onBlur={() => setSearchModal(false)}></TextInput>
            </View>
            {/* {searchItem === "" ? null : <SearchResponseModal/>} */}
            <SearchResponseModal/>

        </SearchContentProvider.Provider>
    )
}
interface SearchContext {
    searchItem: string,
    setItemSearch: (itemSearched: string) => void,
    apiResponse: [],
    setApiResponse: (itemSearched: string) => Promise<[]>,
    isModalOpen: boolean,

}
export const SearchContextDefaultValaues: SearchContext = {
    searchItem: "",
    setItemSearch: () => {},
    apiResponse: [],
    setApiResponse:  async (): Promise<[]> => [],
    isModalOpen: false,
}

export const SearchContentProvider = createContext<SearchContext>(SearchContextDefaultValaues)


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
