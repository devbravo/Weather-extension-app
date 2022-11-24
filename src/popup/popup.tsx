import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/roboto'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import './popup.css'
import WeatherCard from './weatherCard'
import { setStoredCities, getStoredCities } from '../utils/storage'

const App: React.FC<{}> = () => {
	const [cities, setCities] = useState<string[]>([])
	const [cityInput, setCityInput] = useState<string>('')

	useEffect(() => {
		getStoredCities().then(cities => setCities(cities))
	}, [])

	const handleCityButtonClick = () => {
		if (cityInput === '') return
		const updatedCities = [...cities, cityInput]
		setStoredCities(updatedCities).then(() => {
			setCities(updatedCities)
			setCityInput('')
		})
	}

	const handleCityDelete = (index: number) => {
		cities.splice(index, 1)
		const updatedCities = [...cities]
		setStoredCities(updatedCities).then(() => {
			setCities(updatedCities)
		})
	}

	return (
		<Box mx='8px' my='16px'>
			<Grid container>
				<Grid item>
					<Paper>
						<Box px='15px' py='5px'>
							<InputBase placeholder='Add a city name' value={cityInput} onChange={e => setCityInput(e.target.value)} />
							<IconButton onClick={handleCityButtonClick}>
								<AddIcon />
							</IconButton>
						</Box>
					</Paper>
				</Grid>
			</Grid>
			{cities.map((city, idx) => (
				<WeatherCard
					key={idx}
					city={city}
					onDelete={() => {
						handleCityDelete(idx)
					}}
				/>
			))}
			<Box height='16px' />
		</Box>
	)
}

// const rootElement = document.getElementById('root')
const rootEL = document.createElement('div')
document.body.appendChild(rootEL)
const root = ReactDOM.createRoot(rootEL)
root.render(<App />)
