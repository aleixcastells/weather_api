// API Documentation https://open-meteo.com/en/docs#api-documentation

import { weatherCode, weatherIcon } from "./components/weathercode.js"
import { apiFetch } from "./components/API_fetch.js"
import { API_URL } from "./components/locations.js"
import { createOptions } from "./components/location_dropdown.js"
import { WEATHER, DATA, PREVIOUS_NIGHT, NEXT_DAY, FORECAST } from "./components/API_data.js"
// - - - - - - - - - - - - - - - - - - - - - - - - - - - [IMPORT]

export let location_number = 1
export const DATE = new Date()

apiFetch()
createOptions()



export function change(new_location_number) {
  wipe()
  location_number = new_location_number
  apiFetch()
}

export function highlights(dia, lloc_taula, min, max) {
  let highlights_array = []
  for (let i = min; i < max; i++) {
    if (highlights_array.indexOf(dia.api_weathercode[i]) == -1) {
      document.getElementById(lloc_taula).innerText += `[${weatherCode(dia.api_weathercode[i])}]\n `
      highlights_array.push(dia.api_weathercode[i])
    }
  }
}

export function dateText(date_index) {
  return FORECAST.api_time[date_index].match(/[1-9][0-9]*$/g)
}

function wipe() {
  const WIPE_CUE = [WEATHER, DATA, PREVIOUS_NIGHT, NEXT_DAY, FORECAST]

  for (let i = 0; i < WIPE_CUE.length; i++) {
    for (const key in WIPE_CUE[i]) {
      delete WIPE_CUE[i][key]
    }
  }
  document.getElementById("table-1").innerHTML = ""
  document.getElementById("table-2").innerHTML = ""
  document.getElementById("table-3").innerHTML = ""
  document.getElementById("val-6").innerHTML = ""
  document.getElementById("val-12").innerHTML = ""
  for (let i = 1; i <= 7; i++) {
    document.getElementById("div_dia_" + i).className = "dia"
  }
  console.clear()

}

function navbarFormat(unformatted_name) {
  let formatted_name = String(unformatted_name.match(/[^\d][^\s][a-z\sàèéíòóùúäëïöïü]{1,}/gi))
  formatted_name = formatted_name.replace(/\s/gi, "").toLocaleLowerCase()
  return formatted_name
}

export function writeTitle() {
  document.getElementById("navbar_title").innerText = `meteo${navbarFormat(API_URL[location_number][0])}`
}
