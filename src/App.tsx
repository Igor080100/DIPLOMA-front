import React, { useState } from 'react';
import Calendar from './components/Calendar/Calendar';
import './App.css';
import { DARK_THEME, LIGHT_THEME } from './constants';

export interface IThemesState {
  theme: string;
}

function App() {
  const [theme, setTheme] = useState<string>(DARK_THEME);

  const toggleTheme = () => {
    const newTheme = theme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    setTheme(newTheme);
  };

  return (
    <div className="App">
      <Calendar theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
}

export default App;
