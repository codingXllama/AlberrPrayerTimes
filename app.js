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
  var days = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");

  var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

  var now = new Date();

  str += "Today is: " + days[now.getDay()] + ", " + now.getDate() + " " + months[now.getMonth()] + "" + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

  var currentTime = new Date().toLocaleTimeString();
  // var currentMinutes = now.getMinutes();

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
      var now = new Date();
      var currentMinutes = now.getMinutes();
      var current12_hourTime = parseInt(now.toLocaleDateString("en-us", { hour: "numeric", hour12: true }).slice(-5));
      var currentTimeSignature = now.toLocaleDateString("en-us", { hour: "numeric", hour12: true }).slice(-2);

      // creating the unique ID for the JSON
      const monthNumber = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      var todaysMonthDay = now.getDate();
      var todaysDate = currentYear + "-" + monthNumber + "-" + todaysMonthDay;

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

      // Get the 12 time

      // var current12_hour = current12_time.toLocaleDateString("en-us", { hour: "numeric", hour12: true });
      console.log("current12 hr is", current12_hourTime);
      console.log("current12 min is", currentMinutes);
      // assigning the wallpaper for the time

      if (currentTimeSignature.toLowerCase() === "am") {
      } else {
        // getting all afternoon prayer times

        var duhrAdthanMinutes = parseInt(duhrAdhan.slice(-2));
        var duhrAdthanHours = parseInt(duhrAdhan);
        var duhrIqama_hours = parseInt(duhrIqama);
        var duhrIqama_minutes = parseInt(duhrIqama.slice(-2));

        var asrAdthanHours = parseInt(asrAdhan);
        var asrAdthanMinutes = parseInt(asrAdhan.slice(-2));
        var asrIqama_hours = parseInt(asrIqama);
        var asrIqama_minutes = parseInt(asrIqama.slice(-2));

        var maghribAdthanHours = parseInt(maghribAdhan);
        var maghribAdthanMinutes = parseInt(maghribAdhan.slice(-2));
        var maghribIqama_hours = parseInt(maghribIqama);
        var maghribIqama_minutes = parseInt(maghribIqama.slice(-2));

        var ishaAdthanHours = parseInt(ishaAdhan);
        var ishaIqamaHours = parseInt(ishaIqama);
        var ishaAdthanMinutes = parseInt(ishaAdhan.slice(-2));
        var ishaIqamaMinutes = parseInt(ishaIqama.slice(-2));

        // ****************************************** TESTS *****************************************

        // console.log("duhr Adthan hrs", duhrAdthanHours);
        // console.log("duhr Adthan Mins", duhrAdthanMinutes);
        // console.log("duhr Iqama Hours", duhrIqama_hours);
        // console.log("duhr Iqama mins", duhrIqama_minutes);

        // console.log("Asr Adthan Hrs", asrAdthanHours);
        // console.log("Asr Adthan Mins", asrAdthanMinutes);
        // console.log("Asr Iqama Hrs", asrIqama_hours);
        // console.log("Asr Iqama Mins", asrIqama_minutes);

        // console.log("Maghrib Adthan Hrs: ", maghribAdthanHours);
        // console.log("Maghrib Adthan Mins: ", maghribAdthanMinutes);
        // console.log("Maghrib Iqama Hrs: ", maghribIqama_hours);
        // console.log("Maghrib Iqama Mins: ", maghribIqama_minutes);

        // console.log("Isha Adthan Hrs", ishaAdthanHours);
        // console.log("Isha Adthan Mins", ishaAdthanMinutes);
        // console.log("Isha Iqama Hrs", ishaIqamaHours);
        // console.log("Isha Iqama Mins", ishaIqamaMinutes);

        // ************************************ END OF TESTS *****************************************
      }
    });
}

getPrayer2();
