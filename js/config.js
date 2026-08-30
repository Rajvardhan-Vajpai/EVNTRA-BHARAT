/**
 * Eventra Bharat — Global Configuration
 * 
 * Change API_BASE_URL here when deploying to production.
 * Every JS file reads from this single source of truth.
 */
const CONFIG = Object.freeze({
  API_BASE_URL: 'http://localhost:8000',
  API: {
    AUTH:       '/api/auth',
    EVENTS:    '/api/events',
    WISHLIST:  '/api/wishlist',
    NEWSLETTER: '/api/newsletter/subscribe',
  }
});
