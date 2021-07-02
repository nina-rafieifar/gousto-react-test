import React from 'react'
import { Router } from "@reach/router"
import Menu from './Menu.js'
import './App.css'

const App = () => (
  <div className="appContainer">
    <Router>
      <Menu path="/"/>
    </Router>
  </div>
)

export default App
