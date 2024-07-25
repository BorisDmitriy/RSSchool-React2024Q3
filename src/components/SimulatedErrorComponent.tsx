import { useContext, useState } from 'react';
import ThemeContext from './contex/ThemeContext';

export default function SimulatedErrorComponent() {
  const [error, setError] = useState(false);
  const darkTheme = useContext(ThemeContext);

  if (error) {
    throw new Error('Simulated error for testing Error Boundaries');
  }

  return (
    <button
      type="button"
      className={`btn ${darkTheme ? 'dark-theme' : ''}`}
      onClick={() => setError(true)}
    >
      Throw Error
    </button>
  );
}
