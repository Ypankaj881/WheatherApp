// fetch("https://api.covid19api.com/summary")
//     .then((apidata) => {
//         return apidata.json();
//     })
//     .then((actdata) => {
//         console.log(actdata)
//     })
//     .catch((err) => {
//         console.log(err)
//     });

let loc = document.getElementById('location');
let tempicon = document.getElementById('temp-icon');
let tempvalue = document.getElementById('temp-value');
let climate = document.getElementById('climate');
const searchInput = document.getElementById('search-input');
const searchButon = document.getElementById('search-button');
let iconfile;


searchButon.addEventListener('click', (e) => {
    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value = '';
});

const getWeather = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3da8578ee34f5cee53a86ef0664c58b6`,
            { mode: 'cors' }
        );

        const weatherData = await response.json();

        const { name } = weatherData;
        const { feels_like } = weatherData.main;
        const { id, main } = weatherData.weather[0];

        loc.textContent = name;
        climate.textContent = main;
        tempvalue.textContent = Math.round(feels_like - 273);

        if (id > 200 && id < 300) {
            tempicon.scr = "../image/thunderstorms.png";
        }
        else if (id > 300 && id < 400) {
            tempicon.scr = "../image/cloudy.png";
        }
        else if (id > 500 && id < 600) {
            tempicon.scr = "../image/rainy.png";
        }
        else if (id > 600 && id < 700) {
            tempicon.scr = "../image/snow.png";
        }
        else if (id > 700 && id < 800) {
            tempicon.scr = "../image/cloudy.png";
        }
        else if (id == 800) {
            tempicon.scr = "../image/cloudy.png";
        }

    }
    catch (error) {
        alert('city not found')
    }
};


window.addEventListener('load', () => {
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";

            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=3da8578ee34f5cee53a86ef0664c58b6`

            fetch(api)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    const { name } = data;
                    const { feels_like } = data.main;
                    const { id, main } = data.weather[0];

                    loc.textContent = name;
                    climate.textContent = main;
                    tempvalue.textContent = Math.round(feels_like - 273);
                    // console.log(data)
                    if (id > 200 && id < 300) {
                        tempicon.scr = "../image/thunderstorms.png";
                    }
                    else if (id > 300 && id < 400) {
                        tempicon.scr = "../image/cloudy.png";
                    }
                    else if (id > 500 && id < 600) {
                        tempicon.scr = "../image/rainy.png";
                    }
                    else if (id > 600 && id < 700) {
                        tempicon.scr = "../image/snow.png";
                    }
                    else if (id > 700 && id < 800) {
                        tempicon.scr = "../image/cloudy.png";
                    }
                    else if (id == 800) {
                        tempicon.scr = "../image/cloudy.png";
                    }
                })
        })
    }
})
