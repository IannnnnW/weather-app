import SideBar from './Components/SideBar/SideBar'
import { API } from './api/api'
import { useEffect, useState } from 'react'
import { LuThermometerSun } from "react-icons/lu";
import { LuThermometerSnowflake } from "react-icons/lu";
import { IoCloudOutline } from "react-icons/io5";
import { BiSolidDirections } from "react-icons/bi";
import { GiAtSea } from "react-icons/gi";
import { GiGroundSprout } from "react-icons/gi";
import { WiBarometer } from "react-icons/wi";
import { FaTemperatureLow } from "react-icons/fa";
import { WiDegrees } from "react-icons/wi";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

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
  const [location, setLocation] = useState({locationName:'Kampala', lat:'', lon:'', abrev:''})
  const [weather, setWeather] = useState<WeatherInfo | null>(null)
  const [fiveDaysWeather, setFiveDaysWeather]= useState<FiveDaysWeather>()

  async function getWeather(){
    let locationData = await API.getGeolocation(location.locationName)
    setLocation({...location, lat:locationData[0].lat, lon:locationData[0].lon, abrev:locationData[0].country})
    
    let weatherData = await API.getLocationWeather(locationData[0].lat, locationData[0].lon)
    setWeather(weatherData)

    let fiveDays = await API.getWeatherForNextFiveDays(locationData[0].lat, locationData[0].lon)
    setFiveDaysWeather(fiveDays.list)
  }
  useEffect(()=>{
      getWeather()
    }, [])

  return (
    <div className={weather?.weather[0].main == 'Clear' ? 'background-container-sunny' : weather?.weather[0].main == 'Rain' ? 'background-container-rainy' : 'background-container-cloudy'}>
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
          {weather ? <span className='mb-3 minor'>{`${location.lat}, ${location.lon}`}</span> : <Skeleton style={{height: '20px', opacity: '0.4'}}/>}
          <div className="container d-flex flex-column justify-content-center align-items-center">
            {weather ? <div className='align-self-center d-flex flex-column align-items-center mb-4 minor'>
              <span>{weather.weather[0].main}</span>
              <span>{weather.weather[0].description}</span>
            </div> : <Skeleton count={2} style={{height: '20px', opacity: '0.4'}}/>}
            <span className='mb-5'>Summary</span>
            <div className='container d-flex flex-column'>
              <div className="mb-5 gap-3 d-grid-4">
                { weather ? <div className="d-flex flex-column card p-4 weather-card">
                  <span className='d-flex'>{weather.main.temp_min}<WiDegrees size={20}/>F</span>
                  <span className='align-self-end'><LuThermometerSnowflake size={30}/></span>
                </div> : <Skeleton style={{height: '100px', opacity: '0.4'}}/>}
                { weather ? <div className="d-flex flex-column card p-4 weather-card">
                  <span className='d-flex'>{weather?.main.temp_max}<WiDegrees size={20}/>F</span>
                  <span className='align-self-end'><LuThermometerSun size={30}/></span>
                </div> : <Skeleton style={{height: '100px', opacity: '0.4'}}/>}
                { weather ? <div className="d-flex flex-column card p-4 weather-card">
                  <span>{weather.clouds.all}%</span>
                  <span className='align-self-end'><IoCloudOutline size={30}/></span>
                </div> : <Skeleton style={{height: '100px', opacity: '0.4'}}/>}
                { weather ? <div className="d-flex flex-column card p-4 weather-card">
                  <span className='d-flex'>{weather.wind.deg}<WiDegrees size={20}/></span>                  
                  <span className='align-self-end'><BiSolidDirections size={30}/></span>
                </div> : <Skeleton style={{height: '100px', opacity: '0.4'}}/>}
              </div>
              <div className="mt-2 gap-3 d-grid-4">
                { weather ? <div className="d-flex flex-column card p-4 weather-card">
                  <span>{weather.main.sea_level ? weather.main.sea_level : '__'}m</span>
                  <span className='align-self-end'><GiAtSea size={30}/></span>
                </div> : <Skeleton style={{height: '100px', opacity: '0.4'}}/>}
                { weather ? <div className="d-flex flex-column card p-4 weather-card">
                  <span>{weather.main.grnd_level ? weather.main.grnd_level : '__'}m</span>
                  <span className='align-self-end'><GiGroundSprout size={30}/></span>
                </div> : <Skeleton style={{height: '100px', opacity: '0.4'}}/>}
                { weather ? <div className="d-flex flex-column card p-4 weather-card">
                  <span>{weather.main.pressure} hPa</span>
                  <span className='align-self-end'><WiBarometer size={30}/></span>
                </div> : <Skeleton style={{height: '100px', opacity: '0.4'}}/>}
               { weather ? <div className="d-flex flex-column card p-4 weather-card">
                  <span className='d-flex'>{weather.main.feels_like}<WiDegrees size={20}/>F</span>
                  <span className='align-self-end'><FaTemperatureLow size={30}/></span>
                </div> : <Skeleton style={{height: '100px', opacity: '0.4'}}/>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
