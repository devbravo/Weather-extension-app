import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './popup.css'
import { fetchOpenWeatherData } from '../utils/api'

const App: React.FC<{}> = () => {
  useEffect(() => {
    fetchOpenWeatherData("Paramaribo")
    .then((data) => console.log(data))
    .catch((err) => console.log(err))
  }, [])

  return (
    <div>
      <img src='icon.png' />
    </div>
  )
}

// const rootElement = document.getElementById('root')
const rootEL = document.createElement('div')
document.body.appendChild(rootEL)
const root = ReactDOM.createRoot(rootEL)
root.render(<App />)
