export const FB_PIXEL_ID = import.meta.env.VITE_FB_PIXEL_ID;

export const pageview = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
};

// https://developers.facebook.com/docs/facebook-pixel/reference#standard-events
export const event = (name: string, options = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', name, options);
  }
};

type WindowWithFbq = Window & {
  fbq: any;
  _fbq: any;
};

declare const window: WindowWithFbq;

export const initFacebookPixel = () => {
    if(!FB_PIXEL_ID) return;
    
    let f: any = window;
    if (f.fbq) return;
    
    let n: any = (f.fbq = function () {
      n.callMethod
        ? n.callMethod.apply(n, arguments)
        : n.queue.push(arguments);
    });
    
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    
    const t = document.createElement('script');
    t.async = !0;
    t.src = 'https://connect.facebook.net/en_US/fbevents.js';
    
    const s = document.getElementsByTagName('script')[0];
    if (s && s.parentNode) {
        s.parentNode.insertBefore(t, s);
    }
    
    window.fbq('init', FB_PIXEL_ID);
    window.fbq('track', 'PageView');
};
