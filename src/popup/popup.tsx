import React from 'react'
import ReactDOM from 'react-dom/client'
import './popup.css'

const test = <img src='icon.png'/>

// const rootElement = document.getElementById('root')
const rootEL = document.createElement('div')
document.body.appendChild(rootEL)
const root = ReactDOM.createRoot(rootEL)
root.render(test)
