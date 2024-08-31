import React from 'react';
import './weather.css';

class WeatherService extends React.Component {
  state = {
    city: '',
    weather: null,
    error: null,
  };

  apiKey = 'ac7e9a2ca4737d694b2c8cffc21890dd';
  getWeather = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${this.apiKey}&units=metric`);
      const data = await response.json();
      if (data.cod !== 200) {
        this.setState({ error: data.message, weather: null, city: '' });
      } else {
        this.setState({ weather: data, error: null, city: '' });
      }
    } catch (err) {
      this.setState({ error: 'Error fetching weather data', weather: null, city: '' });
    }
  };

  handleCityChange = (event) => {
    this.setState({ city: event.target.value });
  };

  render() {
    return (
      <div className="weather-container">
        <h1>Urban Weather Forecast</h1>
        <input 
          type="text" 
          value={this.state.city} 
          onChange={this.handleCityChange} 
          placeholder="Enter city" 
        />
        <button onClick={this.getWeather}>Get Weather</button>
        {this.state.error && <p className="error">{this.state.error}</p>}
        {this.state.weather && (
          <div className="weather-result">
            <h2>{this.state.weather.name}</h2>
            <div className="weather-details">
              <div className="weather-card">
                <img src={`http://openweathermap.org/img/wn/${this.state.weather.weather[0].icon}@2x.png`} alt="Weather icon" />
                <h3>Temperature</h3>
                <p>{this.state.weather.main.temp}°C</p>
              </div>
              <div className="weather-card">
                <img src="https://img.icons8.com/ios/50/000000/partly-cloudy-day--v1.png" alt="Weather description icon" />
                <h3>Weather</h3>
                <p>{this.state.weather.weather[0].description}</p>
              </div>
              <div className="weather-card">
                <img src="https://img.icons8.com/ios/50/000000/humidity.png" alt="Humidity icon" />
                <h3>Humidity</h3>
                <p>{this.state.weather.main.humidity}%</p>
              </div>
              <div className="weather-card">
                <img src="https://img.icons8.com/ios/50/000000/wind.png" alt="Wind speed icon" />
                <h3>Wind Speed</h3>
                <p>{this.state.weather.wind.speed} km/h</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default WeatherService;