const currentTimeID = document.getElementById("currentTime");
const currentDate_ID = document.getElementById("currentDate");

const fajrAdhan_label = document.getElementById("fair-prayer");
const fajrAdhan_timing = document.getElementById("fajr-adhan");
const fajrIqama_timing = document.getElementById("fajr-iqama");
const sunrise_timing = document.getElementById("sunrise-time");

const duhrAdhan_timing = document.getElementById("duhr-adhan");
const duhrIqama_timing = document.getElementById("duhr-iqama");
const duhrPrayer_label = document.getElementById("duhr-prayer");

const ishaBox = document.getElementsByClassName("ishaBox");

const asrPrayer_label = document.getElementById("asr-prayer");
const asrAdhan_timing = document.getElementById("asr-adhan");
const asrIqama_timing = document.getElementById("asr-iqama");

const maghribPrayer_label = document.getElementById("maghrib-prayer");
const maghribAdhan_timing = document.getElementById("maghrib-adhan");
const maghribIqama_timing = document.getElementById("maghrib-iqama");

const ishaPrayer_label = document.getElementById("isha-prayer");
const ishaAdhan_timing = document.getElementById("isha-adhan");
const ishaIqama_timing = document.getElementById("isha-iqama");

const timeUntilNextPrayer_Label = document.getElementById("nextTime");
// const ishaIqama_timings
// var currentTime = new Date().toLocaleTimeString();
// var currentDate = new Date().toLocaleDateString("en-US");
// currentDate_ID.textContent = currentDate.slice(0, 10);

// prayer List

let apiPrayer = [];

var currentTime = new Date().toLocaleTimeString();
timeSignature = currentTime.slice(-4).split(".").join("");

