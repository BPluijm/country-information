// async function getCountryInfo() {
//     try {
//         const country = "belgium";
//         const url = `https://restcountries.eu/rest/v2/name/${country}?fullText=true`;
//         const response = await axios.get(url);
//         const data = response.data[0];
//         console.log(data);
//     } catch (error) {
//         console.log(error);
//     }
// }

//     // 2. Maak op basis van de response de volgende string en log dit in de console: [country-naam] is situated in [subarea-name]. It has a population of [amount] people.
//     const string = `${data.name} is situated in ${data.subregion}. It has a population of ${data.population} people.`
//     console.log(string);
//
//     // 3. Maak op basis van de response de volgende string en log dit in de console: The capital is [city]
//     const capital = `The capital is ${data.capital} `
//     console.log(capital);
//
//
//     // 4. Maak een functie die ongeacht het aantal currencies die in een land gebruikt worden, een string maakt. In een land kunnen één of twee currencies gebruikt worden:
//     // A valuta: and you can pay with [currency]'s
//     // B valuta's: and you can pay with [currency]'s and [currency]'s
//     function getCurrency() {
//         let string = `and you can pay with ${data.currencies[0].name}s`;
//         if (data.currencies.length > 1) {
//             for (let i = 1; i < data.currencies.length; i++) {
//                 // console.log("The currency is " + currency.name);
//                 string += ` and ${data.currencies[i].name}s`
//             }
//         }
//         return string;
//     }
//     // 6. Bonusopdracht: Maak een functie die ongeacht het aantal talen die in een land gesproken worden, een string maakt:
//     //
//     //     1 taal: They speak [language]
//     //     2 talen: They speak [language] and [language]
//     //     3 talen: They speak [language], [language] and [language]
//     //      etc.
//     function language() {
//         let string = `They speak ${data.languages[0].name}`;
//         const length = data.languages.length;
//
//         if (length > 1) {
//             for (let i = 1; i < length; i++) {
//                 if (i === length - 1) {
//                     string += ` and ${data.languages[i].name}`;
//                 } else {
//                     string += `, ${data.languages[i].name}`
//                 }
//             }
//         }
//         return string;
//     }
//     // 7. Zorg ervoor dat de opgehaalde data op de volgende manier wordt toegevoegd aan de DOM:
//     // [IMAGE: flag]
//     // [country-name]
//     // [country-naam] is situated in [subarea-name]. It has a population of [amount] people.
//     // The capital is [city] and you can pay with [currency]'s
//     // They speak [language], [language] and [language]
//
//     const countryInfo = document.getElementById("countries");
//     const flag = document.createElement('img');
//     flag.setAttribute('src', data.flag);
//
//     countryInfo.appendChild(flag);
//
//     const countryName = document.createElement('h1');
//     countryName.textContent = data.name;
//     countryInfo.appendChild(countryName);
//
//     const countryDiscription = document.createElement('p')
//     countryDiscription.textContent = `${string} ${capital} ${getCurrency()}. ${language()}.`;
//     countryInfo.appendChild(countryDiscription);
//
//
// }
//
//     getCountryInfo();
//
//     const searchButton = document.getElementById("searchButton");
//     // console.log(searchButton);
//
//     searchButton.addEventListener('click', getCountryInfo);
//
//     // 8. Maak een inputveld op de pagina en zorg ervoor dat als de gebruiker op enter drukt, de functie wordt aangeroepen waarmee de gegevens over België worden opgehaald.
//     const searchBar = document.getElementById("searchBar");
//     searchBar.addEventListener('keyup', setQuery);
//
//     // 9. Zorg ervoor dat de waarde uit het input veld wordt gebruikt als query voor het GET request. Er moet alleen een request gedaan worden als de gebruiker op enter drukt, of op de zoek-knop klikt. Tip: gebruik een globale variabele.
//
//     // 10. Zorg ervoor dat de waarde van het input veld wordt leeggemaakt na elke zoekopdracht.
//
//     // 11. Zorg ervoor dat er altijd maar één zoekresultaat op de pagina staat.
//
//     // 12. Zorg ervoor dat als er naar een land wordt gezocht dat niet bestaat, er een foutmelding in de DOM wordt gezet. Tip: als er een ongeldige API call wordt gemaakt, zal de response in het catch blok terecht komen.
//
//     // 13. Zorg ervoor dat als je na een ongeldige API call weer een geldige API call maakt, de foutmelding verdwenen is.
//
//     // 14.Bonusopdracht: make it look nice

