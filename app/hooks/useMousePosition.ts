import { useState, useEffect } from "react";

const useMousePosition = () => {
	const [mousePosition, setMousePosition] = useState({ x: null, y: null });

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const updateMousePosition = (e: any) => setMousePosition({ x: e.clientX, y: e.clientY });

	useEffect(() => {
		window.addEventListener("mousemove", updateMousePosition);
		return () => window.removeEventListener("mousemove", updateMousePosition);
	}, []);

	return mousePosition;
};

export default useMousePosition;