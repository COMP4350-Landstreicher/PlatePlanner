document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/recipe/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
    
});

document.querySelector('table tbody').addEventListener('click', function(event) {
    if (event.target.className === "delete-row-btn") {
        deleteRowById(event.target.dataset.id);
    }
    if (event.target.className === "edit-row-btn") {
        handleEditRow(event.target.dataset.id);
    }
    if (event.target.className === "get-row-btn") {
        getRowById(event.target.dataset.id);
    }
});

const updateBtn = document.querySelector('#update-row-btn');
const searchBtn = document.querySelector('#search-btn');

searchBtn.onclick = function() {
    const searchValue = document.querySelector('#search-input').value;

    fetch('http://localhost:5000/recipe/search/' + searchValue)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}

function deleteRowById(id) {
    fetch('http://localhost:5000/recipe/delete/' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    });
}

function handleEditRow(id) {
    const updateSection = document.querySelector('#update-row');
    updateSection.hidden = false;
    document.querySelector('#update-recipe-input').dataset.id = id;
}

function getRowById(id) {
    console.log("Get is clicked!");
    fetch('http://localhost:5000/recipe/get/' + id)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}

updateBtn.onclick = function() {
    const updateNameInput = document.querySelector('#update-recipe-input');

    fetch('http://localhost:5000/recipe/update', {
        method: 'PATCH',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            id: updateNameInput.dataset.id,
            name: updateNameInput.value
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    })
}

const addBtn = document.querySelector('#add-recipe-btn');

addBtn.onclick = function () {
    const name = document.querySelector('#recipe_name').value;
    const description = document.querySelector('#description').value;
    const ingredients = document.querySelector('#ingredients').value;
    const instructions = document.querySelector('#instructions').value;

    //document.querySelector("#form-id").reset();
    //console.log(document.querySelector('#recipe-input'))

    fetch('http://localhost:5000/recipe/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ name : name, description: description, ingredients: ingredients, instructions: instructions})
    })
    .then(response => response.json())
    .then(data => insertRowIntoTable(data['data']));
}

function insertRowIntoTable(data) {
    const table = document.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');

    let tableHtml = "<tr>";

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === 'dateAdded') {
                data[key] = new Date(data[key]).toLocaleString();
            }
            tableHtml += `<td>${data[key]}</td>`;
        }
    }

    tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</td>`;
    tableHtml += `<td><button class="get-row-btn" data-id=${data.id}>Get</td>`;

    tableHtml += "</tr>";

    if (isTableData) {
        table.innerHTML = tableHtml;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }
}

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');
    //console.log(data);
    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='8'>No Data</td></tr>";
        return;
    }
    let tableHtml = "";
    data.forEach(function ({id, name, description, ingredients, instructions, last_updated}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${id}</td>`;
        tableHtml += `<td>${name}</td>`;
        tableHtml += `<td>${description}</td>`;
        tableHtml += `<td>${instructions}</td>`;
        tableHtml += `<td>${new Date(last_updated).toLocaleString()}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</td>`;
        
        // If this is not selecting a recipe
        if (ingredients == null) {
            tableHtml += `<td><button class="get-row-btn" data-id=${id}>Get</td>`;
        }
        else {
            tableHtml += `<td>${ingredients}</td>`;
        }
        
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}