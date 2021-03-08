async function sortCountries () {
    try {
        const result = await axios.get("https://restcountries.eu/rest/v2/all");
        const sortedCountries = result.data.sort((country1, country2) => country1.population - country2.population);
        for (country of sortedCountries) {
            const { name, flag, region } = country;
            makeList(name, flag, region);
        }

    } catch (error) {
        console.log(error);
    }
}
    function makeList(countryName, countryFlag, countryRegion) {
        const list = document.querySelector('.list');
        let country = document.createElement('li')
        let name = document.createElement('span');
        let flag = document.createElement('img');
        name.classList.add('country-name'); // = hetzelfde als setAttribute
        flag.classList.add('country-flag'); // = hetzelfde als setAttribute
        name.textContent = countryName;
        colorTheCountries(name, countryRegion)
        flag.setAttribute('src', countryFlag);
        country.appendChild(flag);
        country.appendChild(name);
        list.appendChild(country);
    }

    function colorTheCountries(nameElement, countryRegion) {
        switch (countryRegion) {
            case 'Africa':
                nameElement.classList.add('africa');
                break
            case 'Americas':
                nameElement.classList.add('americas');
                break
            case 'Asia':
                nameElement.classList.add('asia');
                break
            case 'Europe':
                nameElement.classList.add('europe');
                break
            case 'Oceania':
                nameElement.classList.add('oceania');
                break
        }
}

sortCountries();