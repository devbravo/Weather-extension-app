import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/roboto'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import PictureInPictureIcon from '@mui/icons-material/PictureInPicture'
import './popup.css'
import WeatherCard from '../components/weatherCard'
import {
	setStoredCities,
	setStoredOptions,
	getStoredCities,
	getStoredOptions,
	LocalStorageOptions,
} from '../utils/storage'
import { Messages } from '../utils/messages'

const App: React.FC<{}> = () => {
	const [cities, setCities] = useState<string[]>([])
	const [cityInput, setCityInput] = useState<string>('')
	const [options, setOptions] = useState<LocalStorageOptions | null>(null)

	useEffect(() => {
		getStoredCities().then(cities => setCities(cities))
		getStoredOptions().then(options => setOptions(options))
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

	const handleTempScale = () => {
		const updateOptions: LocalStorageOptions = {
			...options,
			tempScale: options.tempScale === 'metric' ? 'imperial' : 'metric',
		}
		setStoredOptions(updateOptions).then(() => {
			setOptions(updateOptions)
		})
	}

	const handleOverlay = () => {
		chrome.tabs.query(
			{
				active: true,
				currentWindow: true,
			},
			tabs => {
				if (tabs.length > 0) {
					chrome.tabs.sendMessage(tabs[0].id, Messages.TOGGLE_OVERLAY)
				}
			},
		)
	}

	if (!options) return null

	return (
		<Box mx='8px' my='16px'>
			<Grid container justifyContent='space-evenly' alignItems='center'>
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
				<Grid item>
					<Paper>
						<Box py='14px'>
							<IconButton onClick={handleTempScale}>{options.tempScale === 'metric' ? '\u2103' : '\u2109'}</IconButton>
						</Box>
					</Paper>
				</Grid>
				<Grid item>
					<Paper>
						<Box py='14px'>
							<IconButton onClick={handleOverlay}>
								<PictureInPictureIcon />
							</IconButton>
						</Box>
					</Paper>
				</Grid>
			</Grid>
			{options.homeCity != '' && <WeatherCard city={options.homeCity} tempScale={options.tempScale} />}
			{cities.map((city, idx) => (
				<WeatherCard
					key={idx}
					tempScale={options.tempScale}
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
