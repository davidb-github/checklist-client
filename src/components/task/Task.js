import React, { useContext } from "react"
import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import { TaskContext } from "./TaskProvider.js"
// import "./Task.css"

export const Task = ({ task }) => {

    const { updateTaskStatus, deleteTask } = useContext(TaskContext)

    return (
        < section key={`task--${task.id}`} className="taskCard" >
            <div className="task__name">Title: {task.task_name} </div>
            <div className="task__description">Content: {task.task_description} </div>
            <div className="task__creationDate">Creation Date: {task.creation_date} </div>
            
            <Link key={task.id} id={task.id} to={{ pathname: `/edit/${task.id}`, state: { selectedTask: task }, taskId: task.id }} >
                <Button> Edit Task </Button>
            </Link>
            
            <Button onClick={() => updateTaskStatus(task.id)} > Mark As Completed Task </Button>
            <Button onClick={() => deleteTask(task.id)}> Delete Task </Button>
        </section >
    )
}