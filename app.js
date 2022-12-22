const currentTimeID = document.getElementById("currentTime");
const currentDate_ID = document.getElementById("currentDate");
const fajrAdhan_label = document.getElementById("fair-prayer");
const fajrAdhan_timing = document.getElementById("fajr-adhan");
const fajrIqama_timing = document.getElementById("fajr-iqama");
const sunrise_timing = document.getElementById("sunrise-time");
const duhrAdhan_timing = document.getElementById("duhr-adhan");
const duhrIqama_timing = document.getElementById("duhr-iqama");
const ishaBox = document.getElementById("ishaBox");

const asrAdhan_timing = document.getElementById("asr-adhan");
const asrIqama_timing = document.getElementById("asr-iqama");

const maghribAdhan_timing = document.getElementById("maghrib-adhan");
const maghribIqama_timing = document.getElementById("maghrib-iqama");

const ishaAdhan_timing = document.getElementById("isha-adhan");
const ishaIqama_timing = document.getElementById("isha-iqama");

// const ishaIqama_timings
// var currentTime = new Date().toLocaleTimeString();
var currentDate = new Date().toLocaleDateString("en-US");
// currentDate_ID.textContent = currentDate.slice(0, 10);


// prayer List

let apiPrayer = [];

function doDate() {
  var str = "";
  var days = new Array(
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  );

  var months = new Array(
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  );

  var now = new Date();

  str +=
    "Today is: " +
    days[now.getDay()] +
    ", " +
    now.getDate() +
    " " +
    months[now.getMonth()] +
    "" +
    now.getFullYear() +
    " " +
    now.getHours() +
    ":" +
    now.getMinutes() +
    ":" +
    now.getSeconds();

  var currentTime = new Date().toLocaleTimeString();

  document.getElementById("currentTime").innerHTML = currentTime.toUpperCase();
  currentDate_ID.textContent = currentDate.slice(0, 10);

}
// updating the time every second
setInterval(doDate, 100);



async function getPrayer2() {
  fetch("PrayerTimes22.json")
    .then(function (response) {
      return response.json();
    })

    // to access the data

    .then(function (allPrayers) {
      // console.log("hi");
      var now = new Date();
      const monthNumber = new Date().getMonth() + 1;
      // console.log(monthNumber);
      const currentYear = new Date().getFullYear();
      var todaysMonthDay = now.getDate();
      // var todaysDate = currentYear + "-" + monthNumber + "-0" + todaysMonthDay;
      var todaysDate = currentYear + "-" + monthNumber + "-" + todaysMonthDay;

      // console.log(todaysDate);

      // let placeholder = document.querySelector(".container");
      let out = "";

      for (let prayer of allPrayers) {
        // console.log(todaysDate);
        if (prayer.Date == todaysDate) {
          var sunriseTime = prayer.Sunrise;
          // console.log(sunriseTime);
          var fajrAdhan = prayer.Fajr;
          var fajrIqama = prayer.FajrIqama;

          // Duhr timing
          var duhrAdhan = prayer.Dhuhr;
          var duhrIqama = prayer.DhuhrIqama;
          //Asr  timing
          var asrAdhan = prayer.Asr;
          var asrIqama = prayer.AsrIqama;

          // Maghrib timing
          var maghribAdhan = prayer.Maghrib;
          var maghribIqama = prayer.MaghribIqama;

          //Isha
          var ishaAdhan = prayer.Isha;
          var ishaIqama = prayer.IshaIqama;

          // if (currentTime > ishaAdhan) {
          //   // ishaBox.style.backgroundColor = "#ff8396";
          //   console.log("current time type:" + typeof currentTime);
          //   console.log("type of isha adhan: " + typeof ishaAdhan);
          // } else {
          //   ishaBox.style.backgroundColor = "";
          // }

          out += `
            <p> Fajr </p>
            <p> Adhan: ${prayer.Fajr}</p>
            <p> Iqama: ${prayer.FajrIqama}</p>
            <p> Duhr </p>
            <p> Adhan: ${prayer.Dhuhr}</p>
            <p> Iqama: ${prayer.DhuhrIqama}</p>
            <p> Asr </p>
            <p> Adhan: ${prayer.Asr}</p>
            <p> Iqama: ${prayer.AsrIqama}</p>
            <p> Maghrib </p>
            <p> Adhan: ${prayer.Maghrib}</p>
            <p> Iqama: ${prayer.MaghribIqama}</p>
             <p> Isha </p>
            <p> Adhan: ${prayer.Isha}</p>
            <p> Iqama: ${prayer.IshaIqama}</p>

          `;
        }
        // placeholder.innerHTML = out;
      }
      // console.log(out);

      fajrIqama_timing.innerHTML = fajrIqama;
      fajrAdhan_timing.innerHTML = fajrAdhan;

      duhrAdhan_timing.innerHTML = duhrAdhan;
      duhrIqama_timing.innerHTML = duhrIqama;

      asrAdhan_timing.innerHTML = asrAdhan;
      asrIqama_timing.innerHTML = asrIqama;

      maghribAdhan_timing.innerHTML = maghribAdhan;
      maghribIqama_timing.innerHTML = maghribIqama;

      ishaAdhan_timing.innerHTML = ishaAdhan;
      ishaIqama_timing.innerHTML = ishaIqama;

      sunrise_timing.innerHTML = sunriseTime;
      // console.log(out.indexOf(1));
    });
}

getPrayer2();
