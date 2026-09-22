import { site } from "@/data/site";
import styles from "./Footer.module.css";

function weatherIcon(code: number): string {
  if (code === 0) return "☀️";
  if (code <= 2) return "⛅";
  if (code <= 3) return "☁️";
  if (code <= 67) return "🌧️";
  if (code <= 77) return "❄️";
  if (code <= 82) return "🌦️";
  return "⛈️";
}

async function getWeather() {
  try {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=34.0259&longitude=-118.7798&current=temperature_2m,weather_code&temperature_unit=fahrenheit",
      { next: { revalidate: 1800 } },
    );
    if (!res.ok) return null;
    const data = await res.json();
    return {
      temp: Math.round(data.current.temperature_2m),
      icon: weatherIcon(data.current.weather_code),
    };
  } catch {
    return null;
  }
}

export async function Footer() {
  const weather = await getWeather();

console.log("Brian Weather:", weather);

  return (
    <footer className={styles.footer}>
      <span>
        &copy; {new Date().getFullYear()} {site.name}
      </span>
      {weather && (
        <>
          <span className={styles.sep} aria-hidden="true">
            |
          </span>
          <span className={styles.weather} title="Malibu, CA">
            <span className={styles.icon}>{weather.icon}</span>
            {weather.temp}°F
          </span>
        </>
      )}
    </footer>
  );
}
