const form = document.querySelector('#form');
const weatherDataDiv = document.querySelector('.weather-data');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = form.children[1].value;
    const country = form.children[3].value;
    console.log(city + country)

    const weatherData = async () => {
        try{
            const data = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=imperial&appid=c20b708b2952fc5492619c70affe0677`);
            const weatherData = data.data;
            makePtag(weatherData.main.temp_max);
            console.log(weatherData)
        }
        catch(e){
            console.log(e);
        }
    }

    weatherData();
})

function makePtag (data) {
    const p = document.createElement('p');
    p.innerText = data;
    weatherDataDiv.append(p);
}

