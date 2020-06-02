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
    addItems(taskItem.task.toUpperCase(),taskItem.status);
})
console.log(tasks)
}

//Function to Add a new Task
function addTask(e){
 //Create a new List Item with the check and remove icons
 const newTask = {
            task : taskInput.value.toUpperCase(),
            status : "Not completed"
              }

addItems(newTask.task, newTask.status);


localStorage.getItem('tasks') ? tasks = JSON.parse(localStorage.getItem('tasks')) : tasks = []
tasks.push(newTask);
localStorage.setItem('tasks', JSON.stringify(tasks));

//Set the input field to blanks
taskInput.value= '';
}

// Function to Add task items to the local storage
function addItems(task,status){
    const list = document.createElement("li");
    // Set the new list item with task  and icons         
     list.innerHTML = `${task}<span class="u-pull-right">
                    <a><i class="fa fa-check" style="color:green"></i></a>
                    <a><i class="fa fa-remove" style="color:red"></i></a></span>
                    </li><hr>`;
    list.className = "u-full-width";
    if (status =='completed'){
        list.style.textDecoration = "line-through";
        list.style.color = "green"; 
    }
    else{
        list.style.textDecoration = "none";
        list.style.color = "black";
    }
    // Append it to List of Items
    taskList.appendChild(list);

    


}

//Function to remove item
function removeOrCompleteTask(e){
    if(e.target.classList.contains('fa-remove'))
        {
        tasks.forEach((taskItem,index)=>{
            if (taskItem.task.toUpperCase() == 
                e.target.parentElement.parentElement.parentElement.textContent.trim().toUpperCase()){
                tasks.splice(index,1)
            }     
        })
        e.target.parentElement.parentElement.parentElement.remove();
        localStorage.setItem('tasks',JSON.stringify(tasks));
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
         
            tasks.forEach((taskItem,index)=>{
                if (taskItem.task.toUpperCase() == 
                e.target.parentElement.parentElement.parentElement.textContent.trim().toUpperCase()) {
                if (e.target.parentElement.parentElement.parentElement.style.textDecoration == "line-through") 
                {  
                    tasks.splice(index,1,  {
                        task : taskItem.task.toUpperCase(),
                        status : "completed"
                    })
                }
                else{
                    tasks.splice(index,1,  {
                        task : taskItem.task.toUpperCase(),
                        status : "Not completed"
                    })
                }
                }
                })
        localStorage.setItem('tasks',JSON.stringify(tasks));      
        }
    }
            
//Function to Remove all Task Items
function removeAllTasks(){
    console.log(tasks)
    if (taskfilteredItems){
        taskfilteredItems.forEach((taskfilteredItem)=>{
            tasks.forEach((taskItem,index)=>{
                    if (taskItem.task.toUpperCase() == taskfilteredItem.textContent.trim().toUpperCase()){
                        tasks.splice(index,1)
                    }

        taskfilteredItem.remove();
        })
})
        localStorage.setItem('tasks',JSON.stringify(tasks));
}
    else {
    while (taskList.firstChild){
        tasks.forEach((taskItem,index)=>{
            if (taskItem.task.toUpperCase() == taskList.firstChild.textContent.trim().toUpperCase()){
                tasks.splice(index,1)
            }
        })
    taskList.firstChild.remove();
}
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

}

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