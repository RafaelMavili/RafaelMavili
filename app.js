//selecao de DOM
const todoInput = document.querySelector('.todo-input');

const todoButton = document.querySelector('.todo-button');

const todoList = document.querySelector('.todo-list');

console.log(todoButton);

//evento de escutas
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteAndCheck);



//funcoes
//adicionar tarefa
function addTodo(event) {
    event.preventDefault()

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const todoLi = document.createElement('Li');
    todoLi.classList.add('todo-list');
    todoLi.innerText = todoInput.value;

    //limpar input depois de criar tarefa
    todoInput.value = '';

    todoDiv.appendChild(todoLi);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
}
//deletar e fazer checagem de tarefa

function deleteAndCheck(e) {
    console.log(e.target)
    const item = e.target;
    const todo = item.parentElement

    if (item.classList[0] === 'trash-btn') {
        todo.classList.add('fall');
        todo.addEventListener('transitionend', () => {
            todo.remove();
        })
    }
    //retorna as class q o objeto tem
    if (item.classList[0] === 'completed-btn') {
        todo.classList.toggle('completed')
    }
}