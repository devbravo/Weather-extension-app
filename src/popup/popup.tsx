import React from 'react'
import ReactDOM from 'react-dom/client'
import './popup.css'
import WeatherCard from './weatherCard'

const App: React.FC<{}> = () => {

  return (
    <div>
      <WeatherCard city="Paramaribo"/>
    </div>
  )
}

// const rootElement = document.getElementById('root')
const rootEL = document.createElement('div')
document.body.appendChild(rootEL)
const root = ReactDOM.createRoot(rootEL)
root.render(<App />)
