/**
 * Steel Darts team page initialization
 */
import { renderTeamRoster } from '/public/js/data-loader.js';
import { updateYear } from '/public/js/year.js';

document.addEventListener('DOMContentLoaded', async () => {
  await renderTeamRoster('steeldarts', 'steeldarts-roster');
});
