const API: { getGeolocation : (location: string) => Promise<any>, getLocationWeather :(lat :string, lon :string) => Promise<any>, getCurrentDateTime: () => any, getWeatherForNextFiveDays: (lat : string, long : string)=> any} = {
    getGeolocation: async(location)=>{
        let response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`, { 
            method: "GET",
        });
        return(await response.json())
    },
    getLocationWeather: async(lat, lon)=>{
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`, {
            method: "GET",
        })
        return(await response.json())
    },
    getWeatherForNextFiveDays: async(lat, lon)=>{
        let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`, {
            method: "GET",
        })
        return(await response.json())
        
    },
    getCurrentDateTime :()=>{
        const now = new Date();
        const formattedDate = now.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });
        const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
        return {formattedDate , formattedTime}
    },

}

export {API}
