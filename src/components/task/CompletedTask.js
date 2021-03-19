import React, { useContext } from "react"
import Button from 'react-bootstrap/Button'
import { TaskContext } from "./TaskProvider"



export const CompletedTask = ({ task }) => {

    const { deleteTask } = useContext(TaskContext)

    return (
        < section key={`task--${task.id}`} className="taskCard" >
            <div className="task__name">Title: {task.task_name}</div>
            <div className="task__description">Content: {task.task_description}</div>
            
            <Button onClick={() => deleteTask(task.id)}> Delete Task </Button>
        </section >
    )
}