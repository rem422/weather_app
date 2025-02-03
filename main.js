    const API_KEY = "ef157a6338a44d478ea141830251001";

    const cityInput = document.getElementById("search_input");
    const searchBtn = document.getElementById("search_btn");
    const weatherEl = document.querySelector('.container');

    const tempratureEl = document.getElementById("temprature");
    const locationEl = document.getElementById("location");
    const weatherImgEl = document.getElementById("weather_img");
    const conditionEl = document.getElementById("condition");
    const humidityEl = document.getElementById("humidity");
    const windEl = document.getElementById("wind");



    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();

        if(city) {
            fetchWeather(city)
            cityInput.value = "";
        }else {
            alert('Please enter a city');
        }
    });


    const fetchWeather = async (city) => {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&unit=matrics`)
            if(!response.ok) {
                throw new Error('City not found')
            }
            const data = await response.json()
            displayData(data)
            console.log(data);
            
        } catch(error) {
            console.error(`Error fetching data`, error);
        }
    }

    const displayData = (data) => {
        const location  = data.location.name;
        const temprature = `${Math.trunc(data.current.temp_c)}°C`; 
        const condition = data.current.condition.text; 
        const humidity = `${data.current.humidity}%`; 
        const windSpeed = `${Math.trunc(data.current.wind_kph)}Km/h`; 

        const iconUrl = data.current.condition.icon;

        locationEl.innerText = location;
        tempratureEl.innerText = temprature;
        weatherImgEl.src = iconUrl;
        conditionEl.innerText = condition;
        humidityEl.innerText = humidity;
        windEl.innerText = windSpeed;
    }