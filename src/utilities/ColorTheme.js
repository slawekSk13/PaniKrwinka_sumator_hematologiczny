import React from 'react';

export const ColorThemeObj = {
    fontColor: '#E5E5E5',
    primaryColor: '#951B81',
    accentColor: '#CD1719',
    progressBarNegativeColor: '#F9F9F9',
    placeholderPrimaryColor: 'rgba(149, 27, 129, 0.5)',
    placeholderAccentColor: 'rgba(205, 23, 25, 0.5)',
    shadowColor: 'rgba(0, 0, 0, .25)'
}

export const ColorTheme = React.createContext({
    ...ColorThemeObj
})