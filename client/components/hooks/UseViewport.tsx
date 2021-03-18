import { useEffect, useState } from 'react';

export const useViewport = () => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    return { width };
}