// sla de referentie op naar de zoek-button en zet er een event listener op die getCountryData aanroept
const button = document.getElementById('search-button');
button.addEventListener('click', getCountryData);

// sla de referentie op naar het input-veld en zet er een event listener op die setQuery aanroept
const searchBar = document.getElementById('search-bar');
searchBar.addEventListener('keyup', setQuery)

// sla de referentie naar het "anker" element op waarin we alle landen gaan toevoegen
const countryContainer = document.getElementById('countries');

// maak query een globale variabele, zodat we deze zowel in de setQuery als in de getCountryData functie kunnen gebruiken
let query = '';

// geef het event object mee en haal de waarde eruit. Als er op 'enter' gedrukt wordt,
function setQuery(e) {
    query = e.target.value;
    if (e.keyCode === 13) {
        getCountryData();
    }
}

async function getCountryData() {
    // zorg ervoor dat als er een request gemaakt wordt, het zoekveldt leeggemaakt wordt
    searchBar.value = '';

    // sla de referentie naar onze error-message op en haal de tekst weg bij elke nieuwe zoekopdracht
    // (als er iets mis gaat, wordt 'ie in het catch blok opnieuw toegevoegd)
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = '';

    // sla de referentie op naar de country-container waarin de informatie van een land staat
    const previousSearchResult = document.getElementById('country');
    // als deze referentie bestaat (en er dus al een land op de pagina wordt weergegeven) dan halen we deze eerst weg
    if (previousSearchResult) {
        countryContainer.removeChild(previousSearchResult);
    }

    try {
        // maak een GET request naar het endpoint en voeg de searchquery als dynamische parameter in
        const result = await axios.get(`https://restcountries.eu/rest/v2/name/${query}?fullText=true`);
        // haal het land-object uit de response
        const countryInfo = result.data[0];

        console.log(countryInfo);

        // maak een country-container en geef hem de id country
        // (zodat we 'm de volgende keer kunnen herkennen en kunnen checken of er al een land op de pagina staat)
        const country = document.createElement('div');
        country.setAttribute('id', 'country');

        // maak de <img> tag om de vlag in weer te geven
        const flag = document.createElement('img');
        // stop de image url in het src attribuut van img
        flag.setAttribute('src', countryInfo.flag);
        country.appendChild(flag);

        // maak <h1> element voor de titel
        const countryName = document.createElement('h1');
        countryName.textContent = countryInfo.name;
        country.appendChild(countryName);

        // maak een <p> voor de informatie
        const population = document.createElement('p');
        population.textContent = `${countryInfo.name} is situated in ${countryInfo.subregion}. It has a population of ${countryInfo.population} people.`;
        country.appendChild(population);

        // maak een <p> voor nog meer informatie
        const capital = document.createElement('p');
        capital.textContent = `The capital is ${countryInfo.capital} and you can pay with ${createCurrencyDescription(countryInfo.currencies)}`;
        country.appendChild(capital);

        // maak een <p> voor de talen
        const languages = document.createElement('p');
        languages.textContent = createLanguageDescription(countryInfo.languages);
        country.appendChild(languages);

        // voeg de country <div> toe aan de countryContainer
        countryContainer.appendChild(country);
    } catch(e) {
        console.error(e);
        errorMessage.textContent = `${query} bestaat niet. Probeer het opnieuw!`;
    }
}

function createLanguageDescription(languages) {
    let output = 'They speak ';

    for (let i = 0; i < languages.length; i++) {
        // als dit de laatste entry is, voeg dan " and " toe
        if (i === languages.length - 1) {
            // de return zorgt ervoor dat er niet meer naar de andere if-statements gekeken wordt
            return output = output + " and " + languages[i];
        }
        // als de array sowieso maar twee talen bevat of we zijn bij de één-na-laatste naam, voeg dan alleen de taal toe
        if (languages.length === 2 || i === languages.length - 2) {
            output = output + languages[i];
        } else {
            // in andere alle gevallen voegen we een komma en spatie toe
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