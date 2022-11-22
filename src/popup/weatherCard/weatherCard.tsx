import React, { useEffect } from 'react'
import { Card, CardContent } from '@mui/material'
import { fetchOpenWeatherData } from '../../utils/api'

const WeatherCard: React.FC<{city: string}> = ({ city }) => {
  useEffect(() => {
    fetchOpenWeatherData(city)
    .then((data) => {
      console.log(data)
      console.log('Temperature is: ', data.main.temp)
    })
    .catch((err) => console.log(err))
  }, [city])

  return <Card><CardContent>{city}</CardContent></Card>
}

export default WeatherCard