import { dateText, highlights } from '../main.js'
import { windCardinalDirection } from './wind_direction.js'
import { ARRAY_NAMES } from "./information.js"
import { WEATHER_GET, INFO_GET, DATA_GET, NEXT_DAY, PREVIOUS_NIGHT } from './API_data.js'
// - - - - - - - - - - - - - - - - - - - - - - - - - - - [IMPORT]


export function createTables(i, table) {
    let all_object_properties = [...Object.keys(WEATHER_GET), ...Object.keys(INFO_GET), ...Object.keys(DATA_GET)]
    let all_object_values = [...Object.values(WEATHER_GET), ...Object.values(INFO_GET), ...Object.values(DATA_GET)]
    let table1 = document.getElementById(table)
    let new_row = document.createElement('tr')
    let new_cell_header = document.createElement('th')
    let new_cell1 = document.createElement('td')
    let new_cell2 = document.createElement('td')

    table1.append(new_row)
    new_row.append(new_cell_header)
    new_row.setAttribute('id', 'table_row_' + (i + 1))

    document.getElementById('table_row_' + (i + 1)).addEventListener('click', e => {
        e.stopPropagation()
        unfixText(e.currentTarget.cells[1].innerText)

        for (let i = 0; i < ARRAY_NAMES.length; i++) {

            if (ARRAY_NAMES[i].indexOf(unfixText(e.currentTarget.cells[1].innerText)) >= 0) {
                document.getElementById('info_text').innerText = `[${e.currentTarget.cells[0].innerText}] ${ARRAY_NAMES[i][1]}`
                document.getElementById('info_div').classList.replace('info-hidden', 'info-visible')
                console.log(unfixText(e.currentTarget.cells[1].innerText))
            }
        }
    }, { capture: true })

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

export function showTables() {
    let items = Object.keys(WEATHER_GET).length + Object.keys(DATA_GET).length + Object.keys(INFO_GET).length

    for (let i = 0; i < items; i++) {
        if (i < Math.ceil(items / 3)) { createTables(i, 'table-1') }
        if (i >= Math.ceil(items / 3) && i < Math.ceil(items / 3) * 2) { createTables(i, 'table-2') }
        if (i >= Math.ceil(items / 3) * 2) { createTables(i, 'table-3') }
    }

    dateText(3)
    document.getElementById('nit_passada').innerText = `Nit de dia ${dateText(2)} (de 00:00h a 08:00h)`
    document.getElementById('val-1').innerText = `${Math.min(PREVIOUS_NIGHT.api_rain[48], PREVIOUS_NIGHT.api_rain[49], PREVIOUS_NIGHT.api_rain[50], PREVIOUS_NIGHT.api_rain[51], PREVIOUS_NIGHT.api_rain[52], PREVIOUS_NIGHT.api_rain[53], PREVIOUS_NIGHT.api_rain[54], PREVIOUS_NIGHT.api_rain[55], PREVIOUS_NIGHT.api_rain[56])} L/m²`
    document.getElementById('val-2').innerText = `${Math.min(PREVIOUS_NIGHT.api_temperature_2m[48], PREVIOUS_NIGHT.api_temperature_2m[49], PREVIOUS_NIGHT.api_temperature_2m[50], PREVIOUS_NIGHT.api_temperature_2m[51], PREVIOUS_NIGHT.api_temperature_2m[52], PREVIOUS_NIGHT.api_temperature_2m[53], PREVIOUS_NIGHT.api_temperature_2m[54], PREVIOUS_NIGHT.api_temperature_2m[55], PREVIOUS_NIGHT.api_temperature_2m[56])} °C`
    document.getElementById('val-3').innerText = `${Math.min(PREVIOUS_NIGHT.api_apparent_temperature[48], PREVIOUS_NIGHT.api_apparent_temperature[49], PREVIOUS_NIGHT.api_apparent_temperature[50], PREVIOUS_NIGHT.api_apparent_temperature[51], PREVIOUS_NIGHT.api_apparent_temperature[52], PREVIOUS_NIGHT.api_apparent_temperature[53], PREVIOUS_NIGHT.api_apparent_temperature[54], PREVIOUS_NIGHT.api_apparent_temperature[55], PREVIOUS_NIGHT.api_apparent_temperature[56])} °C`
    document.getElementById('val-4').innerText = `${Math.min(PREVIOUS_NIGHT.api_windgusts_10m[48], PREVIOUS_NIGHT.api_windgusts_10m[49], PREVIOUS_NIGHT.api_windgusts_10m[50], PREVIOUS_NIGHT.api_windgusts_10m[51], PREVIOUS_NIGHT.api_windgusts_10m[52], PREVIOUS_NIGHT.api_windgusts_10m[53], PREVIOUS_NIGHT.api_windgusts_10m[54], PREVIOUS_NIGHT.api_windgusts_10m[55], PREVIOUS_NIGHT.api_windgusts_10m[56])} Km/h`
    document.getElementById('val-5').innerText = `${Math.min(PREVIOUS_NIGHT.api_freezinglevel_height[48], PREVIOUS_NIGHT.api_freezinglevel_height[49], PREVIOUS_NIGHT.api_freezinglevel_height[50], PREVIOUS_NIGHT.api_freezinglevel_height[51], PREVIOUS_NIGHT.api_freezinglevel_height[52], PREVIOUS_NIGHT.api_freezinglevel_height[53], PREVIOUS_NIGHT.api_freezinglevel_height[54], PREVIOUS_NIGHT.api_freezinglevel_height[55], PREVIOUS_NIGHT.api_freezinglevel_height[56])} m`
    highlights(PREVIOUS_NIGHT, 'val-6', 48, 56)
    document.getElementById('prediccio_dema').innerText = `Predicció de demà dia ${dateText(3)} basada en l'informació més recent.`
    document.getElementById('val-7').innerText = `${NEXT_DAY.api_temperature_2m_min} °C`
    document.getElementById('val-8').innerText = `${NEXT_DAY.api_temperature_2m_max} °C`
    document.getElementById('val-9').innerText = `${Math.round(NEXT_DAY.api_precipitation_sum * 0.7)} - ${Math.round(NEXT_DAY.api_precipitation_sum)} L/m²`
    document.getElementById('val-10').innerText = `${NEXT_DAY.api_windspeed} Km/h`
    document.getElementById('val-11').innerText = `${windCardinalDirection(NEXT_DAY.api_winddirection)} `
    highlights(NEXT_DAY, 'val-12', 72, 96)
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

function unfixText(table_name) {
    let variable_name_arr = table_name.split(' ')
    let variable_name = variable_name_arr.join('_').toLowerCase()
    return variable_name
}
