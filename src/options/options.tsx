import React from 'react'
import ReactDOM from 'react-dom/client'
import './options.css'

const test = <img src='icon.png'/>

const rootEL = document.createElement('div')
document.body.appendChild(rootEL)
const root = ReactDOM.createRoot(rootEL)
root.render(test)