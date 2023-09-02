import React, { Component } from 'react';
import { Calendar } from './components/Calendar/Calendar';
import { ThemeContext } from './context/index';
import './App.css';
import { DARK_THEME, LIGHT_THEME } from './constants';

export interface IThemesState {
  theme: string;
}

class App extends Component<{}, IThemesState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      theme: DARK_THEME,
    };
  }

  toggleTheme = () => {
    const newTheme = this.state.theme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    this.setState({ theme: newTheme });
  };

  render() {
    const { theme } = this.state;
    return (
      <ThemeContext.Provider value={{ theme, setTheme: this.toggleTheme }}>
        <div className={`App ${theme === DARK_THEME ? 'dark-theme' : 'light-theme'}`}>
          <Calendar />
        </div>
      </ThemeContext.Provider>
    );
  }
}

export default App;
