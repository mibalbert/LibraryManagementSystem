
/* main.js */

// deno-lint-ignore-file

import { file2DataURI } from './util.js'

window.addEventListener('DOMContentLoaded', () => {
	//console.log('DOMContentLoaded')
    document.querySelector('input[type="file"]').addEventListener('change', (event) => showAvatar(event))
})

async function showAvatar(event) {
    //console.log('ADD FILE')
    const files = event.target.files
      const file = files[0]
      if(file) {
        const data = await file2DataURI(file)
        const img = document.querySelector('form img')
        img.src = data
     }
}

//Display the change in price when slider is moved
const slider = document.querySelector('[name=quantity]')
slider.addEventListener('input', event => {
    document.querySelector('[name=quan_val]').value = slider.value
})
