import { useContext } from 'react';
import { Link } from 'react-router-dom';
import ThemeContext from './contex/ThemeContext';

export default function NotFoundPage() {
  const darkTheme = useContext(ThemeContext);

  return (
    <div className="not_found_div">
      404 Not Found
      <Link className={`btn ${darkTheme ? 'dark-theme' : ''}`} to="/specie/">
        Main Page
      </Link>
    </div>
  );
}
