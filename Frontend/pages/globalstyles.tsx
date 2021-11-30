import { StyleSheet } from "react-native"

export const GlobalDarkStyles = StyleSheet.create({
    screenBgColor: {
        height: '100%',
        padding: '2%',
        backgroundColor: 'black',
    },
    
    mainScreenHeaderTitle: {
        marginBottom: '5%',
        fontWeight: '700',
        color: 'orange',

    },

    switchContainer: {
        flexDirection: 'row',
        // marginTop: '5%',
        height: '10%',
        alignItems: 'center',
        borderTopColor: 'white',
        borderTopWidth: 3,
    },

    contentText: {
        color: 'white',
        fontSize: 20,
        flexBasis: '60%',
    
    },

    toggle: {
        textAlign: 'right',
        flexBasis: '40%',
        alignItems: 'flex-end',
    }

})


export const GlobalLightStyles = StyleSheet.create({
    ...GlobalDarkStyles,
    screenBgColor: {
        ...GlobalDarkStyles.screenBgColor,
        backgroundColor: 'white'
    },

    mainScreenHeaderTitle: {
        ...GlobalDarkStyles.mainScreenHeaderTitle, 
        color: 'skyblue',
    },

    switchContainer: {
        ...GlobalDarkStyles.switchContainer,
        borderTopColor: 'lightgreen',
    }, 
    
    contentText: {
        ...GlobalDarkStyles.contentText, 
        color: 'lightgreen',
    }
})

export const regularFontSizes = StyleSheet.create({
    mainHeaderSize: {
        fontSize: 28,
    },

    subHeaderSize: {
        fontSize: 24,
    },

    contentTextSize: {
        fontSize: 20
    },

    subContentTextSize: {
        fontSize: 18,
    },

    sectionListContainer: {
        maxHeight: '45%',
    }
})

export const largeFontSizes = StyleSheet.create({
    ...regularFontSizes,
    mainHeaderSize: {
        fontSize: 40,
        letterSpacing: 1.5,
    },

    contentTextSize: {
        fontSize: 28,
        letterSpacing: 1.5,
    },

    subContentTextSize: {
        fontSize: 24,
    },

    sectionListContainer: {
        maxHeight: '70%',
    }
})