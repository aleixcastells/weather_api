const API_URL = 'https://api.open-meteo.com/v1/forecast?latitude=39.69&longitude=3.35&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,snowfall,cloudcover&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,windspeed_10m_max&current_weather=true&timezone=Europe%2FBerlin'



async function apiFetch() {
    const RESPONSE = await fetch(API_URL)
    const DATA = await RESPONSE.json()

    console.log(DATA)

    document.getElementById('temp').textContent = DATA.current_weather.temperature
}


apiFetch()

