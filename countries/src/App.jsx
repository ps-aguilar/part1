import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  const api_key = import.meta.env.VITE_WEATHER_KEY

  useEffect(() => { 
    if (query === '') {
      setCountries([])
      setSelectedCountry(null)
      return
    }

    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        const filtered = response.data.filter(country =>
          country.name.common.toLowerCase().includes(query.toLowerCase())
        )
        setCountries(filtered)
        setSelectedCountry(null)
      })
  }, [query])

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  const showDetails = (country) => {
    setSelectedCountry(country)
  }

  const countryToShow = selectedCountry || (countries.length === 1 ? countries[0] : null)

  useEffect(() => {
    if (!countryToShow) return

    const capital = countryToShow.capital[0]
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
      .then(response => {
        setWeather(response.data)
      })
      .catch(error => {
        console.error('Error fetching weather data:', error)
        setWeather(null)
      })
  }, [countryToShow, api_key])

  return (
    <div>
      <label>find countries </label>
      <input value={query} onChange={handleChange} />
      <br />

      {countries.length > 10 && <p>Too many matches, specify another filter</p>}

      {countries.length > 1 && countries.length <= 10 && !selectedCountry &&
        countries.map(c =>
          <div key={c.cca3}>
            {c.name.common} <button onClick={() => showDetails(c)}>show</button>
          </div>
        )
      }

      {countryToShow &&
        <div>
          <h2>{countryToShow.name.common}</h2>
          <p>Capital: {countryToShow.capital}</p>
          <p>Area: {countryToShow.area}</p>

          <h3>Languages</h3>
          <ul>
            {Object.values(countryToShow.languages).map(lang => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>

          <img src={countryToShow.flags.png} alt="flag" width="150" />

          {weather && (
            <div>
              <h3>Weather in {countryToShow.capital[0]}</h3>
              <p>Temperature: {weather.main.temp}°C</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather icon"
              />
              <p>Wind: {weather.wind.speed} m/s</p>
            </div>
          )}
        </div>
      }
    </div>
  )
}

export default App
