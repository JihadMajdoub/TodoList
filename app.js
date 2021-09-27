//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener('click', addTodo); // Adds to our todo list
todoList.addEventListener('click', deleteCheck); // Deletes or checks our list item
filterOption.addEventListener('click', filterTodo); // Filters out the list in sections



//Functions
function addTodo(event) {
    // Prevent form from submitting
    event.preventDefault();

    // Todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo); // This sticks the li inside the div, so that the div has an li inside it.

    // Add todo to local storage
    saveLocalTodos(todoInput.value);

    // Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton); // This sticks the button below the li inside the div element.
    
    // Check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton); // This sticks the button below the li inside the div element.
    
    // Append to list
    todoList.appendChild(todoDiv); // This appends the todoDiv inside the todoList, which is the ul element in the HTML with the class of 'todo-list'
    

    // Clear Todo Input Value
    todoInput.value = '';

}

function deleteCheck(e) {
    const item = e.target;

    // Delete todo item
    if(item.classList[0] === 'trash-btn'){
        // todoList.remove(); <--- This won't work because it removes every list item instead of that specific list item
        // Below is the solution to the above issue
        const todo = item.parentElement;

        // Animation for deleting the list item
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    // Check todo item
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;

            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;

            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    // Check if I already have this in there
    let todos;

    // First check if the todos item is in the local storage, and if 
    // it is null and doesn't exist, it will create an empty todos array
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        // If the todos item does exist, it will get the todos items from
        // the local storage and have an array
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    // The array will get pushed into a new todo and set back to the local storage.
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;

    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
        // Todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        // Create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo); // This sticks the li inside the div, so that the div has an li inside it.

        // Check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton); // This sticks the button below the li inside the div element.
        
        // Check trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton); // This sticks the button below the li inside the div element.
        
        // Append to list
        todoList.appendChild(todoDiv); // This appends the todoDiv inside the todoList, which is the ul element in the HTML with the class of 'todo-list'
        
    });
}

function removeLocalTodos(todo) {
    
    let todos;

    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
