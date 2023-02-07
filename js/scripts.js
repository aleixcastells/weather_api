const API_URL = 'https://api.open-meteo.com/v1/forecast?latitude=39.69&longitude=3.35&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation,rain,showers,freezinglevel_height,weathercode,surface_pressure,visibility,evapotranspiration,cape,windgusts_10m,soil_temperature_0cm,soil_temperature_6cm,soil_moisture_1_3cm,soil_moisture_3_9cm,soil_moisture_9_27cm,soil_moisture_27_81cm,shortwave_radiation_instant,direct_radiation_instant,diffuse_radiation_instant,direct_normal_irradiance_instant,terrestrial_radiation_instant&models=best_match&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,showers_sum,windspeed_10m_max,winddirection_10m_dominant&current_weather=true&timezone=Europe%2FBerlin&past_days=2'
// API Documentation https://open-meteo.com/en/docs#api-documentation

const INFO = {}
const WEATHER = {}
const DATA = {}
const PREVIOUS_NIGHT = {}
const NEXT_DAY = {}
const FORECAST = {}

const INFO_GET = {
    get sortida_sol() { return `${INFO.api_sunrise.match(/.....$/)} h` },
    get posta_sol() { return `${INFO.api_sunset.match(/.....$/)} h` },
    get latitud() { return `${INFO.api_latitude} °N` },
    get longitud() { return `${INFO.api_longitude} °E` },
    get zona_horaria() { return `${INFO.api_timezone}` },
}

const WEATHER_GET = {
    get darrera_actualització() { return `${WEATHER.api_current_time.match(/.....$/)} h` },
    get data_avui() { return `${INFO.api_current_date.match(/^........../)}` },
    get temperatura() { return `${WEATHER.api_temperature} °C` },
    get temperatura_aparent() { return `${WEATHER.api_apparent_temperature} °C` },
    get temps() { return weatherCode(WEATHER.api_weathercode) },
    get direcció_vent() { return `${windCardinalDirection(WEATHER.api_winddirection)}` },
    get vent() { return `${WEATHER.api_windspeed} Km/h` },
    get ratxes_vent() { return `${WEATHER.api_windgusts_10m} Km/h` },
    get pluja_aquesta_hora() { return `${WEATHER.api_rain} mm` },
    get pluja_total_avui() { return `${WEATHER.api_precipitation_sum} mm` },
    get temperatura_min_avui() { return `${WEATHER.api_temperature_2m_min} °C` },
    get temperatura_max_avui() { return `${WEATHER.api_temperature_2m_max} °C` },
    get humitat_relativa() { return `${WEATHER.api_relativehumidity_2m} %` },
    get visibilitat() { return `${Math.round(WEATHER.api_visibility / 1000)} Km` },
    get radiació_difosa() { return `${WEATHER.api_diffuse_radiation_instant} W/m²` },
    get DNI() { return `${WEATHER.api_direct_normal_irradiance_instant} W/m²` },
    get radiació_directa() { return `${WEATHER.api_direct_radiation_instant} W/m²` },
    get radiació_ona_curta() { return `${WEATHER.api_shortwave_radiation_instant} W/m²` },
    get radiació_terrestre() { return `${WEATHER.api_terrestrial_radiation_instant} W/m²` },
}

const DATA_GET = {
    get evapotranspiració() { return `${DATA.api_evapotranspiration} mm` },
    get punt_rosada() { return `${DATA.api_dewpoint_2m} °C` },
    get cota_neu() { return `${DATA.api_freezinglevel_height} m` },
    get humitat_terra_3cm() { return `${DATA.api_soil_moisture_1_3cm} %` },
    get humitat_terra_9cm() { return `${DATA.api_soil_moisture_3_9cm} %` },
    get humitat_terra_27cm() { return `${DATA.api_soil_moisture_9_27cm} %` },
    get humitat_terra_81cm() { return `${DATA.api_soil_moisture_27_81cm} %` },
    get temperatura_terra_0cm() { return `${DATA.api_soil_temperature_0cm} °C` },
    get temperatura_terra_6cm() { return `${DATA.api_soil_temperature_6cm} °C` },
    get CAPE() { return `${DATA.api_cape} J/kg` },
}

