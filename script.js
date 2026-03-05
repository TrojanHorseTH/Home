// ----- CLOCK -----
function updateTime() {
  const now = new Date();
  const timeEl = document.getElementById("time");
  const dateEl = document.getElementById("date");

  timeEl.textContent = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  dateEl.textContent = now.toLocaleDateString([], {weekday: 'long', month:'long', day:'numeric'});
}

setInterval(updateTime, 1000);
updateTime(); // initial call

// ----- MORNING ROUTINE -----
let routineTasks = [
  "Brush teeth",
  "Get dressed",
  "Eat breakfast",
  "Pack bag",
  "Leave house"
];

const routineListEl = document.getElementById("routine-list");

function renderRoutine() {
  routineListEl.innerHTML = "";
  routineTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;
    li.onclick = () => li.classList.toggle("done");
    routineListEl.appendChild(li);
  });
}

// Reset routine
document.getElementById("reset-tasks").onclick = renderRoutine;

renderRoutine();
