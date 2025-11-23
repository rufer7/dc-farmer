/**
 * Passive members page initialization
 */
import { renderPassiveMembers } from '/public/js/data-loader.js';

document.addEventListener('DOMContentLoaded', async () => {
  await renderPassiveMembers('passive-members');
});
