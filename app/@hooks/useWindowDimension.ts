/**
 * // useWindowDimension.ts
 * * This hook returns the viewport/window height and width
 */

import * as React from 'react';

type WindowDimentions = {
    width: number | undefined;
    height: number | undefined;
};

export const useWindowDimensions = (): WindowDimentions => {
    const [windowDimensions, setWindowDimensions] = React.useState<WindowDimentions>({ width: undefined, height: undefined });

    React.useEffect(() => {

        const handleResize = () => setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);

    }, []); // Empty array ensures that effect is only run on mount

    return windowDimensions;
};