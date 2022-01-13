'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active');

// abrir a modal depois do click
const closeModal = () => {
    clearFields();
    document.getElementById('modal').classList.remove('active');
}

// funcao q vai verificar antes se for null vai retornar um array vazio
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) || [];
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))

// CRUD--create, read, update and delete

const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push(client);
    setLocalStorage(dbClient);
}

const readClient = () => getLocalStorage();

const updateClient = (index, client) => {
    const dbClient = readClient();
    dbClient[index] = client;
    setLocalStorage(dbClient);
};

const deleteClient = (index) => {
    const dbClient = readClient();
    //excluir apenas um so
    dbClient.splice(index, 1);
    setLocalStorage(dbClient);
}

const isValidFields = () => {
    //o reportValidity() => retorna true se todos requisitos forem atendidos
    return document.getElementById('form').reportValidity();
}

//iteracao com o layout

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field');
    fields.forEach(field => field.value = '');
}

const saveClient = () => {
    if (isValidFields()) {
        //transformar em json
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        }
        const index = document.getElementById('nome').dataset.index;
        if (index == 'new') {
            createClient(client);
            updateTable();
            closeModal();
        } else {
            updateClient(index, client);
            updateTable();
            closeModal();
        }
    }
}

const createRow = (client, index) => {
    //cria tr (nova linha) vazia
    const newRow = document.createElement('tr');
    //preencher com td
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}">Excluir</button>
        </td>
    `
        //inserir no tbody
    document.querySelector('#tableClient>tbody').appendChild(newRow);
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr');
    rows.forEach(row => row.parentNode.removeChild(row));
}

const updateTable = () => {
    const dbClient = readClient();
    clearTable();
    dbClient.forEach(createRow);
}

const fillFields = (client) => {
    document.getElementById('nome').value = client.nome;
    document.getElementById('email').value = client.email;
    document.getElementById('celular').value = client.celular;
    document.getElementById('cidade').value = client.cidade;
    document.getElementById('nome').dataset.index = client.index;
}

const editClient = (index) => {
    const client = readClient()[index];
    client.index = index;
    fillFields(client);
    openModal();
}

const editDelete = (event) => {
    //type, para pegar apenas nos botoes
    if (event.target.type == 'button') {
        const [action, index] = event.target.id.split('-');
        if (action == 'edit') {
            editClient(index)
        } else {
            //pegar o nome do cliente
            const client = readClient()[index];
            const response = confirm(`Deseja realmente excluir o cliente:  ${client.nome}?`);
            if (response) {
                deleteClient(index);
                updateTable();
            }
        }
    }
}

updateTable();

// eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal);

document.getElementById('modalClose')
    .addEventListener('click', closeModal);

document.getElementById('salvar')
    .addEventListener('click', saveClient);

document.querySelector('#tableClient>tbody').addEventListener('click', editDelete);