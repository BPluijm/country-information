const button = document.getElementById('search-button');
button.addEventListener('click', getCountryData);

const searchBar = document.getElementById('search-bar');
searchBar.addEventListener('keyup', setQuery)

const countryContainer = document.getElementById('countries');

let query = '';

function setQuery(e) {
    query = e.target.value;
    if (e.keyCode === 13) {
        getCountryData();
    }
}

async function getCountryData() {
    searchBar.value = '';
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = '';
    const previousSearchResult = document.getElementById('country');
    if (previousSearchResult) {
        countryContainer.removeChild(previousSearchResult);
    }

    try {
        const result = await axios.get(`https://restcountries.eu/rest/v2/name/${query}?fullText=true`);
        const countryInfo = result.data[0];
        console.log(countryInfo);

        const country = document.createElement('div');
        country.setAttribute('id', 'country');

        const flag = document.createElement('img');
        flag.setAttribute('src', countryInfo.flag);
        country.appendChild(flag);

        const countryName = document.createElement('h1');
        countryName.textContent = countryInfo.name;
        country.appendChild(countryName);

        const population = document.createElement('p');
        population.textContent = `${countryInfo.name} is situated in ${countryInfo.subregion}. It has a population of ${countryInfo.population} people.`;
        country.appendChild(population);

        const capital = document.createElement('p');
        capital.textContent = `The capital is ${countryInfo.capital} ${createCurrencyDescription(countryInfo.currencies)}`;
        country.appendChild(capital);

        const languages = document.createElement('p');
        languages.textContent = createLanguageDescription(countryInfo.languages);
        country.appendChild(languages);

        countryContainer.appendChild(country);

    } catch (e) {
        console.error(e);
        errorMessage.textContent = `Oops er ging iets mis, ${query} bestaat niet. Probeer het opnieuw!`;
    }
}

function createLanguageDescription(languages) {
    let string = `They speak ${languages[0].name}`;
    if (languages.length > 1) {
        for (let i = 1; i < languages.length; i++) {
            if (i === languages.length - 1) {
                string += ` and ${languages[i].name}`;
            } else {
                string += `, ${languages[i].name}`;
            }
        }
    }
    return string;
}

function createCurrencyDescription(currencies) {
        let output = 'and you can pay with ';

         if (currencies.length === 2) {
            return output + `${currencies[0].name} and ${currencies[1].name}'s.`;
        }
        return output + `${currencies[0].name}'s.`;
}