import { useState, useEffect } from 'react';

export default function useLocalStorage(key: string, initialValue: string) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: string) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  // Save to local storage when value changes
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  // Update local storage when the component unmounts
  useEffect(
    () => () => {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    },
    [key, storedValue],
  );

  return [storedValue, setValue];
}
