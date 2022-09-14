import '../css/styles.css';
import createCountriesList from '../templates/countries-list.hbs'
import createCountryCard from '../templates/country-card.hbs'
import {fetchCountries} from "./fetchCountries";
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';



const DEBOUNCE_DELAY = 300;
const inputCountryNameEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryDescriptionBoxEl = document.querySelector('.country-info')

function numberWithSpaces(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
function getInputedCountryData(data) {
  const { name, capital, flag, flags, languages, population} = data[0];
          const langs = `${Object.values(languages)}`;
          const populationCorrected = numberWithSpaces(population);
          return inputedCountryData = { name, capital, flag, flags, langs, populationCorrected };
}

const searchByInputName = (event) => {
  
  let textInput = event.target.value.trim();
  countryListEl.innerHTML = '';
  countryDescriptionBoxEl.innerHTML = '';
    if (textInput !== '') {
      fetchCountries(textInput)
        .then(data => {
          getInputedCountryData(data);
          
          if (data.length === 1) {
            countryDescriptionBoxEl.innerHTML = createCountryCard(inputedCountryData)
          }
          
          if (data.length > 1 && data.length <= 10) {
            let markupList = '';
            data.map(obj => {
              markupList += createCountriesList(obj);
            });
            countryListEl.insertAdjacentHTML('beforeend', markupList);
          }
          
          if (data.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
          }

    })
    .catch(err => {
      if (err.message === '404') {
        Notiflix.Notify.failure('Oops, there is no country with that name');

      }
    })
    .finally(() => {
      console.log("done your task, enter new country to field");
      // inputCountryNameEl.value = '';
    });
    }
    
}

inputCountryNameEl.addEventListener('input', debounce(searchByInputName, DEBOUNCE_DELAY));
