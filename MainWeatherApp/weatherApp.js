const button = document.getElementById("submitButton");
button.addEventListener("click", submitWeather, false);

function submitWeather(event) {
   event.preventDefault()
   const apiUrl = "http://api.weatherapi.com/v1";
   const apiKey = "619ffafbbae84d6baea75929231009";
   const api = "http://api.weatherapi.com/v1/current.json?key=619ffafbbae84d6baea75929231009";
   let weatherRequest = document.getElementById("weatherInput");
   let submittedLocation = api + "&q=" + weatherRequest.value;
   checkWeather(submittedLocation)
};

function checkWeather(submittedLocation) {
   let request = new XMLHttpRequest();
   request.open("GET", submittedLocation);
   request.send();
   request.onload = () => {
      console.log(request);
      if (request.status === 200) {
         let data = JSON.parse(request.response);
         populateData(data);
      } else {
         console.log('error ${request.status} ${request.StatusText}');
      }
   }
};


function populateData(data) {
   console.log(data);
   document.getElementById("weatherName").innerHTML = data.location.name;
   document.getElementById("weatherTemp").innerHTML = data.current.temp_c + "℃";
   document.getElementById("weatherImage").src = data.current.condition.icon;
};
