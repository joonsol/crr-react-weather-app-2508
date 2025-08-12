
import './App.css'
import WeatherCard from './components/WeatherCard'
import { useEffect, useRef, useState } from 'react'
import { fetchCoordinates } from './api/geo'
import { fetchWeatherByCoords } from './api/weather'
import { getColorByWeatherId } from './api/bgColor'
function App() {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState("")
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSearch = async () => {
    const q = city.trim()
    if (!q) return

    try {
      setLoading(true)
      setErr("")

      const { lat, lon, name, country } = await fetchCoordinates(q)

      console.log(`${name}, ${country}`, lat, lon)

      const data = await fetchWeatherByCoords(lat, lon)
      setWeather(data)
      setCity("")

    } catch (error) {
      console.log(error)

    } finally {
      setLoading(false)
    }
  }
  const onChnageInput = (e) => setCity(e.target.value)
  const onKeyUp = (e) => {
    if (e.key === 'Enter') handleSearch()
  }
  const bg = weather?.weather?.[0]?.id
    ? getColorByWeatherId(weather.weather[0].id)
    : 'linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 100%)';

  return (
    <section style={{ background: bg, minHeight: '100vh', transition: 'background .3s ease' }}>

      <div className='app' >
        <h1>Kim** 's Weather App</h1>
        <div className="input-wrap">
          <input type="text"
            placeholder=' 도시명을 입력하세요(예 Seoul, Busan)'
            value={city}
            onChange={onChnageInput}
            onKeyUp={onKeyUp}
            // aria-lable ="도시명 입력"
            ref={inputRef} />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? "검색중..." : "검색"}
          </button>
        </div>

        {err && <p className='error'>{err}</p>}
        {loading && <p className='info'>불러오는 중...</p>}
        <WeatherCard weather={weather} />
      </div>
    </section>

  )
}

export default App
