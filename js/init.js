const locationForm = document.querySelector('.change-location');
const card = document.querySelector('.card');
const weatherDetails = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

/**
 * 
 * @param {*} data 
 */
const updateUI = data => {
    //console.log(data);
    if (data){
        const {locationDetails, weatherData} = data;
        // Update UI
        weatherDetails.innerHTML = `
            <h5 class="my-3">${locationDetails.EnglishName}</h5>
            <div class="my-3">${weatherData.WeatherText}</div>
            <div class="display-4 my-4">
                <span>${weatherData.Temperature.Metric.Value}</span>
                <span class="c">&deg;C</span>
            </div>
        `;
        // Update icon
        const iconSrc = `img/icons/${weatherData.WeatherIcon}.svg`;
        icon.setAttribute('src', iconSrc);
    
        // Update Day || Night image
        let timeSrc = weatherData.IsDayTime ? 'img/light.svg' : 'img/dark.svg';
        time.setAttribute('src', timeSrc);

        // Remove card d-none
        if(card.classList.contains('d-none')){
            card.classList.remove('d-none');
        }                   
    }else {
        weatherDetails.innerHTML = `
            
        <div class="text-uppercase text-center text-muted details">
            <h5 class="my-3">&nbsp;</h5>
            <div class="my-3"> <h5>Location not Found</h5></div>           
        </div>
        `;               
        time.setAttribute('src', 'img/not_found.svg');        
        if(card.classList.contains('d-none')){
            card.classList.remove('d-none');
        } 
    }     
}

/**
 * Fetch location and weather data depending of the location input value
 * 
 * @param {*} location 
 */
const getData = async location => {        
    let weatherData;
    const locationDetails = await getLocationInformation(location);
    if (locationDetails){
        weatherData = await getWeatherData(locationDetails.Key);
        return { locationDetails, weatherData };
    }       
}


locationForm.addEventListener('submit', e => {
    e.preventDefault();    
    const location = locationForm.city.value.trim();    
    locationForm.reset();
     
    // Update the UI with the new location value
    getData(location)
        .then(data => {            
            updateUI(data);
        })
        .catch(error => console.log(error.message));
})