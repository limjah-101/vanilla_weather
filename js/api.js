const apiKey = 'paxxvmGq9NR6GFExeS12YLcSDOSXeRbv';
const cityURL = 'http://dataservice.accuweather.com/locations/v1/cities/search';
const weatherURL = 'http://dataservice.accuweather.com/currentconditions/v1/';


/**
 * Fetch weather data for a given location
 * 
 * @param {*} locationId 
 */
const getWeatherData = async locationId => {
    const query = `${locationId}?apikey=${apiKey}`;

    const response = await fetch(weatherURL+query);
    const data = await response.json();

    return data[0];
}


/**
 * Get city information and extract the location key code
 * 
 * @param {*} location 
 */
const getLocationInformation = async location => {
    const query = `?apikey=${apiKey}&q=${location}`;

    const response = await fetch(cityURL+query);
    const data = await response.json();

    return data[0];
}
