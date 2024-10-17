// script.js

// Task Class
class Task {
    constructor(title, description, category, completed = false) {
      this.id = Date.now();
      this.title = title;
      this.description = description;
      this.category = category;
      this.completed = completed;
    }
  }
  
  // Main Application Logic
  const taskForm = document.getElementById('task-form');
  const taskList = document.getElementById('task-list');
  
  let tasks = [];
  
  // Load tasks from localStorage
  window.onload = function() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      tasks = JSON.parse(storedTasks);
      tasks.forEach(task => displayTask(task));
    }
  };
  
  // Save tasks to localStorage
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  // Add Task
  taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('task-title').value.trim();
    const description = document.getElementById('task-desc').value.trim();
    const category = document.getElementById('task-category').value;
    
    if (title && description && category) {
      const newTask = new Task(title, description, category);
      tasks.push(newTask);
      displayTask(newTask);
      saveTasks();
      taskForm.reset();
    }
  });
  
  // Display Task
  function displayTask(task) {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    if (task.completed) {
      taskDiv.classList.add('completed');
    }
    taskDiv.setAttribute('data-id', task.id);
    
    taskDiv.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <span class="category">Category: ${task.category}</span>
      <div class="actions">
        <button class="complete-btn">${task.completed ? 'Unmark' : 'Complete'}</button>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;
    
    taskList.appendChild(taskDiv);
  }
  
  // Task Actions
  taskList.addEventListener('click', function(e) {
    const target = e.target;
    const taskDiv = target.closest('.task');
    const taskId = Number(taskDiv.getAttribute('data-id'));
    const task = tasks.find(t => t.id === taskId);
    
    // Complete Task
    if (target.classList.contains('complete-btn')) {
      task.completed = !task.completed;
      taskDiv.classList.toggle('completed');
      target.textContent = task.completed ? 'Unmark' : 'Complete';
      saveTasks();
    }
    
    // Delete Task
    if (target.classList.contains('delete-btn')) {
      tasks = tasks.filter(t => t.id !== taskId);
      taskDiv.remove();
      saveTasks();
    }
    
    // Edit Task
    if (target.classList.contains('edit-btn')) {
      const newTitle = prompt('Enter new title:', task.title);
      const newDescription = prompt('Enter new description:', task.description);
      const newCategory = prompt('Enter new category:', task.category);
      
      if (newTitle && newDescription && newCategory) {
        task.title = newTitle;
        task.description = newDescription;
        task.category = newCategory;
        taskDiv.querySelector('h3').textContent = task.title;
        taskDiv.querySelector('p').textContent = task.description;
        taskDiv.querySelector('.category').textContent = `Category: ${task.category}`;
        saveTasks();
      }
    }
  });
  // Add Event Listener for Filters
const filters = document.getElementById('filters');

filters.addEventListener('click', function(e) {
  if (e.target.classList.contains('filter-btn')) {
    const category = e.target.getAttribute('data-category');
    filterTasks(category);
  }
});

function filterTasks(category) {
  const allTasks = document.querySelectorAll('.task');
  allTasks.forEach(task => {
    if (category === 'All' || task.querySelector('.category').textContent.includes(category)) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

  