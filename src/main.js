const refs ={
    input: document.querySelector(".input-js"),
    button: document.querySelector(".btn-add"),
    list: document.querySelector(".todo-list")
}
export const buttonUpdate =
  '<button type="button" class="btn-update" ></button>';
export const buttonDelete =
  '<button type="button" class="btn-delete" >del</button>';

function createObject(){
    return {
        id:Date.now(),status:'todo',text: refs.input.value.trim(),
    };
}
function updateLocalStorage(todo){
    const task = JSON.parse(localStorage.getItem("task")) || [];
    task.push(todo)
    localStorage.setItem("task", JSON.stringify(task));
}
function createMarkup(todo){
const curentButton = todo.status === "todo" ? buttonUpdate: buttonDelete;
return `<li id="${todo.id}" class="${todo.status}"
><p>${todo.text}</p>${curentButton}</li>`
}
function addTodo(){
    const newTodo = createObject();
    const markup = createMarkup(newTodo);
    refs.list.insertAdjacentHTML("beforeend", markup);
    updateLocalStorage(newTodo);
    refs.input.value = "";
}
refs.button.addEventListener('click', addTodo );
const storageData = JSON.parse(localStorage.getItem("task"));
function reloadPage(){
    const markup = storageData.map(createMarkup).join("");
    refs.list.innerHTML = markup;
}
if(storageData !== null){
    reloadPage()
}
function togolStatus(event){
    if(event.target.nodeName !== "LI" ){
        return;
    }

    if(event.target.classList.contains("todo")){
event.target.classList.replace("todo","complete");
event.target.lastElementChild.remove();
event.target.insertAdjacentHTML("beforeend", buttonDelete);
}else {
    event.target.classList.replace("complete","todo");
    event.target.lastElementChild.remove();
event.target.insertAdjacentHTML("beforeend", buttonUpdate);
}
updateStatusStorage(event.target);
}
refs.list.addEventListener('click',togolStatus);
function updateStatusStorage(el){
  const data = JSON.parse(localStorage.getItem("task"));
  const upData = data.map(todo => {
    if(todo.id === +el.id ){
        todo.status = el.classList[0];
    }
    return todo;
  });
  localStorage.setItem("task", JSON.stringify(upData)); 
}
function removeTodo(event){
   if(!event.target.classList.contains("btn-delete")){
        return;
    }
    event.target.parentNode.remove();
    removeLocalStorage(event.target.parentNode)
}
refs.list.addEventListener('click', removeTodo);
function removeLocalStorage(el){
    const data = JSON.parse(localStorage.getItem("task"));
    const filteredData = data.filter(todo => todo.id !== +el.id)
    localStorage.setItem("task", JSON.stringify(filteredData));
}

