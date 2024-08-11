import { useEffect } from 'react';

// Custom hook to add/remove a class from the body element
const useBodyClass = (className: string, condition: boolean) => {
  console.log('!!!!!! useBodyClass     !!!!!!!');
  useEffect(() => {
    // Ensure effect runs only in the browser
    if (typeof window !== 'undefined') {
      // When the condition is true, add the class
      if (condition) {
        document.body.classList.add(className);
      } else {
        document.body.classList.remove(className);
      }

      // Cleanup function to remove the class when the component unmounts or condition changes
      return () => {
        document.body.classList.remove(className);
      };
    }
    return undefined;
  }, [className, condition]); // Only re-run the effect if className or condition changes
};

export default useBodyClass;
