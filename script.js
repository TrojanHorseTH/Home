// ----- CLOCK -----
function updateTime() {
  const now = new Date();
  document.getElementById("time").textContent = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
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
  tasks.forEach((task, index) => {
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

// ----- WEATHER (OpenWeatherMap API example) -----
const apiKey = "YOUR_OPENWEATHER_API_KEY"; // Get free API key from openweathermap.org
const city = "London";

async function updateWeather(){
  try{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    const data = await response.json();
    document.getElementById("weather").textContent = `${data.main.temp}°C ${data.weather[0].description}`;
  }catch(e){
    document.getElementById("weather").textContent = "Weather unavailable";
  }
}

updateWeather();
setInterval(updateWeather, 10*60*1000); // Update every 10 minutes
