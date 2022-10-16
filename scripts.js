"use strict"
let todoList = []; //declares a new array for Your todo list
$.ajax({
    // copy Your bin identifier here. It can be obtained in the dashboard
    url: 'https://api.jsonbin.io/v3/b/6349050d0e6a79321e27f4b4',
    type: 'GET',
    headers: { //Required only if you are trying to access a private bin
      'X-Master-Key': '$2b$10$xZMoZi3kWCOmCiX0gYjnH.EBDMMivLdb8fuUL3jS.69BVjYkLFvHO'
    },
    success: (data) => {
    let savedList = window.localStorage.getItem("todos");
    if (savedList != null)
        todoList = JSON.parse(savedList);
    else
      todoList = data;
    },
    error: (err) => {
      console.log(err.responseJSON);
    }
});

let updateJSONbin = function() {
$.ajax({
    // wchodzisz na jsonbin.io, tworzysz nowy bin, kopiujesz jego id
  url: 'https://api.jsonbin.io/v3/b/6349050d0e6a79321e27f4b4',
  type: 'PUT',
  headers: { //Required only if you are trying to access a private bin
    //wklejasz swoj x-master-key
    'X-Master-Key': '$2b$10$xZMoZi3kWCOmCiX0gYjnH.EBDMMivLdb8fuUL3jS.69BVjYkLFvHO',
    'contentType': 'application/json'
},
  contentType: 'application/json',
  data: JSON.stringify(todoList),
  success: (data) => {
    todoList = data.record;
  },
  error: (err) => {
    console.log(err.responseJSON);
  }
})
};

let updateTodoList = function() {
    let todoListDiv =
    document.getElementById("todoListView");

    //remove all elements
    while (todoListDiv.firstChild) {
    todoListDiv.removeChild(todoListDiv.firstChild);
    }

    let headings = document.createElement("tr");
	let name = document.createElement("th");
	let nameContent = document.createTextNode("Name");
	name.appendChild(nameContent);
	headings.appendChild(name);

    let description = document.createElement("th");
	let descriptionContent = document.createTextNode("Description");
    description.appendChild(descriptionContent);
    headings.appendChild(description);

    let place = document.createElement("th");
	let placeContent = document.createTextNode("Place");
    place.appendChild(placeContent);
    headings.appendChild(place);

    let dueDate = document.createElement("th");
	let dueDateContent = document.createTextNode("DueDate");
    dueDate.appendChild(dueDateContent);
	headings.appendChild(dueDate);

    let deleteCol = document.createElement("th");
	let deleteColContent = document.createTextNode("Delete");
    deleteCol.appendChild(deleteColContent);
	headings.appendChild(deleteCol);

    todoListDiv.appendChild(headings);

    //add all elements
    let filterInput = document.getElementById("inputSearch"); 
    console.log(todoList);
    for (let todo in todoList) {
        if (
            (filterInput.value == "") ||
            (todoList[todo].title.includes(filterInput.value)) ||
            (todoList[todo].description.includes(filterInput.value)))
        {
        let newElement = document.createElement("tr");
		let name = document.createElement("td");
		let nameContent = document.createTextNode(todoList[todo].title);
		name.appendChild(nameContent);
		newElement.appendChild(name);

        let description = document.createElement("td");
		let descriptionContent = document.createTextNode(todoList[todo].description);
        description.appendChild(descriptionContent);
		newElement.appendChild(description);

        let place = document.createElement("td");
		let placeContent = document.createTextNode(todoList[todo].place);
        place.appendChild(placeContent);
		newElement.appendChild(place);

        let dueDate = document.createElement("td");
		let dueDateContent = document.createTextNode(todoList[todo].dueDate);
        dueDate.appendChild(dueDateContent);
		newElement.appendChild(dueDate);


        let newDeleteButton = document.createElement("input");
        newDeleteButton.type = "button";
        newDeleteButton.value = "x";
        newDeleteButton.addEventListener("click",
            function() {
                deleteTodo(todo);
            });

        let deleteButton = document.createElement("td");
        deleteButton.appendChild(newDeleteButton);
        newElement.appendChild(deleteButton);

        todoListDiv.appendChild(newElement);
          }
    }
}

//updateTodoList();
setInterval(updateTodoList, 1000);

let deleteTodo = function(index) {
    todoList.splice(index,1);
    updateJSONbin();
}

let addTodo = function() {
  //get the elements in the form
    let inputTitle = document.getElementById("inputTitle");
    let inputDescription = document.getElementById("inputDescription");
    let inputPlace = document.getElementById("inputPlace");
    let inputDate = document.getElementById("inputDate");
  //get the values from the form
    let newTitle = inputTitle.value;
    let newDescription = inputDescription.value;
    let newPlace = inputPlace.value;
    let newDate = new Date(inputDate.value);
  //create new item
    let newTodo = {
        title: newTitle,
        description: newDescription,
        place: newPlace,
        dueDate: newDate
    };
  //add item to the list
    todoList.push(newTodo);
	updateJSONbin();
	window.localStorage.setItem("todos", JSON.stringify(todoList));
}

let newDeleteButton = document.createElement("input");
        newDeleteButton.type = "button";
        newDeleteButton.value = "x";
        newDeleteButton.addEventListener("click",
            function() {
                deleteTodo(todo);
            });