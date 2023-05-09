export const fetchCountries = name => {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(resp => resp.json())
    .catch(err => {
      throw Error(err);
    });
};
