
import { useEffect } from 'react';

const useClickOutside = (ref, callback) => {

  // Use the useEffect hook to set up event listeners
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the element referenced by ref contains the event target
      // If not, it means the click was outside the element
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    // Add an event listener for the 'mousedown' event to the document
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);  // Dependency array: effect runs when ref or callback changes
};

export default useClickOutside;
