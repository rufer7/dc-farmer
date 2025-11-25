/**
 * Landing page initialization
 */
import { renderUpcomingEvents, renderLatestNews } from './data-loader.js';

// Initialize page when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  await renderUpcomingEvents('upcoming-events');
  await renderLatestNews('latest-news');
});
