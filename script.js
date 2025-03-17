<script>
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// ローカルストレージからタスクを取得
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// タスクを表示する関数
function displayTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add('task-item');
        if (task.completed) {
            li.classList.add('completed');
        }

        li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <button class="complete-btn" data-index="${index}">完了</button>
            <button class="delete-btn" data-index="${index}">削除</button>
        `;
        taskList.appendChild(li);
    });
}

// タスクを追加する関数
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        displayTasks();
    }
}

// タスクを削除する関数
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

// タスクを完了/未完了にする関数
function completeTask(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

// イベントリスナー
addTaskButton.addEventListener('click', addTask);

taskList.addEventListener('click', (event) => {
    const target = event.target;
    const index = target.dataset.index;
    if (target.classList.contains('delete-btn')) {
        deleteTask(index);
    } else if (target.classList.contains('complete-btn')) {
        completeTask(index);
    }
});

taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// 初期表示
displayTasks();
</script>