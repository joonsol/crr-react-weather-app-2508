
import './App.css'
import WeatherCard from './components/WeatherCard'
import { useEffect, useRef, useState } from 'react'
import { fetchCoordinates } from './api/geo'
import { fetchWeatherByCoords } from './api/weather'
function App() {
  const [city, setCity] = useState("seoul")
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

    }
  }
  const onChnageInput = (e) => setCity(e.target.value)
  const onKeyUp = (e) => {
    if (e.key === 'Enter') handleSearch()
  }
  return (
    <div className='app'>
      <h1>날씨앱</h1>
      <div className="input-wrap">
        <input type="text"
          placeholder=' 도시명을 입력하세요(예 Seoul, Busan)'
          value={city}
          onChange={onChnageInput}
          onKeyUp={onKeyUp}
          // aria-lable ="도시명 입력"
          ref={inputRef} />
        <button>
          {loading ? "검색중..." : "검색"}
        </button>
      </div>
      {err && <p className='error'>{err}</p>}
      {loading && <p className='info'>불러오는 중...</p>}

      <WeatherCard weather={weather} />

    </div>

  )
}

export default App