function doDate() {
  var str = "";
  var days = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");

  var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

  var now = new Date();

  str += "Today is: " + days[now.getDay()] + ", " + now.getDate() + " " + months[now.getMonth()] + "" + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
  currentTime = new Date().toLocaleTimeString();
  timeSignature = currentTime.slice(-4).split(".").join("");
  console.log(timeSignature);
  // console.log(typeof timeSignature)
  // if (timeSignature.toLowerCase() === "pm")
  // {
  //   // alert('s');
  // }
  // completeTimeSignature = timeSignature.replace('.', '');
  // console.log(completeTimeSignature);

  //Date
  document.getElementById("currentTime").innerHTML = currentTime.toUpperCase();
  var currentDate = new Date().toLocaleDateString("en-US");
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

          //Current timings
          var date = new Date();
          var current24Hours = date.getHours();
          var currentMinutes = date.getMinutes();

          if (timeSignature.toLowerCase() === "pm") {
            console.log("The current Hour is: ", current24Hours);
            console.log("The current minutes is:", currentMinutes);

            //Duhr Indicator - InComplete
            var duhrAdthanMinutes = parseInt(prayer.Dhuhr.slice(-2));
            var duhrAdthanHours;
            var Temp_duhrAdthanHours = parseInt(prayer.Dhuhr);
            // duhr adthan can be at 12pm or 1pm.
            if (Temp_duhrAdthanHours === 12) {
              duhrAdthanHours = Temp_duhrAdthanHours;
            } else if (Temp_duhrAdthanHours > 12) {
              duhrAdthanHours = Temp_duhrAdthanHours + 12;
            }
            var duhrIqama_hours = parseInt(prayer.DhuhrIqama) + 12;
            var duhrIqama_minutes = parseInt(prayer.DhuhrIqama.slice(-2));

            // console.log("Duhr Adthan Mins: ", duhrAdthanMinutes);
            // console.log("Duhr Adthan Hrs: ", duhrAdthanHours);

            // console.log("Duhr Iqama Hrs: ", duhrIqama_hours);
            // console.log("Duhr Iqama Mins: ", duhrIqama_minutes);

            if (current24Hours >= duhrAdthanHours && current24Hours <= duhrIqama_hours) {
              if (currentMinutes === duhrAdthanMinutes) {
                duhrAdhan_timing.classList.add("indicator");
                duhrPrayer_label.classList.add("indicator");
              }

              // if currentMinutes - 2 < asrIqama_minutes then display 2 minute countDown timer

              if (currentMinutes === duhrIqama_minutes) {
                duhrPrayer_label.classList.add("indicator");
                duhrAdhan_timing.classList.add("indicator");
                duhrIqama_timing.style.backgroundColor = "rgb(218, 150, 150)";
              }
            }

            // Asr Indicator - Completed

            // Next Steps: CREATE 1 MINUTE COUNTDOWN TIMER BEFORE IQAMA

            var asrAdthanHours = parseInt(prayer.Asr) + 12;
            var asrAdthanMinutes = parseInt(prayer.Asr.slice(-2));
            var asrIqama_hours = parseInt(prayer.AsrIqama) + 12;
            var asrIqama_minutes = parseInt(prayer.AsrIqama.slice(-2));

            if (current24Hours >= asrAdthanHours && current24Hours <= asrIqama_hours) {
              if (currentMinutes === asrAdthanMinutes) {
                asrAdhan_timing.classList.add("indicator");
                asrPrayer_label.classList.add("indicator");
              }

              // if currentMinutes - 2 < asrIqama_minutes then display 2 minute countDown timer

              if (currentMinutes === asrIqama_minutes) {
                asrAdhan_timing.classList.add("indicator");
                asrPrayer_label.classList.add("indicator");
                asrIqama_timing.style.backgroundColor = "rgb(218, 150, 150)";
              }
            }

            //Maghrib Indicator - Inprogress

            var maghribAdthanHours = parseInt(prayer.Maghrib) + 12;
            var maghribAdthanMinutes = parseInt(prayer.Maghrib.slice(-2));
            var maghribIqama_hours = parseInt(prayer.MaghribIqama) + 12;
            var maghribIqama_minutes = parseInt(prayer.MaghribIqama.slice(-2));

            // console.log("Current Maghrib Adthan Hours: ", maghribAdthanHours);
            // console.log(
            //   "Current Maghrib Adthan Minutes: ",
            //   maghribAdthanMinutes
            // );
            // console.log("Current Maghrib Iqama Hours: ", maghribIqama_hours);
            // console.log("Current Maghrib Iqama Mins: ", maghribIqama_minutes);

            //changing the background when it's Maghrib time
            if (current24Hours >= asrIqama_hours && current24Hours < maghribAdthanHours) {
              document.body.style.backgroundImage = "url('bgAsr.jpg')";
            } else if (current24Hours >= maghribAdthanHours) {
              document.body.style.backgroundImage = "url('bgNight.jpg')";
              currentTimeID.style.color = "#eee";
              currentDate_ID.style.color = "#eee";
            }

            if (current24Hours >= maghribAdthanHours && current24Hours <= maghribIqama_hours) {
              if (currentMinutes === maghribAdthanMinutes) {
                maghribAdhan_timing.classList.add("indicator");
                maghribPrayer_label.classList.add("indicator");
              }
              // do a count down time check - 1 minute before Iqama

              if (currentMinutes === maghribIqama_minutes) {
                maghribIqama_timing.style.backgroundColor = "rgb(218, 150, 150)";
                maghribAdhan_timing.classList.add("indicator");
                maghribPrayer_label.classList.add("indicator");
              }
            }

            // Isha Prayer Hours
            var ishaAdthanHours = parseInt(prayer.Isha) + 12;
            var ishaIqamaHours = parseInt(prayer.IshaIqama) + 12;

            //Isha prayer Minutes
            var ishaAdthanMinutes = parseInt(prayer.Isha.slice(-2));
            var ishaIqamaMinutes = parseInt(prayer.IshaIqama.slice(-2));

            if (current24Hours >= ishaAdthanHours && current24Hours <= ishaIqamaHours) {
              // Finding rTime

              // var startTime = moment(moment.getHours(),"HH:mm:ss a");
              // console.log(startTime);

              if (currentMinutes === ishaAdthanMinutes) {
                ishaAdhan_timing.classList.add("indicator");
                ishaPrayer_label.classList.add("indicator");
              }
              // do a count down time check - 1 minute before Iqama

              if (currentMinutes === ishaIqamaMinutes) {
                ishaAdhan_timing.classList.add("indicator");
                ishaPrayer_label.classList.add("indicator");

                ishaIqama_timing.style.backgroundColor = "rgb(218, 150, 150)";
              }
            }
          }

          // out += `
          //   <p> Fajr </p>
          //   <p> Adhan: ${prayer.Fajr}</p>
          //   <p> Iqama: ${prayer.FajrIqama}</p>
          //   <p> Duhr </p>
          //   <p> Adhan: ${prayer.Dhuhr}</p>
          //   <p> Iqama: ${prayer.DhuhrIqama}</p>
          //   <p> Asr </p>
          //   <p> Adhan: ${prayer.Asr}</p>
          //   <p> Iqama: ${prayer.AsrIqama}</p>
          //   <p> Maghrib </p>
          //   <p> Adhan: ${prayer.Maghrib}</p>
          //   <p> Iqama: ${prayer.MaghribIqama}</p>
          //    <p> Isha </p>
          //   <p> Adhan: ${prayer.Isha}</p>
          //   <p> Iqama: ${prayer.IshaIqama}</p>

          // `;
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
      // console.log("hi");
    });
}
getPrayer2();

async function CountDownTimer() {
  console.log("x");
  var date1 = new Date();
  var date2 = new Date();

  var diff = date2.getTime() - date1.getTime();

  var msec = diff;
  var hh = `0${Math.floor(msec / 1000 / 60 / 60)}`;
  msec -= hh * 1000 * 60 * 60;

  var mm = `0${Math.floor(msec / 1000 / 60)}`;
  msec -= mm * 1000 * 60;

  var ss = `0${Math.floor(msec / 1000)}`;
  msec -= ss * 1000;

  console.log("y");
  return hh.slice(-2) + ":" + mm.slice(-2) + ":" + ss.slice(-2);
}

CountDownTimer();
setInterval(getPrayer2, 1000);
