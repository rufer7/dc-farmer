/**
 * Landing page initialization
 */
import { renderUpcomingEvents, renderLatestNews } from '/public/js/data-loader.js';
import { updateYear } from '/public/js/year.js';

// Initialize page when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  await renderUpcomingEvents('upcoming-events');
  await renderLatestNews('latest-news');
});