apiFetch()

async function apiFetch() {

    const RESPONSE = await fetch(API_URL)
    const API_DATA = await RESPONSE.json()

    let current_time_index = API_DATA.hourly.time.indexOf(API_DATA.current_weather.time)

    WEATHER.api_current_time = API_DATA.current_weather.time
    INFO.api_current_date = API_DATA.current_weather.time
    INFO.api_latitude = API_DATA.latitude
    INFO.api_longitude = API_DATA.longitude
    INFO.api_timezone = API_DATA.timezone_abbreviation
    INFO.api_sunrise = API_DATA.daily.sunrise[2]
    INFO.api_sunset = API_DATA.daily.sunset[2]
    WEATHER.api_temperature = API_DATA.current_weather.temperature
    WEATHER.api_weathercode = API_DATA.current_weather.weathercode
    WEATHER.api_windspeed = API_DATA.current_weather.windspeed
    WEATHER.api_winddirection = API_DATA.current_weather.winddirection
    WEATHER.api_precipitation_sum = API_DATA.daily.precipitation_sum[2] + API_DATA.daily.showers_sum[2]
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

    console.log(API_DATA)
    // console.log(current_time_index)
    showTables()
    colorAccents()
    weekForecast()

}
function checkMaxValues(value, id, max, accent) {
    if (value >= max) { document.getElementById(id).classList.add(accent) }
}
function checkMinValues(value, id, max, accent) {
    if (value <= max) { document.getElementById(id).classList.add(accent) }
}
function colorAccents() {

    // Check max
    checkMaxValues(WEATHER.api_windspeed, 'vent', 50, 'red_accent')
    checkMaxValues(WEATHER.api_windgusts_10m, 'ratxa_vent_màxima', 50, 'red_accent')
    checkMaxValues(WEATHER.api_diffuse_radiation_instant, 'radiació_difosa', 2000, 'red_accent')
    checkMaxValues(WEATHER.api_direct_normal_irradiance_instant, 'DNI', 2000, 'red_accent')
    checkMaxValues(WEATHER.api_direct_radiation_instant, 'radiació_directa', 2000, 'red_accent')
    checkMaxValues(WEATHER.radiació_ona_curta, 'radiació_ona_curta', 2000, 'red_accent')
    checkMaxValues(WEATHER.api_terrestrial_radiation_instant, 'radiació_terrestre', 2000, 'red_accent')

    // Check min
    checkMinValues(WEATHER.api_temperature, 'temperatura', 10, 'red_accent')
    checkMinValues(WEATHER.api_apparent_temperature, 'temperatura_aparent', 5, 'red_accent')
    checkMinValues(WEATHER.api_freezinglevel_height, 'cota_neu', 200, 'red_accent')
}
function createTables(i, table) {

    let all_object_properties = [...Object.keys(WEATHER_GET), ...Object.keys(INFO_GET), ...Object.keys(DATA_GET)]
    let all_object_values = [...Object.values(WEATHER_GET), ...Object.values(INFO_GET), ...Object.values(DATA_GET)]

    let table1 = document.getElementById(table)
    let new_row = document.createElement('tr')
    let new_cell_header = document.createElement('th')
    let new_cell1 = document.createElement('td')
    let new_cell2 = document.createElement('td')

    table1.append(new_row)
    new_row.append(new_cell_header)
    new_row.classList.add('blue-hover')

    new_cell_header.innerText = i + 1
    new_row.append(new_cell1)

    new_cell1.innerText = fixText(all_object_properties[i])
    new_cell1.classList.add('no-break')

    new_row.append(new_cell2)
    new_cell2.innerText = all_object_values[i]
    new_cell2.classList.add('no-break', 'table-value')
    new_cell2.setAttribute('id', all_object_properties[i])
}
function showTables() {
    let items = Object.keys(WEATHER_GET).length + Object.keys(DATA_GET).length + Object.keys(INFO_GET).length

    for (let i = 0; i < items; i++) {

        if (i < Math.ceil(items / 3)) { createTables(i, 'table-1') }
        if (i >= Math.ceil(items / 3) && i < Math.ceil(items / 3) * 2) { createTables(i, 'table-2') }
        if (i >= Math.ceil(items / 3) * 2) { createTables(i, 'table-3') }
    }
    dateText(3)

    document.getElementById('nit_passada').innerText = `Nit de dia ${dateText(2)} (de 00:00h a 08:00h)`
    document.getElementById('val-1').innerText = `${Math.min(PREVIOUS_NIGHT.api_rain[48], PREVIOUS_NIGHT.api_rain[49], PREVIOUS_NIGHT.api_rain[50], PREVIOUS_NIGHT.api_rain[51], PREVIOUS_NIGHT.api_rain[52], PREVIOUS_NIGHT.api_rain[53], PREVIOUS_NIGHT.api_rain[54], PREVIOUS_NIGHT.api_rain[55], PREVIOUS_NIGHT.api_rain[56])} mm`
    document.getElementById('val-2').innerText = `${Math.min(PREVIOUS_NIGHT.api_temperature_2m[48], PREVIOUS_NIGHT.api_temperature_2m[49], PREVIOUS_NIGHT.api_temperature_2m[50], PREVIOUS_NIGHT.api_temperature_2m[51], PREVIOUS_NIGHT.api_temperature_2m[52], PREVIOUS_NIGHT.api_temperature_2m[53], PREVIOUS_NIGHT.api_temperature_2m[54], PREVIOUS_NIGHT.api_temperature_2m[55], PREVIOUS_NIGHT.api_temperature_2m[56])} °C`
    document.getElementById('val-3').innerText = `${Math.min(PREVIOUS_NIGHT.api_apparent_temperature[48], PREVIOUS_NIGHT.api_apparent_temperature[49], PREVIOUS_NIGHT.api_apparent_temperature[50], PREVIOUS_NIGHT.api_apparent_temperature[51], PREVIOUS_NIGHT.api_apparent_temperature[52], PREVIOUS_NIGHT.api_apparent_temperature[53], PREVIOUS_NIGHT.api_apparent_temperature[54], PREVIOUS_NIGHT.api_apparent_temperature[55], PREVIOUS_NIGHT.api_apparent_temperature[56])} °C`
    document.getElementById('val-4').innerText = `${Math.min(PREVIOUS_NIGHT.api_windgusts_10m[48], PREVIOUS_NIGHT.api_windgusts_10m[49], PREVIOUS_NIGHT.api_windgusts_10m[50], PREVIOUS_NIGHT.api_windgusts_10m[51], PREVIOUS_NIGHT.api_windgusts_10m[52], PREVIOUS_NIGHT.api_windgusts_10m[53], PREVIOUS_NIGHT.api_windgusts_10m[54], PREVIOUS_NIGHT.api_windgusts_10m[55], PREVIOUS_NIGHT.api_windgusts_10m[56])} Km/h`
    document.getElementById('val-5').innerText = `${Math.min(PREVIOUS_NIGHT.api_freezinglevel_height[48], PREVIOUS_NIGHT.api_freezinglevel_height[49], PREVIOUS_NIGHT.api_freezinglevel_height[50], PREVIOUS_NIGHT.api_freezinglevel_height[51], PREVIOUS_NIGHT.api_freezinglevel_height[52], PREVIOUS_NIGHT.api_freezinglevel_height[53], PREVIOUS_NIGHT.api_freezinglevel_height[54], PREVIOUS_NIGHT.api_freezinglevel_height[55], PREVIOUS_NIGHT.api_freezinglevel_height[56])} m`

    highlights(PREVIOUS_NIGHT, 'val-6', 48, 56)

    document.getElementById('prediccio_dema').innerText = `Predicció de demà dia ${dateText(3)} basada en l'informació més recent.`
    document.getElementById('val-7').innerText = `${NEXT_DAY.api_temperature_2m_min} °C`
    document.getElementById('val-8').innerText = `${NEXT_DAY.api_temperature_2m_max} °C`
    document.getElementById('val-9').innerText = `${Math.round(NEXT_DAY.api_precipitation_sum * 0.7)} - ${Math.round(NEXT_DAY.api_precipitation_sum)} mm`
    document.getElementById('val-10').innerText = `${NEXT_DAY.api_windspeed} Km/h`
    document.getElementById('val-11').innerText = `${windCardinalDirection(NEXT_DAY.api_winddirection)} `

    highlights(NEXT_DAY, 'val-12', 72, 96)
}

