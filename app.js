const form = document.querySelector('#form');
const weatherContainer = document.querySelector('.flex-row');
const randNum = () => Math.random();

const makeJoke = async () => {
    const config = { headers: {Accept: 'application/json'} } 
    const jokeData = await axios.get('https://icanhazdadjoke.com/', config);
    return jokeData.data.joke;
}

const clearContainer = () => {
    if(weatherContainer.childElementCount > 0){
        while (weatherContainer.firstChild) {
            weatherContainer.removeChild(weatherContainer.firstChild);
          }
    }
}

const postJoke = async () => {
    clearContainer();
    const p = document.createElement('p');
    const jokeText = await makeJoke();
    p.innerText = jokeText;
    weatherContainer.append(p);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let num = randNum();
    const city = form.children[1].value;
    const country = form.children[3].value;
    console.log(city + country)

    const weatherData = async () => {
        try{
            clearContainer();
        
            makeDiv("left");
            makeDiv('right');

            const weatherLeft = document.querySelector('.left');
            const weatherRight = document.querySelector('.right');

            const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=imperial&appid=c20b708b2952fc5492619c70affe0677`);
            const weatherData = data.data;
            makePtag(weatherData.main.temp, weatherLeft, 'Current Temp: ', ' F');
            makePtag(weatherData.main.temp_max, weatherLeft, 'High: ', ' F');
            makePtag(weatherData.main.temp_min, weatherLeft, 'Low: ', ' F');
            makePtag(weatherData.wind.speed, weatherRight, 'Wind ', ' MPH');
            makePtag(weatherData.main.humidity, weatherRight, 'Humidity ', ' %');
            makePtag(weatherData.weather[0].description, weatherRight, '', '');
            console.log(weatherData)
        }
        catch(e){
            alert('That may not be how you spell it')
        }
    }
    if(num > .5){
        weatherData(); 
    }
    else{
        postJoke();
    }
    
})

function makePtag (data, container, str, str2) {
    const p = document.createElement('p');
    p.innerText = str + data + str2;
    container.append(p);
}

function makeDiv (cl) {
    const d = document.createElement('div');
    d.classList.add('weather-data')
    d.classList.add(cl)
    weatherContainer.append(d);
}