import { windCardinalDirection } from "./wind_direction.js"
import { weatherIcon } from "./weathercode.js"
import { INFO, FORECAST } from './API_data.js'
import { dayCharacter } from "./formatting.js"
// - - - - - - - - - - - - - - - - - - - - - - - - - - - [IMPORT]


export function weekForecast() {

    for (let i = 0; i < 7; i++) {
        let week_day_number = Number(INFO.dia_setmana + i)
        let week_day_wind_direction = windCardinalDirection(FORECAST.api_winddirection[i + 2]).match(/^\w{1,3}\s[↖↗↘↙←→↑↓]/ig)
        document.getElementById('dia_' + (i + 1)).innerText =
            `${dayCharacter(week_day_number)} ${FORECAST.api_time[i + 2].match(/..$/)}
            \n\n\n\n\n\n\n
            ${isRaining(i)}\n\n\n
            ${FORECAST.api_temperature_max[i + 2]} °C ⤒\n\n\n
            ${FORECAST.api_temperature_min[i + 2]} °C ⤓\n\n\n
            ${FORECAST.api_windspeed[i + 2]} kmh\n
            ${week_day_wind_direction} \n`
        document.getElementById('div_dia_' + (i + 1)).classList.add(weatherIcon(FORECAST.api_weathercode[i + 2]))
    }
    weatherIcon(FORECAST.api_weathercode[2])
    document.getElementById('grafic_container').style.backgroundColor = FORECAST.color
}

function isRaining(i) {
    let rain_estimate = (Number(FORECAST.api_precipitation_sum[i + 2]) + Number(FORECAST.api_showers_sum[i + 2])).toFixed(1)
    if (rain_estimate > 0) {
        return `${(Number(FORECAST.api_precipitation_sum[i + 2]) + Number(FORECAST.api_showers_sum[i + 2])).toFixed(1)}  L/m²`
    }
    if (rain_estimate == 0) { return '0' }
}