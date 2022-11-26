import React from 'react'
import ReactDOM from 'react-dom/client'
import { Grid, Box, Card, CardContent, TextField, Typography } from '@mui/material'
import '@fontsource/roboto'
import './options.css'

const App: React.FC<{}> = () => {
	return (
		<Box mx='10%' my='2%'>
			<Card>
				<CardContent>
					<Grid container direction='column'>
						<Grid item>
							<Typography variant='h4'>Weather Extension Options</Typography>
						</Grid>
						<Grid item>
							<Typography variant='body1'>Home city name</Typography>
							<TextField fullWidth placeholder='Enter a home city' />
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
root.render(<App />)
