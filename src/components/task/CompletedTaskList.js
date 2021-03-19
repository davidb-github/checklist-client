import React, { useContext, useEffect } from "react"
import { TaskContext } from "../task/TaskProvider.js"
import { CompletedTask } from "./CompletedTask"

export const CompletedTaskList = (props) => {
    const { tasks, getTasks } = useContext(TaskContext)

    useEffect(() => {
        getTasks()
    }, [])

    return (
        <>
            <h1> Completed Tasks </h1>
            <article className="completedTaskList">
                {
                    // Return tasks who are marked as complete
                    tasks.filter(task => { return task.is_complete == true })
                        // Map through returned results and render them to DOM
                        .map(task => { return <CompletedTask key={task.id} task={task} /> })
                }
            </article>
        </>
    )
}