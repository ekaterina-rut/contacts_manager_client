import React from 'react';
import './App.css';
import { MainPage } from './components/MainPage/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <MainPage/>
      </div>
    );
  }
}

export default App;
