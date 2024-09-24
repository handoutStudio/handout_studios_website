import { useState, useEffect } from 'react';

const useScreenSize = () => {
	const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
	
	useEffect(() => {
		// Check if window is available (runs only in the browser)
		if (typeof window !== 'undefined') {
			const handleResize = () => {
				setScreenSize({ width: window.innerWidth, height: window.innerHeight });
			};
			
			// Set initial size
			handleResize();
			
			// Attach resize event listener
			window.addEventListener('resize', handleResize);
			
			// Cleanup the event listener on component unmount
			return () => {
				window.removeEventListener('resize', handleResize);
			};
		}
	}, []);
	
	return screenSize;
};

export default useScreenSize;