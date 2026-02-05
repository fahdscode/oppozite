import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initFacebookPixel, pageview } from '@/lib/meta-pixel';

export const MetaPixel = () => {
    const location = useLocation();

    useEffect(() => {
        // Initialize pixel on mount
        initFacebookPixel();
    }, []);

    useEffect(() => {
        // Track pageview on route change
        // We wrap this in a timeout to ensure it fires after the route update
        const handleRouteChange = () => {
            pageview();
        };

        handleRouteChange();
    }, [location]);

    return null;
};
