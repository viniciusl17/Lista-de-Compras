const itemInput = document.getElementById('item-input');
const addButton = document.getElementById('add-button');
const itemList = document.getElementById('item-list');

// Carrega os itens salvos do localStorage ao carregar a página
document.addEventListener('DOMContentLoaded', loadItems);

addButton.addEventListener('click', () => {
    const itemName = itemInput.value.trim();

    if (itemName !== "") {
        addItem(itemName);
        itemInput.value = "";
        saveItems(); // Salva após adicionar um item
    }
});

function addItem(itemName) {
    const item = document.createElement('li');
    item.classList.add('item');
    item.innerHTML = `
        <span>${itemName}</span>
        <button class="edit-button">✏️</button>
        <button class="delete-button">️🗑️</button>
        <button class="complete-button">✅</button> 
    `;

    const editButton = item.querySelector('.edit-button');
    const deleteButton = item.querySelector('.delete-button');
    const completeButton = item.querySelector('.complete-button'); 

    editButton.addEventListener('click', () => editItem(item));
    deleteButton.addEventListener('click', () => deleteItem(item));
    completeButton.addEventListener('click', () => completeItem(item)); 

    itemList.appendChild(item);
}

function deleteItem(item) {
    if (confirm("Tem certeza que deseja deletar este item?")) { // Confirmação
        itemList.removeChild(item);
        saveItems(); // Salva após deletar um item
    }
}

function completeItem(item) {
    item.classList.toggle("completed");
    saveItems(); // Salva após completar um item
}

function editItem(item) {
    const itemNameSpan = item.querySelector('span');
    const currentName = itemNameSpan.textContent;
    const newName = prompt("Editar item:", currentName);

    if (newName !== null) {
        if (newName.trim() !== "") {
            itemNameSpan.textContent = newName.trim();
            alert("Item editado com sucesso!");
            saveItems();// Salva após editar um item
        } else {
            alert("O nome do item não pode estar vazio.");
        }
    }
}

function saveItems() {
    const items = [];
    const itemElements = itemList.querySelectorAll('.item');
    itemElements.forEach(item => {
        items.push({
            name: item.querySelector('span').textContent,
            completed: item.classList.contains('completed')
        });
    });
    localStorage.setItem('items', JSON.stringify(items));
}

function loadItems() {
    const savedItems = localStorage.getItem('items');
    if (savedItems) {
        const items = JSON.parse(savedItems);
        items.forEach(itemData => {
            addItem(itemData.name);
            const newItem = itemList.lastElementChild; // Pega o último item adicionado
            if (itemData.completed) {
                newItem.classList.add('completed');
            }
        });
    }
}