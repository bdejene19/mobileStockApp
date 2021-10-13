



export const handleSearch = (query: String) => {
    // want to fetch from twelve data api, but need t oimplement logic for symbols that are only available in free tier
    fetch(`https://api.twelvedata.com/symbol_search?symbol=${query}`).then(res => res.json()).then()
} 