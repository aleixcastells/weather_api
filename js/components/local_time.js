import { INFO } from './API_data.js'
// - - - - - - - - - - - - - - - - - - - - - - - - - - - [IMPORT]


export function localTime(hores, minuts) {

    let time_zone_difference = 0
    let local_time_minutes = (hores + time_zone_difference) * 60 + minuts
    let local_time_offset = (INFO.api_utc_offset / 60 / 60) - 1

    if (local_time_minutes > 1440) {
        return minutesToTime(local_time_minutes - 1440)
    }

    if (local_time_minutes <= 1440) {
        return minutesToTime(local_time_minutes, local_time_offset)
    }
}

function minutesToTime(minutes, offset) {

    let time_hours = Math.floor(minutes / 60)
    let time_minutes = minutes % 60

    if (time_hours - offset < 0) { time_hours = 24 + time_hours + offset }
    if (time_hours + offset > 23) { time_hours = time_hours + offset - 24 }

    else { time_hours = time_hours + offset }
    return `${time_hours}:${time_minutes}`
}