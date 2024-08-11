import { useContext } from 'react';
import { useRouter } from 'next/router';
import ThemeContext from './contex/ThemeContext';

export default function ErrorPage() {
  const darkTheme = useContext(ThemeContext);
  const router = useRouter();

  return (
    <div className="error_page">
      <h1 style={{ color: darkTheme ? 'white' : 'initial' }}>
        Sorry, something went wrong !
      </h1>
      <button
        className={`btn ${darkTheme ? 'dark-theme' : ''}`}
        onClick={() => router.reload()}
        type="button"
      >
        Refresh Page
      </button>
    </div>
  );
}
