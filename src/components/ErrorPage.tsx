import { useContext } from 'react';
import ThemeContext from './contex/ThemeContext';

export default function ErrorPage() {
  const darkTheme = useContext(ThemeContext);
  console.log('dark theme error;', darkTheme);

  return (
    <div className="error_page">
      <h1 style={{ color: darkTheme ? 'white' : 'initial' }}>
        Sorry, something went wrong !
      </h1>
      <button
        className={`btn ${darkTheme ? 'dark-theme' : ''}`}
        onClick={() => window.location.reload()}
        type="button"
      >
        Refresh Page
      </button>
    </div>
  );
}
