import { apikey } from './config.js'

const button = document.getElementById("submitButton");
button.addEventListener("click", submitWeather, false);

let searchedWeather = false;

function addStyles() {
   let showWeater = document.getElementById("weatherContainer");
   showWeater.style.display = 'block';
};

function submitWeather(event) {
   event.preventDefault()
   addStyles()
   if (searchedWeather === true) {
      let oldWeather = document.getElementsByClassName("individualWeatherContainer")
      while(oldWeather[0]) {
         oldWeather[0].parentNode.removeChild(oldWeather[0])      
      }
      searchedWeather = false;
   }
   searchedWeather = true;
   const apiUrl = "http://api.weatherapi.com/v1";
   const apiKey = "619ffafbbae84d6baea75929231009";
   let weatherRequest = document.getElementById("weatherInput");
   let subLocation = weatherRequest.value;
   checkWeather(subLocation)
};

function checkWeather(subLocation) {
   let daysShown = 1;
   daysShown = document.getElementById("days").value;

   api = apikey + daysShown;
   let submittedLocation = api + "&q=" + subLocation;
   let request = new XMLHttpRequest();

   request.open("GET", submittedLocation);
   request.send();
   request.onload = () => {
      console.log(request);
      if (request.status === 200) {

         let data = JSON.parse(request.response);
         let forcastData = data.forecast.forecastday;

         console.log(forcastData);
         document.getElementById("locationnName").innerHTML = subLocation;
         for (data of forcastData) {

            let parentDiv = document.getElementById("allWeatherContainer");
            let initialDiv = document.createElement('div');
            let weatherDay = document.createElement('h5');
            let weatherTemp = document.createElement('p');
            let weatherImage = document.createElement('img');
            console.log(data)
         
         
            let weatherTempData = data.day.avgtemp_c;
            //Determiner on temperature unit
            if (document.getElementById('farenheit').checked) {
               weatherTempData = data.day.avgtemp_f;
            };
         
            const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            //grab the data
            let dayOfWeek = new Date(data.date);
            let day = weekday[dayOfWeek.getDay()];
            let weatherImageData = data.day.condition.icon;
            let weatherImagetextData = data.day.condition.text;
            weatherImage.alt = weatherImagetextData
            
            
            //insert the data
            weatherDay.innerHTML = day;
            weatherTemp.innerHTML = weatherTempData;
            weatherImage.src = weatherImageData;
            
            //append the children to the parent div
            initialDiv.className='individualWeatherContainer';
            parentDiv.appendChild(initialDiv);
            initialDiv.appendChild(weatherDay);
            initialDiv.appendChild(weatherTemp);
            initialDiv.appendChild(weatherImage);
         }

      } else {
         console.log('error ${request.status} ${request.StatusText}');
      }
   }
};





// function populateData(data) {

//    // Create the divs, and grab parent
//    let parentDiv = document.getElementById("allWeatherContainer");
//    let initialDiv = document.createElement('div');
//    let weatherDay = document.createElement('h5');
//    let weatherTemp = document.createElement('p');
//    let weatherImage = document.createElement('img');
//    console.log(data[])


//    let weatherTempData = data.day.avgtemp_c;
//    //Determiner on temperature unit
//    if (document.getElementById('farenheit').checked) {
//       weatherTempData = data.day.avgtemp_f;
//    };

//    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
//    //grab the data
//    let dayOfWeek = new Date(data.date);
//    let day = weekday[dayOfWeek.getDay()];
//    let weatherImageData = data.day.condition.icon;
//    let weatherImagetextData = data.day.condition.text;
//    weatherImage.alt = weatherImagetextData
   
   
//    //insert the data
//    weatherDay.innerHTML = day;
//    weatherTemp.innerHTML = weatherTempData;
//    weatherImage.src = weatherImageData;
   
//    //append to the children
//    initialDiv.className='individualWeatherContainer';
//    parentDiv.appendChild(initialDiv);
//    initialDiv.appendChild(weatherDay);
//    initialDiv.appendChild(weatherTemp);
//    initialDiv.appendChild(weatherImage);
//    initialDiv.addEventListener("click", displayAdditional)
// };


