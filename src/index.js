import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { Checklist } from "./components/Checklist.js"
import "./index.css"

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Checklist />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)
