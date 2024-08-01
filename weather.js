const body = document.body;
const searchBtn = document.getElementById("search");
const searchBar = document.getElementById("searchBar");

const today = new Date();

const hour = today.getHours();
console.log(hour);

if (hour >= 21 || hour <= 7) {
  body.style.backgroundImage = "url(weahter_assets/night.jpg)";
} else if (hour <= 10) {
  body.style.backgroundImage = "url(weahter_assets/morning.jpg)";
} else if (hour >= 19) {
  body.style.backgroundImage = "url(weahter_assets/evening.jpg)";
} else {
  body.style.backgroundImage = "url(weahter_assets/day.jpg)";
}

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();

  let city = searchBar.value;
  const xhttpr = new XMLHttpRequest();
  xhttpr.open(
    "GET",
    `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=Q7LXpiqKhEhvGC31HoCY86K3EIwAEaJL&q=${city}`
  );
  xhttpr.send();
  xhttpr.onload = () => {
    if (xhttpr.status === 200) {
      const response = JSON.parse(xhttpr.response);
    } else {
      switch (xhttpr.status) {
        case 400:
          window.alert("City not found!");
          break;
        case 401:
          window.alert("Out of api calls... Try again tomorrow!");
      }
    }
  };
});

function findLocation() {
  const succes = async (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const apiRequest = `https://api-bdc.net/data/reverse-geocode?latitude=${latitude}&longitude=${longitude}&key=bdc_bf4ab9e64d7842cbac6cbc0b73d73871`;
    let data;

    const res = await fetch(apiRequest);
    data = await res.json();
    console.log(data);
    document.getElementById(
      "city"
    ).innerText = `${data.city}, ${data.localityInfo.administrative[0].name}`;
    searchBar.value = data.city;
  };
  const error = async () => {
    const apiRequest = `https://api-bdc.net/data/ip-geolocation?key=bdc_bf4ab9e64d7842cbac6cbc0b73d73871`;
    const res = await fetch(apiRequest);
    data = await res.json();
    console.log(data);
    document.getElementById(
      "city"
    ).innerText = `${data.location.city}, ${data.location.localityInfo.administrative[0].name}`;
    searchBar.value = data.location.city;
  };
  navigator.geolocation.getCurrentPosition(succes, error);
}

findLocation();
// console.log(new Date(1684926000 * 1000));
