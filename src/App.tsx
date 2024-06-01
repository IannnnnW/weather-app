import SideBar from './Components/SideBar/SideBar'
import { API } from './api/api'
import { useState } from 'react'
import './App.css'

interface WeatherInfo{
  weather : Array<any>
  wind : any
  main : any
  sys : any
  visibility : number
  clouds : any
}

interface FiveDaysWeather{
  list : any
}

function App() {
  const [location, setLocation] = useState({locationName:'', lat:'', lon:'', abrev:''})
  const [weather, setWeather] = useState<WeatherInfo | null>(null)
  const [fiveDaysWeather, setFiveDaysWeather]= useState<FiveDaysWeather>()

  async function getWeather(){
    let locationData = await API.getGeolocation(location.locationName)
    setLocation({...location, lat:locationData[0].lat, lon:locationData[0].lon, abrev:locationData[0].country })
    
    let weatherData = await API.getLocationWeather(locationData[0].lat, locationData[0].lon)
    setWeather(weatherData)

    let fiveDays = await API.getWeatherForNextFiveDays(locationData[0].lat, locationData[0].lon)
    setFiveDaysWeather(fiveDays.list)
  }

  return (
    <div className='app'>
      <SideBar windSpeed={weather?.wind.speed} humidity={weather?.main.humidity} visibility={weather?.visibility} temperature={weather?.main.temp} fiveDaysWeather={fiveDaysWeather}/>
      <div className='d-flex flex-column align-items-center justify-content-between'>
        <div className="input-group mb-3 w-75">
          <div className="input-group-prepend">
          </div>
          <input type="text" className="form-control" placeholder="Enter Location" aria-label="Username" aria-describedby="basic-addon1" onChange={(e)=>setLocation({...location, locationName:e.target.value})}/>
          <button onClick={getWeather}>Search</button>
        </div>
        <div className='card w-25'>
          <span className='text-center'>{location.locationName}, {location.abrev}</span>
        </div>
        <span className='mb-3'>{`${location.lat}, ${location.lon}`}</span>
        {weather 
        ? 
        <div className="container d-flex flex-column justify-content-center align-items-center">
          <div className='align-self-center d-flex flex-column align-items-center mb-4'>
            <span>{weather.weather[0].main}</span>
            <span>{weather.weather[0].description}</span>
          </div>
          <span className='mb-5'>Summary</span>
          <div className='container d-flex flex-column'>
            <div className="mb-5 gap-3 d-grid-4">
              <div className="d-flex flex-column card p-4">
                {weather.main.temp_min}
                <span>Min. Temperature</span>
              </div>
              <div className="d-flex flex-column card p-4">
                {weather.main.temp_max}
                <span>Max. Temperature</span>
              </div>
              <div className="d-flex flex-column card p-4">
                {weather.clouds.all}
                <span>Cloud Cover</span>
              </div>
              <div className="d-flex flex-column card p-4">
                {weather.wind.deg}
                <span>Wind Deg.</span>
              </div>
            </div>
            <div className="mt-2 gap-3 d-grid-4">
              <div className="d-flex flex-column card p-4">
                {weather.main.sea_level ? weather.main.sea_level : '__'}
                <span>Sea Level</span>
              </div>
              <div className="d-flex flex-column card p-4">
                {weather.main.grnd_level ? weather.main.grnd_level : '__'}
                <span>Grnd. Level</span>
              </div>
              <div className="d-flex flex-column card p-4">
                {weather.main.pressure}
                <span>Pressure</span>
              </div>
              <div className="d-flex flex-column card p-4">
                {weather.main.feels_like}
                <span>Feels Like</span>
              </div>
            </div>
          </div>
        </div>
        :
        <div className='justify-self-center mb-5'>
          <h6 className='mb-5'>Loading...</h6>
        </div>
        }
      </div>
    </div>
  )
}

export default App
