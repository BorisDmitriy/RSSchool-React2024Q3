import { useState } from 'react';

export default function SimulatedErrorComponent() {
  const [error, setError] = useState(false);

  if (error) {
    throw new Error('Simulated error for testing Error Boundaries');
  }

  return (
    <button type="button" className="btn" onClick={() => setError(true)}>
      Throw Error
    </button>
  );
}
