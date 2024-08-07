import { useContext } from 'react';
import Link from 'next/link';
import ThemeContext from './contex/ThemeContext';

export default function NotFoundPage() {
  const darkTheme = useContext(ThemeContext);

  return (
    <div className="not_found_div">
      404 Not Found
      <Link className={`btn ${darkTheme ? 'dark-theme' : ''}`} href="/specie">
        Main Page
      </Link>
    </div>
  );
}
