import { useEffect, useState } from "react";

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => { // 서버 요청
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${API_KEY}&units=metric&lang=kr`,
    )
      .then((res) => res.json())
      .then((data) => setWeather(data));
  }, []);

  if (!weather) return <>Loading...</>;

  const icon = weather.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <>
      <h1>{weather.name}</h1> {/* 도시 이름 */}
      <img src={iconUrl} alt="날씨" /> {/* 날씨 아이콘 */}
      <p>{weather.weather[0].description}</p> {/* 날씨 설명 */}
      <h2>{weather.main.temp}°C</h2> {/* 날씨 온도 */}
    </>
  );
}
