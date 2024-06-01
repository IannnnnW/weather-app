import { API } from '../../api/api'
import './SideBar.css'
import { useEffect, useState } from 'react'

interface WeatherItems{
    humidity : string
    visibility : any
    windSpeed : number
    temperature: number
    fiveDaysWeather: any
}

interface DateTime{
    formattedDate : string
    formattedTime : string
}

export default function SideBar(props : WeatherItems){
    const [datetime, setDateTime] = useState<DateTime>()
    useEffect(()=>{
        function returnDateTime(){
        setDateTime(API.getCurrentDateTime())
        }
        returnDateTime()
    }, [])
    return(
        <section className='SideBar d-flex flex-column align-items-center p-3'>
           <div className='d-flex flex-column align-items-center'>
                <span className='temperature'>{props.temperature}</span>
                <div className='d-flex align-items-center mb-5'>
                    <span>{datetime?.formattedDate}</span>
                    <span className='hrv'></span>
                    <span>{datetime?.formattedTime}</span>
                </div>
                <div className='d-flex justify-content-between gap-5'>
                    <div className='d-flex flex-column align-items-center'>
                        <span>Wind</span>
                        <span>{props.windSpeed}km/h</span>
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                        <span>Humidity</span>
                        <span>{props.humidity}%</span>
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                        <span>Visibility</span>
                        <span>{props.visibility}km</span>
                    </div>
                </div>
                <span className='hrh'></span>
           </div>
           <div className='d-flex flex-column align-items-center'>
                <span className='bold-text'>Forecasts for Coming Hours</span>
                <div className='d-flex flex-column align-items-center justify-items-center'>
                    {props.fiveDaysWeather?.slice(0,5).map((day : any) => <UpcomingWeather key={day.dt_txt} date={day.dt_txt} tempMin={day.main.temp_min} tempMax={day.main.temp_max}/>)}
                </div>
           </div>
        </section>
    )
}

interface UpcomingWeatherItems{
    date : string
    tempMin : number
    tempMax: number
}

function UpcomingWeather(props : UpcomingWeatherItems){
    return (
        <div className='d-flex p-2'>
            <div className='d-flex align-items-center'>
                <i></i>
                <span>{props.date.slice(2)}</span>
            </div>
            <span className='hrv2'></span>
            <div className='d-flex flex-column'>
                <span>{props.tempMax}</span>
                <span>{props.tempMin}</span>
            </div>
        </div>
    )
}