import React, { useState } from "react"

export const TaskContext = React.createContext()

export const TaskProvider = (props) => {
    const [tasks, setTasks] = useState([])

    const getTasks = () => {
        return fetch("http://localhost:8000/tasks", {
            method: "GET",
            headers: {
                "Authorization": `Token ${localStorage.getItem("checklist_token")}`
            }
        })
            .then(response => response.json())
            .then(setTasks)
    }

    const createTask = (newTask) => {
        return fetch("http://localhost:8000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("checklist_token")}`
            },
            body: JSON.stringify(newTask)
        })
            .then(newTask)
    }

    const updateTask = (updatedTask) => {
        return fetch(`http://localhost:8000/tasks/${updatedTask.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("checklist_token")}`
            },
            body: JSON.stringify(updatedTask)
        })
            .then(getTasks)
    }

    const deleteTask = (taskId) => {
        return fetch(`http://localhost:8000/tasks/${taskId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("checklist_token")}`
            }
        })
            .then(getTasks)
    }

    const updateTaskStatus = (id) => {
        return fetch(`http://localhost:8000/tasks/${id}`, {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("checklist_token")}`
            },
            body: JSON.stringify({ "is_complete": true })
        })
            .then(getTasks)
    }


    return (
        <TaskContext.Provider value={{ tasks, getTasks, createTask, updateTask, deleteTask, updateTaskStatus}} >
            { props.children}
        </TaskContext.Provider>
    )
}
