import { change } from '../main.js'
import { API_URL } from "./locations.js"
// - - - - - - - - - - - - - - - - - - - - - - - - - - - [IMPORT]


export function selectLocation() {
    let select_value = document.getElementById("form-select")
    console.log(select_value.value)
    change(select_value.value)
}

export function createOptions() {
    let select_value = document.getElementById("form-select")
    for (let i = 1; i < API_URL.length; i++) {

        let new_option = document.createElement('option')
        select_value.append(new_option)
        new_option.setAttribute('value', i)
        new_option.innerText = API_URL[i][0].match(/[^\d][^\s][a-z\sàèéíòóùúäëïöïü]{1,}/gi)
    }
}