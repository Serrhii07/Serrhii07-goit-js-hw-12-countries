import './styles.css';
import refs from './js/refs';
import debounce from '../node_modules/lodash.debounce/index.js';
import fetchCountries from './js/fetchCountries';

refs.input.addEventListener('input', debounce(fetchCountries, 500));
