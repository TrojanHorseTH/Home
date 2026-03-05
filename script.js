// ----- CLOCK -----
function updateTime() {
  const now = new Date();
  document.getElementById("time").textContent = now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
  document.getElementById("date").textContent = now.toLocaleDateString([], {weekday:'long', month:'long', day:'numeric'});
}
setInterval(updateTime, 1000);
updateTime();

// ----- MORNING ROUTINE -----
let defaultTasks = [
  "Brush teeth",
  "Get dressed",
  "Eat breakfast",
  "Pack bag",
  "Leave house"
];
let tasks = [...defaultTasks];
const routineListEl = document.getElementById("routine-list");

function renderRoutine() {
  routineListEl.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task;
    li.onclick = () => li.classList.toggle("done");
    routineListEl.appendChild(li);
  });
}

// Add Task
document.getElementById("add-task").onclick = () => {
  const input = document.getElementById("new-task");
  const taskText = input.value.trim();
  if(taskText){
    tasks.push(taskText);
    renderRoutine();
    input.value = "";
  }
}

// Reset Tasks
document.getElementById("reset-tasks").onclick = () => {
  tasks = [...defaultTasks];
  renderRoutine();
}

renderRoutine();

// ----- WEATHER (Open-Meteo Free API) -----
async function updateWeather() {
  if (!navigator.geolocation) {
    document.getElementById("weather").textContent = "Geolocation not supported";
    return;
  }

  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    try {
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
      const data = await res.json();
      const temp = data.current_weather.temperature;
      const wind = data.current_weather.windspeed;

      document.getElementById("weather").textContent = `${temp}°C Wind ${wind} km/h`;
    } catch {
      document.getElementById("weather").textContent = "Weather unavailable";
    }
  });
}

updateWeather();
setInterval(updateWeather, 10*60*1000);

// ----- LIGHT/DARK MODE -----
const themeSwitch = document.getElementById("theme-switch");
themeSwitch.addEventListener("change", () => {
  if(themeSwitch.checked){
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
  } else {
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");
  }
});
