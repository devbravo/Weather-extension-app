import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Grid, Box, Card, CardContent, TextField, Typography, Button } from '@mui/material'
import '@fontsource/roboto'
import './options.css'
import { getStoredOptions, LocalStorageOptions, setStoredOptions } from '../utils/storage'

type FormState = 'ready' | 'saving'

const Options: React.FC<{}> = () => {
	const [options, setOptions] = useState<LocalStorageOptions | null>(null)
	const [formState, setFormState] = useState<FormState>('ready')

	useEffect(() => {
		getStoredOptions().then(options => setOptions(options))
	}, [])

	const handleHomeCityChange = (homeCity: string) => {
		console.log(homeCity)
		setOptions({ ...options, homeCity })
	}

	const handleSaveCity = () => {
		setFormState('saving')
		setStoredOptions(options).then(() => {
			setTimeout(() => {
				setFormState('ready')
			}, 1000)
		})
	}

	if (!options) return null

	const isFieldsDisabled = formState === 'saving'

	return (
		<Box mx='10%' my='2%'>
			<Card>
				<CardContent>
					<Grid container direction='column' spacing={4}>
						<Grid item>
							<Typography variant='h4'>Weather Extension Options</Typography>
						</Grid>
						<Grid item>
							<Typography variant='body1'>Home city name</Typography>
							<TextField
								fullWidth
								placeholder='Enter a home city'
								value={options.homeCity}
								onChange={e => handleHomeCityChange(e.target.value)}
								disabled={isFieldsDisabled}
							/>
						</Grid>
						<Grid item>
							<Button onClick={handleSaveCity} variant='contained' color='primary' disabled={isFieldsDisabled}>
								{formState === 'ready' ? 'Save' : 'Saving...'}
							</Button>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Box>
	)
}

const rootEL = document.createElement('div')
document.body.appendChild(rootEL)
const root = ReactDOM.createRoot(rootEL)
root.render(<Options />)
