/**
 * Passive members page initialization
 */
import { renderPassiveMembers } from './data-loader.js';

document.addEventListener('DOMContentLoaded', async () => {
  await renderPassiveMembers('passive-members');
});
