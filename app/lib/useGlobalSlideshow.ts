import { useEffect, useState } from "react";

export default function useGlobalSlideshow(interval = 3000) {
	const [tick, setTick] = useState(0);

	useEffect(() => {
		const id = setInterval(() => { setTick((t) => t + 1); }, interval);
		return () => clearInterval(id);
	}, [interval]);

	return tick;
}