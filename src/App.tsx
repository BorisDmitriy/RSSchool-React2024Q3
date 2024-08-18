import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './components/store/store';
import { FormEntry } from './types/types';

function App() {
  const { entries, lastAdded } = useSelector((state: RootState) => state.form);

  return (
    <div className="wrapper">
      <p>main page</p>
      <div className="main-container">
        <h1>Form Data Entries</h1>
        {entries.length > 0 ? (
          <div className="data-tiles">
            {entries.map((entry: FormEntry, index: number) => (
              <div
                key={index as number}
                className={`data-tile ${lastAdded === entry ? 'last-added' : ''}`}
              >
                <h2>Name: {entry.name}</h2>
                <p>Age: {entry.age}</p>
                <p>Email: {entry.email}</p>
                <p>Gender: {entry.gender}</p>
                <p>Terms Accepted: {entry.termsAccepted ? 'Yes' : 'No'}</p>
                <p>Country: {entry.country}</p>
                {entry.picture && (
                  <div>
                    <h2>Picture:</h2>
                    <img className="image" src={entry.picture} alt="Uploaded" />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No data</p>
        )}
      </div>
      <div className="btn-control">
        <Link className="btn" to="/uncontroled">
          Uncontrolled Form Page
        </Link>
        <Link className="btn" to="/controled">
          Controlled Form Page
        </Link>
      </div>
    </div>
  );
}

export default App;
