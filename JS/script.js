const addButton = document.querySelector('#addBtn'),
      taskInput = document.querySelector(".taskInput"),
      taskList = document.querySelector(".taskList"),
      clearTasksButton = document.querySelector(".clearTasks"),
      filtertask =document.querySelector(".filtertask")

let taskfilteredItems, tasks;  



//Load Event Listeners
addButton.addEventListener('click', addTask)
taskList.addEventListener('click', removeOrCompleteTask)    
clearTasksButton.addEventListener('click',removeAllTasks)
filtertask.addEventListener('keyup',filterTasks),
document.addEventListener('DOMContentLoaded',populateItems)

// UI Functions 

// Populate Tasks from local storage
function populateItems(){
localStorage.getItem('tasks') ? tasks = JSON.parse(localStorage.getItem('tasks')) : tasks = []
tasks.forEach((taskItem)=>{
    addItems(taskItem.task.toUpperCase());
})
}

//Function to Add a new Task
function addTask(e){
 //Create a new List Item with the check and remove icons
 const newTask = {
            task : taskInput.value.toUpperCase(),
            status : "Not completed"
              }

addItems(taskInput.value.toUpperCase());


localStorage.getItem('tasks') ? tasks = JSON.parse(localStorage.getItem('tasks')) : tasks = []
tasks.push(newTask);
localStorage.setItem('tasks', JSON.stringify(tasks));

//Set the input field to blanks
taskInput.value= '';
}

function addItems(task){
    const list = document.createElement("li");
    // Set the new list item with task  and icons              
     list.innerHTML = `${task}
                    <span class="u-pull-right">
                    <a><i class="fa fa-check" style="color:green"></i></a>
                    <a><i class="fa fa-remove" style="color:red"></i></a></span>
                    </li><hr>`;
    list.className = "u-full-width";
    // Append it to List of Items
    taskList.appendChild(list);

}

//Function to remove item
function removeOrCompleteTask(e){
    if(e.target.classList.contains('fa-remove'))
        {
        e.target.parentElement.parentElement.parentElement.remove();
        console.log(e.target.parentElement.parentElement.parentElement.textContent);
        }
    else if (e.target.classList.contains('fa-check'))
        {
            (e.target.parentElement.parentElement.parentElement.style.textDecoration == "line-through") ? 
            e.target.parentElement.parentElement.parentElement.style.textDecoration= "none" :
            e.target.parentElement.parentElement.parentElement.style.textDecoration= 
                "line-through";

            (e.target.parentElement.parentElement.parentElement.style.color == "green") ? 
            e.target.parentElement.parentElement.parentElement.style.color= "black" :
            e.target.parentElement.parentElement.parentElement.style.color= "green";
        }
    }


//Function to Remove all Task Items
function removeAllTasks(){
    if (taskfilteredItems){
        taskfilteredItems.forEach((taskItem)=>{
              taskItem.remove();
        })
    }
    else {
    while (taskList.firstChild){
        taskList.firstChild.remove();
    }
}}


//Function to filter the tasks inputs based on input values
function filterTasks (){
  const filterText = filtertask.value,
        taskItems = Array.from(taskList.children); 

  taskItems.forEach((taskItem)=>{
      if (taskItem.textContent.toUpperCase().indexOf(filterText.toUpperCase()) == '-1')
      {
          taskItem.style.display ="none"
      } 
      else {
           taskItem.style.display ="list-item"
      }
      
  })

  taskfilteredItems = taskItems.filter((taskItem)=>{
     return  (taskItem.style.display !='none')
     
  })
}