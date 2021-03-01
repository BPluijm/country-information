async function sortCountries () {
    try {
        const result = await axios.get("https://restcountries.eu/rest/v2/all");
        const sorted = result.data.sort((country1, country2) => country1.population - country2.population)
        console.log(sorted);
        makeList(sorted);
    } catch (error) {
        console.log(error);
    }
}

function makeList(array) {
    const list = document.querySelector('.list');
    for (let i = 0; i < array.length; i++) {
        let country = document.createElement('li')
        let name = document.createElement('span');
        let flag = document.createElement('img');
        name.classList.add('country-name'); // = hetzelfde als setAttribute
        flag.classList.add('country-flag'); // = hetzelfde als setAttribute
        name.textContent = array[i].name;
        flag.setAttribute('src', array[i].flag);
        country.appendChild(flag);
        country.appendChild(name);
        list.appendChild(country);
    }

}

sortCountries();