function weatherCode(code) {
    switch (code) {
        case 0: return 'Clar'
        case 1: return 'Mig tapat'
        case 2: return 'Tapat'
        case 3: return 'Molt tapat'
        case 45: case 48: return 'Boira'
        case 51: return 'Babaí'
        case 53: return 'Brusca suau'
        case 55: return 'Brusca intensa'
        case 56: case 57: return 'Babaí gelat'
        case 61: return 'Pluja fina'
        case 63: return 'Pluja'
        case 65: return 'Pluja intensa'
        case 66: case 67: return 'Pluja gelada'
        case 77: return 'Gebre'
        case 80: return 'Ruixat lleuger'
        case 81: return 'Ruixat moderat'
        case 82: return 'Ruixat intens'
        case 85: case 86: return 'Neu'
        case 95: return 'Llamps i trons'
        case 96: case 99: return 'Calabruix'
    }
}
function fixText(variable_name) {
    let table_cell_text = ''
    let words_array = variable_name.split('_')

    for (let i = 0; i < words_array.length; i++) {
        words_array[i] = words_array[i].charAt(0).toUpperCase() + words_array[i].slice(1)
    }
    table_cell_text = words_array.join(" ")

    return table_cell_text
}
function windCardinalDirection(degrees) {
    const CARDINAL_POINTS = [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5]
    const DELTAS = []
    CARDINAL_POINTS.forEach((point) => { DELTAS.push(Math.abs(degrees - point)) })

    let smallest_delta = Math.min(...DELTAS)
    let closest_degree = CARDINAL_POINTS[DELTAS.indexOf(smallest_delta)]

    switch (closest_degree) {
        case 0: return `N (${degrees}°)`
        case 22.5: return `NNE (${degrees}°)`
        case 45: return `NE (${degrees}°)`
        case 67.5: return `NEE (${degrees}°)`
        case 90: return `E (${degrees}°)`
        case 112.5: return `SEE (${degrees}°)`
        case 135: return `SE (${degrees}°)`
        case 157.5: return `SSE (${degrees}°)`
        case 180: return `S (${degrees}°)`
        case 202.5: return `SSO (${degrees}°)`
        case 225: return `SO (${degrees}°)`
        case 247.5: return `SOO (${degrees}°)`
        case 270: return `O (${degrees}°)`
        case 292.5: return `NOO (${degrees}°)`
        case 315: return `NO (${degrees}°)`
        case 337.5: return `NNO (${degrees}°)`
    }
}

