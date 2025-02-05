// Array que almacena los elementos
let items = [];

// Agrega un evento al formulario cuando se envía
// Evita que la página se recargue y llama a la función createItem

document.getElementById("crud-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Previene el recargo de la página
    const nameInput = document.getElementById("name");
    if (nameInput.value) {
        createItem(nameInput.value); // Llama a la función para crear un elemento
        nameInput.value = ""; // Limpia el campo después de agregar un elemento
    }
});

// Función para crear un nuevo elemento y añadirlo al array
function createItem(name) {
    const newItem = {
        id: Date.now(), // Asigna un ID único basado en la fecha actual
        name: name
    };
    items.push(newItem); // Agrega el nuevo elemento a la lista
    renderList(); // Actualiza la lista en pantalla
}

// Función para mostrar los elementos en la lista
function renderList() {
    const list = document.getElementById("item-list");
    list.innerHTML = ""; // Limpia la lista antes de renderizar
    items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.name; // Agrega el nombre del elemento
        
        // Botón para editar
        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.onclick = () => updateItem(item.id);
        
        // Botón para eliminar
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.onclick = () => deleteItem(item.id);
        
        // Añade botones al elemento de la lista
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        list.appendChild(li);
    });
}
// Función para actualizar un elemento por su ID
function updateItem(id) {
    const newName = prompt("Nuevo nombre:"); // Solicita un nuevo nombre
    if (newName) {
        items = items.map(item => 
            item.id === id ? { ...item, name: newName } : item
        ); // Actualiza el nombre en el array
        renderList(); // Vuelve a renderizar la lista
    }
}
// Función para eliminar un elemento de la lista por su ID
function deleteItem(id) {
    items = items.filter(item => item.id !== id); // Filtra el array y elimina el elemento
    renderList(); // Vuelve a renderizar la lista
}