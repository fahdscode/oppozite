import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname, search } = useLocation();

    useLayoutEffect(() => {
        // Use instant scroll to avoid conflicts with page animations
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [pathname, search]);

    return null;
};

export default ScrollToTop;