function highlights(dia, lloc_taula, min, max) {

    let highlights_array = []

    for (let i = min; i < max; i++) {
        if (highlights_array.indexOf(dia.api_weathercode[i]) == -1) {
            document.getElementById(lloc_taula).innerText += `[${weatherCode(dia.api_weathercode[i])}]\n `
            highlights_array.push(dia.api_weathercode[i])
        }
    }
}

function weekForecast() {
    for (let i = 0; i < 7; i++) {
        weatherIcon(i)
        document.getElementById('dia_' + (i + 1)).innerText = 'Dia ' + FORECAST.api_time[i + 2].match(/..$/)
        document.getElementById('div_dia_' + (i + 1)).classList.add(weatherIcon(FORECAST.api_weathercode[i + 2]))
    }
}

function weatherIcon(weathercode) {
    switch (weathercode) {
        case 0: return 'sun'
        case 1: return 'part_cloud'
        case 2: case 3: case 45: case 48: return 'cloud'
        case 51: case 53: case 55: case 56: case 57: case 61: case 63: case 65: case 66: case 67: return 'rain'
        case 77: case 85: case 86: return 'snow'
        case 95: case 80: case 81: case 82: case 96: case 99: return 'storm'
    }
}

function dateText(date_index) {
    return FORECAST.api_time[date_index].match(/[1-9][0-9]*$/g)
}
