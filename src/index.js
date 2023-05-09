import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const listRef = document.querySelector('.country-list');
const divInfoRef = document.querySelector('.country-info');

const coutriesSearch = event => {
  event.preventDefault();
  const search = fetchCountries(event.target.value);
  search.then(value => {
    if (value.length === 1) {
      listRef.innerHTML = '';
      divInfoRef.innerHTML = '';
      const markupCountry = `
      <li class="country-one" >
      <img src="${value[0].flags.svg}" width="40" height="20">
      <h2>${value[0].name.official}</h2> 
      </li>`;

      const markupInfo = `<p>Capital: ${value[0].capital}</p>
      <p>Population: ${value[0].population}</p>
      <p>Languages: ${Object.values(value[0].languages)}</p>`;

      divInfoRef.insertAdjacentHTML('afterbegin', markupInfo);
      listRef.insertAdjacentHTML('afterbegin', markupCountry);
    } else if (value.length > 1 && value.length <= 10) {
      listRef.innerHTML = '';
      divInfoRef.innerHTML = '';
      value.forEach(item => {
        listRef.insertAdjacentHTML(
          'afterbegin',
          `<li><div class="coutry-div"><img src="${item.flags.svg}" width="40" height="20"><h2>${item.name.official}</h2></div></li>`
        );
      });
    } else if (value.status === 404) {
      listRef.innerHTML = '';
      divInfoRef.innerHTML = '';
      Notiflix.Notify.failure('Oops, there is no country with that name');
    } else if (value.length > 10) {
      listRef.innerHTML = '';
      divInfoRef.innerHTML = '';
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    } else {
      listRef.innerHTML = '';
      divInfoRef.innerHTML = '';
    }
  });
};

inputRef.addEventListener('input', debounce(coutriesSearch, DEBOUNCE_DELAY));

// name.official - повна назва країни
// capital - столиця
// population - населення
// flags.svg - посилання на зображення прапора
// languages - масив мов
