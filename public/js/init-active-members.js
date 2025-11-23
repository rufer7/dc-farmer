/**
 * Active members page initialization
 */
import { renderActiveMembers } from '/public/js/data-loader.js';
import { updateYear } from '/public/js/year.js';

document.addEventListener('DOMContentLoaded', async () => {
  await renderActiveMembers('active-members');
});
