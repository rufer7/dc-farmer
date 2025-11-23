/**
 * Passive members page initialization
 */
import { renderPassiveMembers } from '/public/js/data-loader.js';
import { updateYear } from '/public/js/year.js';

document.addEventListener('DOMContentLoaded', async () => {
  await renderPassiveMembers('passive-members');
});
