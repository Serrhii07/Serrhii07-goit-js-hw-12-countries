import refs from './refs';
import PNotify from 'pnotify/dist/es/PNotify';
import 'pnotify/dist/PNotifyBrightTheme.css';
import 'pnotify/dist/es/PNotifyButtons';
import countriesListTpl from '../templates/countriesList.hbs';
import countryInfoTpl from '../templates/countryInfo.hbs';

function fetchCountries() {
  const countryName = refs.input.value;

  fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
    .then(response => response.json())
    .then(data => {
      data.length;

      if (data.length > 10) {
        clearMarkup();
        PNotify.error({
          text: 'Too many matches found. Please enter a more specific query!',
          delay: 2000,
        });
      } else if (data.length >= 2 && data.length <= 10) {
        updateCountriesList(data);
      } else if (data.length === 1) {
        updateCountryInfo(data);
      } else if (data.status == '404') {
        clearMarkup();
        PNotify.info({
          text: 'No matches found. Please specify query!',
          delay: 2000,
        });
      }

      function updateCountriesList(data) {
        clearMarkup();
        const markup = countriesListTpl(data);
        refs.countriesList.innerHTML = markup;
      }

      function updateCountryInfo(data) {
        clearMarkup();
        const updateCountryMarkup = countryInfoTpl(data);
        refs.countryOutput.innerHTML = updateCountryMarkup;
      }

      function clearMarkup() {
        refs.countriesList.innerHTML = '';
        refs.countryOutput.innerHTML = '';
      }
    });
}

export default fetchCountries;
