import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="not_found_div">
      404 Not Found
      <Link className="btn" to="/">
        Main Page
      </Link>
    </div>
  );
}
