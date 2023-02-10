import { API_URL } from "./locations.js"
import { showTables } from "./tables.js"
import { isDay } from "./weathercode.js"
import { location_number, writeTitle } from '../main.js'
import { WEATHER, INFO, DATA, NEXT_DAY, PREVIOUS_NIGHT, FORECAST } from './API_data.js'
import { getHoursFormat, getMinutesFormat, dateFormat, dayCharacter } from "./formatting.js"
import { selectLocation } from "./location_dropdown.js"
import { weekForecast } from "./forecast.js"

// - - - - - - - - - - - - - - - - - - - - - - - - - - - [IMPORT]


export async function apiFetch() {

    console.log(`Fetching... ${API_URL[location_number][0].match(/[^\d][^\s]\S{1,}/gi)}`)

    const RESPONSE = await fetch(`${API_URL[0][0]}${API_URL[location_number][1]}${API_URL[0][1]}${API_URL[location_number][2]}${API_URL[0][2]}${API_URL[location_number][4]}${API_URL[0][3]}${API_URL[location_number][3]}${API_URL[0][4]}`)
    const API_DATA = await RESPONSE.json()

    let current_time_index = API_DATA.hourly.time.indexOf(API_DATA.current_weather.time)

    WEATHER.api_current_time = API_DATA.current_weather.time
    INFO.date_hora = `${getHoursFormat()}:${getMinutesFormat()} h`
    INFO.api_current_date = API_DATA.current_weather.time
    INFO.api_latitude = API_DATA.latitude
    INFO.api_longitude = API_DATA.longitude
    INFO.api_timezone = API_DATA.timezone_abbreviation
    INFO.api_utc_offset = API_DATA.utc_offset_seconds
    INFO.api_sunrise = API_DATA.daily.sunrise[2]
    INFO.api_sunset = API_DATA.daily.sunset[2]
    WEATHER.api_temperature = API_DATA.current_weather.temperature
    WEATHER.api_weathercode = API_DATA.current_weather.weathercode
    WEATHER.api_windspeed = API_DATA.current_weather.windspeed
    WEATHER.api_winddirection = API_DATA.current_weather.winddirection
    WEATHER.api_precipitation_sum = (API_DATA.daily.precipitation_sum[2] + API_DATA.daily.showers_sum[2]).toFixed(2)
    WEATHER.api_temperature_2m_min = API_DATA.daily.temperature_2m_min[2]
    WEATHER.api_temperature_2m_max = API_DATA.daily.temperature_2m_max[2]
    WEATHER.api_apparent_temperature = API_DATA.hourly.apparent_temperature[current_time_index]
    WEATHER.api_relativehumidity_2m = API_DATA.hourly.relativehumidity_2m[current_time_index]
    WEATHER.api_rain = API_DATA.hourly.rain[current_time_index]
    WEATHER.api_showers = API_DATA.daily.showers_sum[2]
    WEATHER.api_windgusts_10m = API_DATA.hourly.windgusts_10m[current_time_index]
    WEATHER.api_visibility = API_DATA.hourly.visibility[current_time_index]
    WEATHER.api_diffuse_radiation_instant = API_DATA.hourly.diffuse_radiation_instant[current_time_index]
    WEATHER.api_direct_normal_irradiance_instant = API_DATA.hourly.direct_normal_irradiance_instant[current_time_index]
    WEATHER.api_direct_radiation_instant = API_DATA.hourly.direct_radiation_instant[current_time_index]
    WEATHER.api_shortwave_radiation_instant = API_DATA.hourly.shortwave_radiation_instant[current_time_index]
    WEATHER.api_terrestrial_radiation_instant = API_DATA.hourly.terrestrial_radiation_instant[current_time_index]
    WEATHER.api_pressure_msl = API_DATA.hourly.pressure_msl[current_time_index]
    WEATHER.api_surface_pressure = API_DATA.hourly.surface_pressure[current_time_index]

    DATA.api_evapotranspiration = API_DATA.hourly.evapotranspiration[current_time_index]
    DATA.api_dewpoint_2m = API_DATA.hourly.dewpoint_2m[current_time_index]
    DATA.api_freezinglevel_height = API_DATA.hourly.freezinglevel_height[current_time_index]
    DATA.api_soil_moisture_1_3cm = API_DATA.hourly.soil_moisture_1_3cm[current_time_index]
    DATA.api_soil_moisture_3_9cm = API_DATA.hourly.soil_moisture_3_9cm[current_time_index]
    DATA.api_soil_moisture_9_27cm = API_DATA.hourly.soil_moisture_9_27cm[current_time_index]
    DATA.api_soil_moisture_27_81cm = API_DATA.hourly.soil_moisture_27_81cm[current_time_index]
    DATA.api_soil_temperature_0cm = API_DATA.hourly.soil_temperature_0cm[current_time_index]
    DATA.api_soil_temperature_6cm = API_DATA.hourly.soil_temperature_6cm[current_time_index]
    DATA.api_cape = API_DATA.hourly.cape[current_time_index]

    PREVIOUS_NIGHT.api_temperature_2m = API_DATA.hourly.temperature_2m
    PREVIOUS_NIGHT.api_apparent_temperature = API_DATA.hourly.apparent_temperature
    PREVIOUS_NIGHT.api_rain = API_DATA.hourly.precipitation
    PREVIOUS_NIGHT.api_windgusts_10m = API_DATA.hourly.windgusts_10m
    PREVIOUS_NIGHT.api_weathercode = API_DATA.hourly.weathercode
    PREVIOUS_NIGHT.api_freezinglevel_height = API_DATA.hourly.freezinglevel_height

    NEXT_DAY.api_precipitation_sum = API_DATA.daily.precipitation_sum[3] + API_DATA.daily.showers_sum[3]
    NEXT_DAY.api_temperature_2m_min = API_DATA.daily.temperature_2m_min[3]
    NEXT_DAY.api_temperature_2m_max = API_DATA.daily.temperature_2m_max[3]
    NEXT_DAY.api_weathercode = API_DATA.hourly.weathercode
    NEXT_DAY.api_windspeed = API_DATA.daily.windspeed_10m_max[3]
    NEXT_DAY.api_winddirection = API_DATA.daily.winddirection_10m_dominant[3]

    FORECAST.api_time = API_DATA.daily.time
    FORECAST.api_weathercode = API_DATA.daily.weathercode

    FORECAST.api_sunrise = API_DATA.daily.sunrise
    FORECAST.api_sunset = API_DATA.daily.sunset
    FORECAST.api_temperature_max = API_DATA.daily.temperature_2m_max
    FORECAST.api_temperature_min = API_DATA.daily.temperature_2m_min
    FORECAST.api_windspeed = API_DATA.daily.windspeed_10m_max
    FORECAST.api_winddirection = API_DATA.daily.winddirection_10m_dominant
    FORECAST.api_precipitation_sum = API_DATA.daily.precipitation_sum
    FORECAST.api_showers_sum = API_DATA.daily.showers_sum

    console.log(API_DATA)

    document.getElementById('info_div').classList.replace('info-visible', 'info-hidden')
    document.addEventListener('click', e => {
        document.getElementById('info_div').classList.replace('info-visible', 'info-hidden')
    })

    showTables()
    weekForecast()
    isDay()
    writeTitle()
    dateFormat()

    document.getElementById('form-select').addEventListener('change', selectLocation)
}