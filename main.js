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
        capital.textContent = `The capital is ${countryInfo.capital} and you can pay with ${createCurrencyDescription(countryInfo.currencies)}`;
        country.appendChild(capital);

        const languages = document.createElement('p');
        languages.textContent = createLanguageDescription(countryInfo.languages);
        country.appendChild(languages);

        countryContainer.appendChild(country);

    } catch (e) {
        console.error(e);
        errorMessage.textContent = `${query} bestaat niet. Probeer het opnieuw!`;
    }

}

function createLanguageDescription(languages) {
        let output = 'They speak ';

        for (let i = 0; i < languages.length; i++) {
            if (i === languages.length - 1) {
                return output = output + " and " + languages[i];
            }
            if (languages.length === 2 || i === languages.length - 2) {
                output = output + languages[i];
            } else {
                output = output + languages[i] + ", ";
            }
        }

        return output;
}

function createCurrencyDescription(currencies) {
        let output = 'and you can pay with ';

        if (currencies.length === 2) {
            return output + `${currencies[0]} and ${currencies[1]}'s`;
        }

        return output + `${currencies[0]}'s`;
}