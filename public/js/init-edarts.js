/**
 * E-Darts team page initialization
 */
import { renderTeamRoster } from './data-loader.js';

document.addEventListener('DOMContentLoaded', async () => {
  await renderTeamRoster('edarts', 'edarts-roster');
});
