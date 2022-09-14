'use strict';
const API_SRC = 'https://restcountries.com/v3.1/name/';

export const fetchCountries = textInput => {

    return fetch(`${API_SRC}${textInput}?fields=name,capital,population,flag,flags,languages`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
    return response.json();
  });
};