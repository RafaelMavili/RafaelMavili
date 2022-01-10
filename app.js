//selecao de DOM
const todoInput = document.querySelector('.todo-input');

const todoButton = document.querySelector('.todo-button');

const todoList = document.querySelector('.todo-list');

console.log(todoInput);

//evento de escutas

todoButton.addEventListener('click', addTodo)


//funcoes
function addTodo(event) {
    event.preventDefault()

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const todoLi = document.createElement('Li');
    todoLi.classList.add('todo-list');
    todoLi.innerText = 'Rafael Mavili';

    todoDiv.appendChild(todoLi);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('completed-btn');
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
}