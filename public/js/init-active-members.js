/**
 * Active members page initialization
 */
import { renderActiveMembers } from '/public/js/data-loader.js';

document.addEventListener('DOMContentLoaded', async () => {
  await renderActiveMembers('active-members');
});
