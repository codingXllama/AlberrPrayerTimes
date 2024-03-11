// Get the HTML elements
const currentTimeID = document.getElementById("currentTime");
const currentDate_ID = document.getElementById("currentDate");
const tomorrowButton = document.getElementById("tomorrowButton");
const tomorrowPrayerTimes = document.getElementById("tomorrowPrayerTimes");
const todayPrayerTimes = document.getElementById("todayPrayerTimes");

// Add event listener to the button
tomorrowButton.addEventListener("click", getTomorrowPrayerTimes);

// Function to fetch and display tomorrow's prayer times
async function getTomorrowPrayerTimes() {
  try {
    // Calculate tomorrow's date
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var tomorrowDate = tomorrow.toLocaleDateString("en-US");

    // Fetch the prayer times for tomorrow
    const response = await fetch("Jsons/CompleteTimes24.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const allPrayers = await response.json();

    let out = "";
    for (let prayer of allPrayers) {
      if (prayer.Date === tomorrowDate) {
        out += `
          <p>Fajr</p>
          <p>Adhan: ${prayer.Fajr}</p>
          <p>Iqama: ${prayer.FajrIqama}</p>
          <p>Duhr</p>
          <p>Adhan: ${prayer.Dhuhr}</p>
          <p>Iqama: ${prayer.DhuhrIqama}</p>
          <p>Asr</p>
          <p>Adhan: ${prayer.Asr}</p>
          <p>Iqama: ${prayer.AsrIqama}</p>
          <p>Maghrib</p>
          <p>Adhan: ${prayer.Maghrib}</p>
          <p>Iqama: ${prayer.MaghribIqama}</p>
          <p>Isha</p>
          <p>Adhan: ${prayer.Isha}</p>
          <p>Iqama: ${prayer.IshaIqama}</p>
        `;
        break; // Stop looping once tomorrow's prayer times are found
      }
    }
    // Update HTML elements with tomorrow's prayer times
    tomorrowPrayerTimes.innerHTML = out;
  } catch (error) {
    console.error("Error fetching tomorrow's prayer times:", error);
  }
}

// Function to update the current time
function updateCurrentTime() {
  var now = new Date();
  var currentTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  var currentDate = now.toLocaleDateString("en-US");
  currentTimeID.textContent = currentTime.toUpperCase();
  currentDate_ID.textContent = currentDate;
}

// Update the current time every second
setInterval(updateCurrentTime, 1000);

// Function to fetch and display today's prayer times
async function getTodayPrayerTimes() {
  try {
    const response = await fetch("Jsons/CompleteTimes24.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const allPrayers = await response.json();

    const now = new Date();
    const todayDate = now.toLocaleDateString("en-US");

    let out = "";
    for (let prayer of allPrayers) {
      if (prayer.Date === todayDate) {
        out += `
          <p>Fajr</p>
          <p>Adhan: ${prayer.Fajr}</p>
          <p>Iqama: ${prayer.FajrIqama}</p>
          <p>Duhr</p>
          <p>Adhan: ${prayer.Dhuhr}</p>
          <p>Iqama: ${prayer.DhuhrIqama}</p>
          <p>Asr</p>
          <p>Adhan: ${prayer.Asr}</p>
          <p>Iqama: ${prayer.AsrIqama}</p>
          <p>Maghrib</p>
          <p>Adhan: ${prayer.Maghrib}</p>
          <p>Iqama: ${prayer.MaghribIqama}</p>
          <p>Isha</p>
          <p>Adhan: ${prayer.Isha}</p>
          <p>Iqama: ${prayer.IshaIqama}</p>
        `;
        break; // Stop looping once today's prayer times are found
      }
    }
    // Update HTML elements with today's prayer times
    todayPrayerTimes.innerHTML = out;
  } catch (error) {
    console.error("Error fetching today's prayer times:", error);
  }
}

// Call the function to fetch and display today's prayer times when the page loads
getTodayPrayerTimes();
updateCurrentTime(); // Update current time when the page loads
