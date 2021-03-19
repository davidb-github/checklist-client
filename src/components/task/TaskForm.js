import React, { useContext, useState, useEffect } from "react";
import { TaskContext } from "./TaskProvider";
import Button from "react-bootstrap/Button";

export const TaskForm = (props) => {
  const { tasks, getTasks, createTask, updateTask } = useContext(TaskContext);

  // Set task into state to be manipulated later
  const [task, setTask] = useState({});

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    getTaskInEditMode();
  }, [tasks]);

  /* 
        Edit mode evaluates to true if a `taskId` is found
        in the address bar otherwise it evaluates to false.
     */
  const editMode = props.match.params.hasOwnProperty("taskId");

  /*
        When a form field changes, create a new task object
        and set it in state.
    */
  const handleControlledInputChange = (event) => {
    const newTask = Object.assign({}, task);
    newTask[event.target.name] = event.target.value;
    setTask(newTask);
  };

  /*
        If editMode is true, parse URL and grab the taskId value.
        Find a single task who's id matches the taskId from URL.
    */
  const getTaskInEditMode = () => {
    if (editMode) {
      const taskId = parseInt(props.match.params.taskId);
      const selectedTask = tasks.find((t) => t.id === taskId);
      setTask(selectedTask);
    }
  };

  /*
        1. Get current user.
        2. If editMode evaluates to true, create a new task object
        from the task set in state.
        3. Invoke updateTask with the new task object (PUT method).
        4. Redirect to TaskList view.
    */
  const constructNewTask = () => {
    const user_id = parseInt(localStorage.getItem("checklist_token"));
    if (editMode) {
      const newTask = {
        id: task.id,
        user_id: user_id,
        task_name: task.task_name,
        task_description: task.task_description,
        is_complete: false,
      };

      updateTask(newTask).then(props.history.push("/"));
    } else {
      const newTask = {
        user_id: user_id,
        task_name: task.task_name,
        task_description: task.task_description,
      };
      createTask(newTask).then(props.history.push("/"));
    }
  };
  return (
    <>
      <h1> Task Form </h1>
      <form className="taskForm">
        <fieldset>
          <label> Task Name</label>
          {task ? (
            <input
              type="text"
              name="task_name"
              defaultValue={task.task_name}
              onChange={handleControlledInputChange}
            ></input>
          ) : (
            <></>
          )}
        </fieldset>
        <fieldset>
          <label> Task Description </label>
          {task ? (
            <input
              type="text"
              name="task_description"
              defaultValue={task.task_description}
              onChange={handleControlledInputChange}
            ></input>
          ) : (
            <></>
          )}
        </fieldset>
      </form>
      <Button
        type="submit"
        onClick={(event) => {
          event.preventDefault();
          constructNewTask();
        }}
      >
        {" "}
        {editMode ? "Edit" : "Create"}
      </Button>
    </>
  );
};
