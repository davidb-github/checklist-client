import React from "react";
import { Route } from "react-router-dom";
import { TaskProvider } from "./task/TaskProvider";
import { TaskList } from "./task/TaskList";
import { CompletedTaskList } from "./task/CompletedTaskList";
import { TaskForm } from "./task/TaskForm";

export const ApplicationViews = () => {
  return (
    <>
      <main
        style={{
          margin: "5rem 2rem",
          backgroundColor: "lightgoldenrodyellow",
        }}
      >
        {/* Current Tasks View */}
        <TaskProvider>
          <Route exact path="/">
            <TaskList />
          </Route>
        </TaskProvider>

        {/* Completed Tasks View */}
        <TaskProvider>
          <Route exact path="/completed">
            <CompletedTaskList />
          </Route>
        </TaskProvider>

        {/* TaskForm View */}
        <TaskProvider>
          {/* Route for creating a new task */}
          <Route
            exact
            path="/create"
            render={(props) => <TaskForm {...props} />}
          />

          {/* Route for updating a task */}
          <Route
            exact
            path="/edit/:taskId(\d+)"
            render={(props) => <TaskForm {...props} />}
          />
        </TaskProvider>
      </main>
    </>
  );
};
