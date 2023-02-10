import { DATE } from "../main.js"
import { dateFormat } from "./formatting.js"
import { windCardinalDirection } from "./wind_direction.js"
import { weatherCode } from "./weathercode.js"
import { localTime } from "./local_time.js"

// - - - - - - - - - - - - - - - - - - - - - - - - - - - [IMPORT]

export const INFO = {
  get dia_setmana() {
    return DATE.getDay()
  },
  get hores() {
    return DATE.getHours()
  },
  get minuts() {
    return DATE.getMinutes()
  },
}

export const WEATHER = {}
export const DATA = {}
export const PREVIOUS_NIGHT = {}
export const NEXT_DAY = {}
export const FORECAST = {}

export const INFO_GET = {
  get sortida_sol() {
    return `${INFO.api_sunrise.match(/.....$/)} h`
  },
  get posta_sol() {
    return `${INFO.api_sunset.match(/.....$/)} h`
  },
  get latitud() {
    return `${INFO.api_latitude.toFixed(2)} °N`
  },
  get longitud() {
    return `${INFO.api_longitude.toFixed(2)} °E`
  },
}

export const WEATHER_GET = {
  get hora() {

    let extra_zero_h = ""

    let current_local_time_hora = INFO.date_hora.match(/^(\d\d)/)
    let current_local_time_minuts = INFO.date_hora.match(/(\d\d)\s\w$/)

    let current_local_time_full = localTime(Number(current_local_time_hora[1]), Number(current_local_time_minuts[1]))
    let current_local_time_full_h_number = current_local_time_full.match(/^(\d{1,})/)[1]

    if (Number(current_local_time_full_h_number) < 10) { extra_zero_h = '0' }

    return `${extra_zero_h}${localTime(Number(current_local_time_hora[1]), Number(current_local_time_minuts[1]))} h`
  },
  get darrera_actualització() {
    return `${WEATHER.api_current_time.match(/.....$/)} h`
  },
  get data_avui() {
    return `${dateFormat()}`
  },
  get temperatura() {
    return `${WEATHER.api_temperature} °C`
  },
  get temperatura_aparent() {
    return `${WEATHER.api_apparent_temperature} °C`
  },
  get pressió_mar() {
    return `${WEATHER.api_pressure_msl} hPa`
  },
  get pressió_superficie() {
    return `${WEATHER.api_surface_pressure} hPa`
  },
  get direcció_vent() {
    return `${windCardinalDirection(WEATHER.api_winddirection)}`
  },
  get vent() {
    return `${WEATHER.api_windspeed} Km/h`
  },
  get ratxes_vent() {
    return `${WEATHER.api_windgusts_10m} Km/h`
  },
  get pluja_aquesta_hora() {
    return `${WEATHER.api_rain} L/m²`
  },
  get pluja_total_avui() {
    return `${WEATHER.api_precipitation_sum} L/m²`
  },
  get temps() {
    return weatherCode(WEATHER.api_weathercode)
  },
  get temperatura_min_avui() {
    return `${WEATHER.api_temperature_2m_min} °C`
  },
  get temperatura_max_avui() {
    return `${WEATHER.api_temperature_2m_max} °C`
  },
  get humitat_relativa() {
    return `${WEATHER.api_relativehumidity_2m} %`
  },
  get visibilitat() {
    return `${Math.round(WEATHER.api_visibility / 1000)} Km`
  },
  get radiació_difusa() {
    return `${WEATHER.api_diffuse_radiation_instant} W/m²`
  },
  get radiació_directa() {
    return `${WEATHER.api_direct_radiation_instant} W/m²`
  },
  get radiació_ona_curta() {
    return `${WEATHER.api_shortwave_radiation_instant} W/m²`
  },
  get radiació_terrestre() {
    return `${WEATHER.api_terrestrial_radiation_instant} W/m²`
  },
}

export const DATA_GET = {
  get evapotranspiració() {
    return `${DATA.api_evapotranspiration} L/m²`
  },
  get punt_rosada() {
    return `${DATA.api_dewpoint_2m} °C`
  },
  get cota_neu() {
    return `${DATA.api_freezinglevel_height} m`
  },
  get humitat_terra_3cm() {
    return `${DATA.api_soil_moisture_1_3cm} %`
  },
  get humitat_terra_9cm() {
    return `${DATA.api_soil_moisture_3_9cm} %`
  },
  get humitat_terra_27cm() {
    return `${DATA.api_soil_moisture_9_27cm} %`
  },
  get humitat_terra_81cm() {
    return `${DATA.api_soil_moisture_27_81cm} %`
  },
  get temperatura_terra_0cm() {
    return `${DATA.api_soil_temperature_0cm} °C`
  },
  get temperatura_terra_6cm() {
    return `${DATA.api_soil_temperature_6cm} °C`
  },
  get CAPE() {
    return `${DATA.api_cape} J/kg`
  },
}
