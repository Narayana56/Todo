document.addEventListener('DOMContentLoaded', ()=>{
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));

    if (storedTasks){
        storedTasks.forEach((task) => tasks.push(task));
        updateTasksList();
        updateStats();
    }
});

let tasks = [];

const saveTasks = () => {
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({text: text, completed: false});
        taskInput.value = "";
        updateTasksList();
        updateStats();
        saveTasks();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();
};

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = tasks[index].text;

    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();
};

const updateStats = () => {
    const completedTasks = tasks.filter(task=> task.completed).length;
    const totalTasks = tasks.length;
    const progress = (completedTasks/totalTasks)*100;
    const progressBar = document.getElementById('progress');
    progressBar.style.width = `${progress}%`;
    document.getElementById('numbers').innerText = `${completedTasks} / ${totalTasks}`;
    if(tasks.length && completedTasks == totalTasks) {
        blastConfetti();
    }
};

function updateTasksList() {
    const taskList = document.querySelector('.task-list');
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTaskComplete(${index})" />
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="edit.png" onClick="editTask(${index})" />
                <img src="bin.png" onClick="deleteTask(${index})" />
            </div>
        </div>
        `;
        taskList.append(listItem);
    });
}

document.getElementById('newTask').addEventListener('click',function(e){
    e.preventDefault();

    addTask();
});

const blastConfetti = () => {
    const duration = 5 * 1000,
    animationEnd = Date.now() + duration,
    defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
        return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    confetti(
        Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
    );
    confetti(
        Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
    );
    }, 250);
};