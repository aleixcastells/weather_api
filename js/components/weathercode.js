import { FORECAST, INFO_GET, INFO } from './API_data.js'
import { localTime } from './local_time.js'
// - - - - - - - - - - - - - - - - - - - - - - - - - - - [IMPORT]


export function weatherCode(code) {

    switch (code) {
        case 0: return 'Clar'
        case 1: return 'Qualque nigul'
        case 2: return 'Mig'
        case 3: return 'Tapat'
        case 45: case 48: return 'Boira'
        case 51: return 'Babaí'
        case 53: return 'Brusca suau'
        case 55: return 'Brusca intensa'
        case 56: case 57: return 'Babaí gelat'
        case 61: return 'Pluja fina'
        case 63: return 'Pluja'
        case 65: return 'Pluja intensa'
        case 66: case 67: return 'Pluja gelada'
        case 71: return 'Neu lleugera'
        case 73: return 'Neu'
        case 75: return 'Molta neu'
        case 77: return 'Gebre'
        case 80: return 'Ruixat lleuger'
        case 81: return 'Ruixat moderat'
        case 82: return 'Ruixat intens'
        case 85: case 86: return 'Neu'
        case 95: return 'Llamps i trons'
        case 96: case 99: return 'Calabruix'
    }
}

export function weatherIcon(weathercode) {

    switch (weathercode) {
        case 0:
            if (isDay() == true) { FORECAST.color = '#ffdc25'; return 'sun' }
            if (isDay() == false) { FORECAST.color = '#091725'; return 'night' }

        case 1: case 2: FORECAST.color = '#8ab2d1'; return 'part_cloud'
        case 3: FORECAST.color = '#bcbcbc'; return 'cloud'
        case 45: case 48: FORECAST.color = '#bcbcbc'; return 'fog'
        case 51: case 53: case 55: case 56: case 57: FORECAST.color = 'rgb(45 130 175)'; return 'light-rain'
        case 61: case 63: case 66: FORECAST.color = '#086494'; return 'rain'
        case 71: case 73: case 75: case 77: case 85: case 86: FORECAST.color = 'rgb(209 209 209)'; return 'snow'
        case 65: case 67: case 95: case 80: case 81: case 82: case 96: case 99: FORECAST.color = 'rgb(50 72 83)'; return 'storm'
    }
}

export function isDay() {

    let sortida_min = Number(INFO_GET.sortida_sol.match(/[^\w](\d\d)/)[1]) + (Number(INFO_GET.sortida_sol.match(/\d\d/)) * 60)
    let posta_min = Number(INFO_GET.posta_sol.match(/[^\w](\d\d)/)[1]) + (Number(INFO_GET.posta_sol.match(/\d\d/)) * 60)

    let hour_min = Number(localTime(INFO.hores, INFO.minuts).match(/^\d{1,}/) * 60)
    let minute_min = Number(localTime(INFO.hores, INFO.minuts).match(/\d{1,}$/))
    let min = hour_min + minute_min

    if (min >= sortida_min && min <= posta_min) { return true }
    if (min < sortida_min || min > posta_min) { return false }
}