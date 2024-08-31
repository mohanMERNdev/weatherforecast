import React from 'react';
import WeatherService from './weather';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <WeatherService />
      </div>
    );
  }
}

export default App;