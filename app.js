// selectors
const todoInput = document.querySelector(".task-info-input");
const todoButton = document.querySelector(".task-add");
const todoList = document.querySelector(".list-flex");
const filterOption = document.querySelector(".right-list-buttons");
const changeColorBtn = document.querySelectorAll(".change-color-btn");
const dashbordSection = document.querySelector(".dashboard");
const changeFontColor = document.querySelector(".right-list-h3");

// eventlisteners
todoButton.addEventListener("click", addToDo);
todoList.addEventListener("click", completeDelete);
filterOption.addEventListener("click", filterTodos);
document.addEventListener("DOMContentLoaded", getFromLocal);


// functions

// add new to do
function addToDo(e) {
   e.preventDefault(); //because it is a button and its default should be prevented
   const todoInputValue = todoInput.value; //get input value from input
   const todoSpan = document.createElement("span"); // create
   todoSpan.classList.add("list-item"); //give class to it
   todoSpan.innerHTML = `   
   <span class="list-item-value">${todoInputValue}</span>
    <span><i class="far fa-check-square"></i></span>
    <span><i class="fas fa-trash-alt"></i></span>
    `; //give content
   todoList.appendChild(todoSpan); //append to its parent
   saveToLocalStorage(todoInput.value); //save the given text to localstorage
   todoInput.value = ""; //reset value of input
}

//complete or delete a task
function completeDelete(e) {
   const classList = [...e.target.classList];
   const item = e.target;
   if (classList[1] === "fa-trash-alt") {
      const todo = item.parentElement.parentElement;
      removeLocalTodos(todo);
      todo.remove();
   } else if (classList[1] === "fa-check-square") {
      const todo = item.parentElement.parentElement;
      todo.classList.toggle("change-check");
   }
}

// filter todos 
function filterTodos(e){
    // it is nodelist so we use spread opeartor
    // console.log(e.target.classList);
    const classList = [...e.target.classList];
    // console.log(classList);
    // console.log(todoList.childNodes);
    const alltodos = [...todoList.childNodes];
    alltodos.forEach((todo)=>{
        if(classList[0] === "all"){
            todo.style.display = "flex";
        }
        else if(classList[0] === "uncompleted"){
            if(!todo.classList.contains("change-check")){
                todo.style.display = "flex";
                }
            else{
                todo.style.display = "none";
                }
        }
        else{
            if(todo.classList.contains("change-check")){
                todo.style.display = "flex";
                }
            else{
                todo.style.display = "none";
                }
        }

    });
}

// to save in locale storage
function saveToLocalStorage(todo) {
   // localStorage.getItem('todo');
   // localStorage.setItem('todo',JSON.stringify(todo));
   let savedTodos = localStorage.getItem("todos")
   ? JSON.parse(localStorage.getItem("todos")) 
   : [];
   savedTodos.push(todo);
   localStorage.setItem("todos", JSON.stringify(savedTodos));
}

// remove from local storage 
function removeLocalTodos(todo) {
   let savedTodos = localStorage.getItem("todos") 
   ? JSON.parse(localStorage.getItem("todos")) 
   : [];
   const filterToDo = savedTodos.filter((t) => t !== todo.children[0].innerText); //1 !==2 , 2!==2 ?? haala k mosabie pas hamon mosaviaro bede
   localStorage.setItem("todos", JSON.stringify(filterToDo));

   //     second way to remove
   // function removeLocalTodo(todo){
   //     let todos;
   //     if(localStorage.getItem("todos") === null){
   //         todos = [];
   //     }else{
   //         todos = JSON.parse(localStorage.getItem("todos"));
   //     }
   //     const todoIndex = todo.children[0].innerText;
   //     todos.splice(todos.indexOf(todoIndex),1);
   //     localStorage.setItem("todos", JSON.stringify(todos));
   // }
}


//to show what we have saved
//->when browser loads -> check localstorage first -> get all in localestorage and show in DOM
function getFromLocal(){
    let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos")) 
    : [];
    savedTodos.forEach((toD)=>{
        //we have to build one in dom based on what we built before
        const span = document.createElement("span");  // create
        span.classList.add("list-item");              // give class - then content(line below)
        const newTodo =  `                            
        <span class="list-item-value">${toD}</span>
        <span><i class="far fa-check-square"></i></span>
        <span><i class="fas fa-trash-alt"></i></span>
        `;
        span.innerHTML = newTodo;               //put content inside span html
        todoList.appendChild(span);             //append
    })
}

changeColorBtn.forEach((item) => {
   item.addEventListener("click", () => {
      const classLists = item.classList;
      if (classLists.contains("change-color-blue")) {
         dashbordSection.style.backgroundColor = "var(--blue)";
         changeFontColor.style.color = "var(--white)";
      } else if (classLists.contains("change-color-red")) {
         dashbordSection.style.backgroundColor = "var(--red)";
         changeFontColor.style.color = "var(--white)";
      } else if (classLists.contains("change-color-green")) {
         dashbordSection.style.backgroundColor = "var(--green)";
         changeFontColor.style.color = "var(--white)";
      } else if (classLists.contains("change-color-yellow")) {
         dashbordSection.style.backgroundColor = "var(--yellow)";
         changeFontColor.style.color = "var(--white)";
      } else if (classLists.contains("change-color-white")) {
         dashbordSection.style.backgroundColor = "var(--white)";
         changeFontColor.style.color = "var(--bc-blk)";
      }
   });
});
