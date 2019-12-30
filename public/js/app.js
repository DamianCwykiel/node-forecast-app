const weatherForecast = document.querySelector('form')
const search = document.querySelector('input')
const firstMessage = document.querySelector('#firstMessageForecast')
const secondMessage = document.querySelector('#secondMessageLocation')

weatherForecast.addEventListener('submit', (e) => {
    e.preventDefault()
    // console.log('testing!')
    
    const location = search.value
    
    firstMessage.textContent = 'Loading data...'
    secondMessage.textContent = ''

    if (search.value.length === 0){
        // console.log('Search field cannnot be empty!')
        firstMessage.textContent = `Search field can't be empty!`
    } else {
        // console.log(pogoda)
        fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {   
            response.json().then((data) => {
                if (data.error) {
                    // console.log(data.error)
                    firstMessage.textContent = data.error
                } else {
                    // console.log(data.location)
                    // console.log(data.forecast)
                    firstMessage.textContent = data.forecast
                    secondMessage.textContent = data.location
                }
            })
        })
    }
})