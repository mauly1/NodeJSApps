const pendingTask=[];
const tasks = {
    tasks: [
        {
            task: 'Grocery Shopping',
            completed: true
        }, {
            task: 'Clean Yard',
            completed: false
        }, {
            task: 'Film Course',
            completed: false
        }
    ],
    getTaskToDo:()=>{
        tasks.tasks.forEach((task)=>{
            if(!task.completed){
                console.log(`${task.task} is in ${task.completed} status. `)
                pendingTask.push({
                    task:task.task,
                    completed:task.completed
                })
            }
        })
        return JSON.stringify(pendingTask);
    }
}

console.log(tasks.getTaskToDo());

console.log(`pending task are ${JSON.stringify(pendingTask)}`)