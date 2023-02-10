import { INFO } from './API_data.js'
import { DATE } from '../main.js'
// - - - - - - - - - - - - - - - - - - - - - - - - - - - [IMPORT]


export function getHoursFormat() {
    if (DATE.getHours() < 10) { return '0' + DATE.getHours() }
    else { return DATE.getHours() }
}

export function getMinutesFormat() {
    if (DATE.getMinutes() < 10) { return '0' + DATE.getMinutes() }
    else { return DATE.getMinutes() }
}

export function dateFormat() {
    let unformatted = `${INFO.api_current_date.match(/^........../)}`
    let date_array = []
    date_array[0] = unformatted.match(/(\d\d)$/)
    date_array[1] = unformatted.match(/(\d\d)\S\d\d$/)
    date_array[2] = unformatted.match(/^(\d\d\d\d)/)
    return `${date_array[0][1]}-${monthCharacter(date_array[1][1])}-${date_array[2][1]}`
}

export function monthCharacter(month_number) {
    switch (month_number) {
        case '01': return 'GEN'
        case '02': return 'FEB'
        case '03': return 'MAR'
        case '04': return 'ABR'
        case '05': return 'MAI'
        case '06': return 'JUN'
        case '07': return 'JUL'
        case '08': return 'AGO'
        case '09': return 'SET'
        case '10': return 'OCT'
        case '11': return 'NOV'
        case '12': return 'DES'
    }
}

export function dayCharacter(day_number) {
    switch (day_number) {
        case 1: return 'Dl'
        case 2: return 'Dt'
        case 3: return 'Dc'
        case 4: return 'Dj'
        case 5: return 'Dv'
        case 6: return 'Ds'
        case 7: return 'Dg'
        case 8: return 'Dl'
        case 9: return 'Dt'
        case 10: return 'Dc'
        case 11: return 'Dj'
        case 12: return 'Dv'
        case 13: return 'Ds'
        case 14: return 'Dg'
    }
}

